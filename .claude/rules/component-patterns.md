# Component Patterns — vite-mf-monorepo

## Component Templates

### UI Component (packages/ui)
```typescript
import clsx from 'clsx'

import type { FC, HTMLAttributes } from 'react'

export interface ComponentNameProps extends HTMLAttributes<HTMLDivElement> {
  /** Prop description */
  propName?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary'
}

const ComponentName: FC<ComponentNameProps> = ({
  className,
  propName,
  size = 'md',
  variant = 'primary',
  ...rest
}) => {
  return (
    <div
      className={clsx('ui:...', className)}
      {...rest}
    >
      {/* content */}
    </div>
  )
}

export default ComponentName
```

### UI Component with types file (when props are complex)
Separate `ComponentName.types.ts` for discriminated unions (see MovieCard, Button pattern):
```typescript
// ComponentName.types.ts
export type ComponentNameProps = ComponentAsVariantA | ComponentAsVariantB

// ComponentName.tsx
import type { ComponentNameProps } from './ComponentName.types'
const ComponentName: FC<ComponentNameProps> = (props) => { ... }
```

### Domain Section Component (apps/[app] — embedded query)
```typescript
import { useParams } from 'react-router-dom'

import { Section } from '@vite-mf-monorepo/layouts'
import { Skeleton, Typography } from '@vite-mf-monorepo/ui'

import { useDataHook } from '../../hooks/useDataHook'

import type { FC } from 'react'

const SectionName: FC = () => {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading, error } = useDataHook(Number(id))

  if (isLoading) {
    return (
      <Section title="Title">
        <Skeleton variant="rectangle" width="100%" height="200px" />
      </Section>
    )
  }

  if (error || !data) {
    return (
      <Section title="Title">
        <Typography variant="body" className="[prefix]:text-muted-foreground">
          Unable to load information.
        </Typography>
      </Section>
    )
  }

  return (
    <Section title="Title">
      {/* content */}
    </Section>
  )
}

export default SectionName
```

## File Structure by Location

### packages/ui (Design System)
```
packages/ui/src/ComponentName/
├── ComponentName.tsx       # FC<ComponentNameProps> implementation
├── ComponentName.types.ts  # Only if props are complex (discriminated unions)
├── ComponentName.test.tsx  # Unit tests
└── index.ts               # export { default as ComponentName } from './ComponentName'
```
Rules:
- `ui:` prefix on ALL Tailwind classes
- No domain logic
- Extend HTML attributes
- Export interface as named, component as default
- `clsx` for conditional classes

### packages/layouts
Same as packages/ui but `layout:` prefix.

### apps/[app]/src/components (Domain Components)
```
apps/[app]/src/components/ComponentName/
├── ComponentName.tsx       # Embedded useQuery, useParams
├── ComponentName.test.tsx  # vi.mock hooks
└── index.ts               # export { default as ComponentName }
```
Rules:
- CSS prefix matching the app (`mda:` for media, `hm:` for home, define per new app)
- Embedded queries (no props for data)
- Handle loading / error / empty states
- Export from `apps/[app]/src/index.ts`

## CSS Prefix per App
| App | Prefix |
|---|---|
| packages/ui | `ui:` |
| packages/layouts | `layout:` |
| apps/media | `mda:` |
| apps/home | `hm:` |
| new app | define new prefix, never reuse existing |

## Import Order (ESLint enforced)
```typescript
// 1. External
import { useParams } from 'react-router-dom'

// 2. Internal packages
import { Section } from '@vite-mf-monorepo/layouts'
import { Skeleton, Typography } from '@vite-mf-monorepo/ui'

// 3. Relative
import { useDataHook } from '../../hooks/useDataHook'

// 4. Types
import type { FC } from 'react'
```

## Hooks Pattern (apps/[app]/src/hooks/)
```typescript
import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { endpointOptions } from '@vite-mf-monorepo/tmdb-client'

import type { ResponseType, TMDBError } from '@vite-mf-monorepo/tmdb-client'

export const useDataHook = (id: number) => {
  return useQuery({
    ...endpointOptions({ path: { id } }),
    staleTime: 1000 * 60 * 10,
  }) as UseQueryResult<ResponseType, TMDBError>
}
```
Rules: one hook per file, return useQuery directly, set staleTime, include ALL dynamic params in queryKey.

## Mocks Pattern (packages/shared/src/mocks/)
```
data/[domain]Data.ts          # typed with TMDB types from @vite-mf-monorepo/tmdb-client
handlers/[domain]Handlers.ts  # MSW handlers export: { default, loading, error }
```

## Storybook Pattern
Two distinct patterns — see `/story` skill for full templates.

**Design System (packages/ui)**: `layout: 'centered'` + `tags: ['autodocs']` + `Playground` + `Showcase` stories + `argTypes`

**App component (apps/[app])**: `layout: 'fullscreen'` + `satisfies Meta<>` + `Movie/Loading/Error` stories + MSW handlers + `withRouter`

## Testing Pattern
```typescript
import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { vi } from 'vitest'

import { renderWithReactQuery } from '@vite-mf-monorepo/shared/test-utils'

vi.mock('react-router-dom', () => ({ useParams: vi.fn() }))
vi.mock('../../hooks/useDataHook', () => ({ useDataHook: vi.fn() }))

describe('ComponentName', () => {
  beforeEach(() => {
    vi.mocked(useParams).mockReturnValue({ id: '278' })
    vi.mocked(useDataHook).mockReturnValue({ data: mockData, isLoading: false, error: null })
  })

  it('should render ...', () => {
    renderWithReactQuery(<ComponentName />)
    expect(screen.getByText('...')).toBeInTheDocument()
  })
})
```
Rules: ALWAYS `userEvent` (never `fireEvent`), mock at module level, use shared mocks.

## Loading States Pattern
```typescript
if (isLoading) {
  return (
    <Section title="Title">
      <div className="[prefix]:grid [prefix]:grid-cols-2 [prefix]:gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} variant="rectangle" width="100%" height="64px" />
        ))}
      </div>
    </Section>
  )
}
```
Rule: skeleton must match final content dimensions. Section title always visible (not conditional).

## Error Handling Pattern
```typescript
if (error || !data) return null        // No useful data → hide section
if (!data.items?.length) return null   // Empty state → hide section
```

## Data Transformation Pattern
Transform inline in the component that renders (not in hooks):
```typescript
const imageUrl = item.image_path
  ? `${BASE_IMAGE_URL}/w185${item.image_path}`
  : undefined

const displayYear = item.release_date
  ? new Date(item.release_date).getFullYear()
  : null
```
Rule: use `??` for fallbacks, keep transformations explicit, no wrapper components just for mapping.

## Type Guards & Utilities

```typescript
// Type guard for discriminated unions
export function isTypeA(
  data: TypeAResponse | TypeBResponse
): data is TypeAResponse {
  return 'uniqueFieldA' in data
}

// Usage — TypeScript narrows automatically
if (isTypeA(data)) {
  // TypeScript knows data is TypeAResponse
} else {
  // TypeScript knows data is TypeBResponse
}
```

Real example: `isMovie(data: MovieDetailsResponse | TvSeriesDetailsResponse)` in `apps/media/src/utils/typeGuards.ts`

Rules:
- Location: `apps/[app]/src/utils/` (app-specific) or `packages/shared/src/utils/` (reusable)
- One utility per file: `formatRuntime.ts`, `getMediaTypeFromPath.ts`
- Export as named export
- Extract only when used in 2+ places or logic is complex

## CSS Custom Utilities

```css
/* apps/[app]/src/index.css AND remote-input.css */
@layer utilities {
  /* Replace [app] with actual prefix (mda, hm, etc.) */
  .[app]\:utility-name {
    /* css property */
  }

  @media (min-width: 1024px) {
    .[app]\:utility-name {
      /* responsive override */
    }
  }
}
```

Real examples in `apps/media`: `.mda\:hero-height`, `.mda\:text-shadow-strong`

Rules:
- Always use `@layer utilities`
- Use app prefix (`mda:`, `hm:`) — escape colon with backslash in CSS (`.mda\:name`)
- Add to both `index.css` (standalone) and `remote-input.css` (host consumption)

## Compound Components Pattern

```typescript
// Context for shared state
const ComponentContext = createContext<ComponentContextValue | null>(null)

// Parent with sub-component types
export const Component: FC<ComponentProps> & {
  Item: typeof ComponentItem
  Navigation: typeof ComponentNavigation
} = ({ children, ...props }) => {
  const [state, setState] = useState(...)
  return (
    <ComponentContext.Provider value={{ state, setState }}>
      <div>{children}</div>
    </ComponentContext.Provider>
  )
}

// Sub-component
const ComponentItem: FC<ItemProps> = ({ children }) => {
  const context = useContext(ComponentContext)
  if (!context) throw new Error('ComponentItem must be used within Component')
  return <div>{children}</div>
}

// Attach sub-components
Component.Item = ComponentItem
Component.Navigation = ComponentNavigation
```

Rules:
- Use Context API for shared state between parent and children
- Throw error if sub-component used outside parent
- Used for: Carousel, Tabs (existing) — apply when component has related sub-components

## Discriminated Union Pattern (polymorphic components)
```typescript
// ComponentName.types.ts
export type ComponentAsButton = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' }
export type ComponentAsLink   = BaseProps & LinkProps & { as: 'link' }
export type ComponentProps = ComponentAsButton | ComponentAsLink

// ComponentName.tsx
const Component: FC<ComponentProps> = (props) => {
  if (props.as === 'link') {
    const { as: _, variant: _v, size: _s, className: _c, children: _ch, ...linkProps } = props
    return <Link className={classes} {...linkProps}>{content}</Link>
  }
  const { as: _, variant: _v, size: _s, className: _c, children: _ch, ...buttonProps } = props as ComponentAsButton
  return <button className={classes} {...buttonProps}>{content}</button>
}
```
