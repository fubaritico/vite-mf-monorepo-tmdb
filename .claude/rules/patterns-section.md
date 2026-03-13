# Section & Domain Component Patterns — apps/[app]

## Domain Section Template (embedded query)

```typescript jsx
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

  if (error || !data) return null

  return (
    <Section title="Title">
      {/* content */}
    </Section>
  )
}

export default SectionName
```

## File Structure

```
apps/[app]/src/components/ComponentName/
├── ComponentName.tsx       # Embedded useQuery, useParams
├── ComponentName.test.tsx  # vi.mock hooks
└── index.ts               # export { default as ComponentName }
```

Rules:
- CSS prefix matching the app (`mda:`, `hm:`, `ph:`)
- Embedded queries (no props for data)
- Handle loading / error / empty states
- Export from `apps/[app]/src/index.ts`

## Import Order (ESLint enforced)
```typescript jsx
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

## Hooks Pattern

```typescript
import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { endpointOptions } from '@fubar-it-co/tmdb-client'

import type { ResponseType, TMDBError } from '@fubar-it-co/tmdb-client'

export const useDataHook = (id: number) => {
  return useQuery({
    ...endpointOptions({ path: { id } }),
    staleTime: 1000 * 60 * 10,
  }) as UseQueryResult<ResponseType, TMDBError>
}
```

Rules: one hook per file, return useQuery directly, set staleTime, include ALL dynamic params in queryKey.

## Loading States Pattern

```typescript jsx
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

Transform inline in the component, not in hooks:
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
export function isTypeA(
  data: TypeAResponse | TypeBResponse
): data is TypeAResponse {
  return 'uniqueFieldA' in data
}
```

Real example: `isMovie()` in `apps/media/src/utils/typeGuards.ts`

Rules:
- Location: `apps/[app]/src/utils/` (app-specific) or `packages/shared/src/utils/` (reusable)
- One utility per file: `formatRuntime.ts`, `getMediaTypeFromPath.ts`
- Named export, extract only when used in 2+ places or logic is complex

## Mocks Pattern

```
packages/shared/src/mocks/
├── data/[domain]Data.ts          # typed with TMDB types
└── handlers/[domain]Handlers.ts  # MSW — export: { default, loading, error }
```

Always use real TMDB data via curl for accurate structure:
```bash
curl "https://api.themoviedb.org/3/movie/278/credits" -H "Authorization: Bearer $TOKEN"
```

## Testing Pattern

```typescript jsx
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

## CSS Custom Utilities

```css
/* apps/[app]/src/index.css AND remote-input.css */
@layer utilities {
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

Real examples: `.mda\:hero-height`, `.mda\:text-shadow-strong`

Rules:
- Always `@layer utilities`
- Escape colon with backslash in CSS (`.mda\:name`)
- Add to both `index.css` (standalone) and `remote-input.css` (host consumption)

## Storybook Pattern (App Component)

`layout: 'fullscreen'` + `satisfies Meta<>` + `Movie/Loading/Error` stories + MSW handlers + `withRouter`

See `/story` skill for full template.
