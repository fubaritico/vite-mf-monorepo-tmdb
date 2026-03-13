# UI Component Patterns — packages/ui & packages/layouts

## Component Template

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

## Component with Types File (complex props)

Separate `ComponentName.types.ts` for discriminated unions (see MovieCard, Button):
```typescript
// ComponentName.types.ts
export type ComponentNameProps = ComponentAsVariantA | ComponentAsVariantB

// ComponentName.tsx
import type { ComponentNameProps } from './ComponentName.types'
const ComponentName: FC<ComponentNameProps> = (props) => { ... }
```

## File Structure

```
packages/ui/src/ComponentName/
├── ComponentName.tsx       # FC<ComponentNameProps> implementation
├── ComponentName.types.ts  # Only if props are complex (discriminated unions)
├── ComponentName.test.tsx  # Unit tests
└── index.ts               # export { default as ComponentName } from './ComponentName'
```

`packages/layouts` — same structure, `layout:` prefix instead of `ui:`.

Rules:
- `ui:` prefix on ALL Tailwind classes
- No domain logic
- Extend HTML attributes
- Export interface as named, component as default
- `clsx` for conditional classes

## CSS Prefix per Package/App
| Location | Prefix |
|---|---|
| packages/ui | `ui:` |
| packages/layouts | `layout:` |
| apps/media | `mda:` |
| apps/home | `hm:` |
| apps/photos | `ph:` |
| new app | define new prefix, never reuse existing |

## Import Order (ESLint enforced)
```typescript
// 1. External
import clsx from 'clsx'

// 2. Internal packages
import { Section } from '@vite-mf-monorepo/layouts'

// 3. Relative
import type { ComponentNameProps } from './ComponentName.types'

// 4. Types
import type { FC } from 'react'
```

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

Note: ESLint `ignoreRestSiblings` is enabled — `{ as: _, ...rest }` pattern is allowed.

## Compound Components Pattern

```typescript
const ComponentContext = createContext<ComponentContextValue | null>(null)

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

const ComponentItem: FC<ItemProps> = ({ children }) => {
  const context = useContext(ComponentContext)
  if (!context) throw new Error('ComponentItem must be used within Component')
  return <div>{children}</div>
}

Component.Item = ComponentItem
Component.Navigation = ComponentNavigation
```

Rules:
- Throw error if sub-component used outside parent
- Used for: Carousel, Tabs (existing) — apply when component has related sub-components

## Storybook Pattern (Design System)

`layout: 'centered'` + `tags: ['autodocs']` + `Playground` + `Showcase` stories + `argTypes`

See `/story` skill for full template.
