# Page Component Patterns — apps/[app]

## Role

Page components are pure section orchestrators. They compose sections, handle no data, declare no state.
The loader/routing wiring lives in `routes.tsx`, not here.

## Template

```typescript
import { Outlet } from 'react-router-dom'  // only if nested routes

import { SectionA } from './SectionA'
import { SectionB } from './SectionB'
import { SectionC } from './SectionC'

import type { FC } from 'react'

import '../remote.css'  // only on the root MF-exposed component

const PageName: FC = () => {
  return (
    <>
      <SectionA />
      <SectionB />
      <SectionC />
      <Outlet />  {/* only if nested child routes (e.g. modal overlay) */}
    </>
  )
}

export default PageName
```

## Rules

- No props — `FC` without generic
- No data fetching, no hooks, no state
- No loading / error states — each section handles its own
- `import '../remote.css'` only on the root MF-exposed component (Home, Media)
- `<Outlet />` required if the page has nested child routes (e.g. Photos modal under Media)
- Sections import from relative index: `import { SectionA } from './SectionA'`
- Export as default only

## File Location

```
apps/[app]/src/components/
├── PageName.tsx         # This file
├── SectionA/
├── SectionB/
└── SectionC/
```

## Alternating Backgrounds

Backgrounds are controlled by CSS `nth-of-type`, not by the page component.
Sections that need a container use `<Container variant="default">` — CSS handles alternation.

CSS in `@layer components` — must be duplicated in both `index.css` AND `remote-input.css`:

```css
@layer components {
  .media-section:nth-of-type(odd) { background-color: var(--mda-color-muted); }
  .media-section:nth-of-type(even) { background-color: white; }
  footer .media-section { background-color: transparent !important; }
}
```

`media-section` is the Container component's class — never `container` (Tailwind conflict).

Real example from `apps/home`:
```typescript
// Home.tsx — Container/Section wrappers defined at page level for layout control
<Container variant="default">
  <Section spacing="lg" maxWidth="xl">
    <TrendingSection />
  </Section>
</Container>
```

Real example from `apps/media`:
```typescript
// Media.tsx — sections handle their own Container/Section internally
<MediaHero />
<Synopsis />
<Cast />
<Outlet />
```

Both patterns are valid. Choose based on whether sections need layout context from the page.

## Outlet Placement

When a nested route renders a modal (`<dialog>` top-layer), `<Outlet />` placement in the page
is invisible to the user — the dialog covers the full screen. Place it logically after the section
that triggers navigation to the child route.

```typescript
<Photos />         // clicking a photo navigates to /photos/:index
<Outlet />         // renders Photos modal on top (top-layer, placement irrelevant visually)
<TrailersSection />
```
