# Architecture — vite-mf-monorepo

## Tech Stack
| Category | Technology | Version |
|---|---|---|
| Package Manager | pnpm | 10.8.1 |
| Monorepo | Lerna | 8.2.2 |
| Build | Vite | 6.2.0 |
| Module Federation | @module-federation/vite | 1.11.0 |
| Framework | React | 19.1.0 |
| Routing | React Router | 7.5.2 |
| Data fetching | TanStack Query | 5.74.4 |
| Styling | Tailwind CSS | 4.1.0 |
| Language | TypeScript | 5.7.2 |
| Testing | Vitest | 3.x + React Testing Library 16.x |
| API Client | heyAPI (generated, never edit manually) | — |

## Project Structure
```
apps/
├── host/    port 3000 — consumes remotes
├── home/    port 3001 — exposes ./Home, ./routes
└── media/   port 3002 — exposes ./Media, ./MediaErrorBoundary, ./routes

packages/
├── ui/         design system (ui: prefix)
├── layouts/    Container, Section, Header, Footer, RootLayout (layout: prefix)
├── shared/     utils, mocks, test-utils, tailwind theme
├── http-client/ TMDB heyAPI client → @fubar-it-co/tmdb-client
└── storybook/  stories for all components
```

## CSS Architecture
- Tailwind v4, CSS-first (no tailwind.config.js)
- Shared theme: `packages/shared/src/tailwind/theme.css` (OKLCH tokens)
- `theme-no-fonts.css`: for remotes (no @font-face, avoids broken font paths)
- packages/ui: `ui:` prefix — `ui:flex ui:items-center`
- packages/layouts: `layout:` prefix
- apps/media: `mda:` prefix
- apps/home: `hm:` prefix
- Remotes use `vite-plugin-css-injected-by-js` for CSS bundling
- Custom utilities in `@layer utilities` with escaped prefix: `.mda\:hero-height`

## Module Federation
- Bootstrap pattern: `main.tsx` → `await import('./bootstrap')`
- Each remote: standalone mode (own router + QueryClient) + MF exposition
- Shared singletons: react, react-dom, react-router-dom, @tanstack/react-query
- DTS: remotes generate types → host consumes via tsconfig paths `"*": ["./@mf-types/*"]`
- Health checks: `/health` endpoint, retry with backoff (5 attempts)

## Scripts
```bash
pnpm dev              # all packages in parallel
pnpm dev:ordered      # home → media → host (ordered)
pnpm [package]:dev    # specific package

pnpm lint             # ESLint entire project
pnpm lint:fix         # ESLint auto-fix
pnpm type-check       # TypeScript no-emit
pnpm test             # Vitest
pnpm coverage         # Vitest + coverage

pnpm reset            # clean install (rm node_modules/dist + pnpm install)
pnpm generate         # regenerate TMDB API client (packages/http-client)
```

## Git & Commits
Conventional commits — pre-commit hook runs: typecheck + lint + test.

Allowed types: `build chore ci docs feat fix perf refactor revert style test`

Format: `type(scope): subject` (lowercase subject, no trailing period, max 100 chars)

Examples:
- `feat(media): add Cast section with top 10 actors`
- `fix(ui): resolve Button disabled state for link variant`
- `refactor(shared): extract test utilities to shared package`

## Forbidden
```
❌ console.log          → use console.warn / console.error
❌ explicit any         → strict TypeScript
❌ CSS Modules          → Tailwind only
❌ CSS-in-JS            → Tailwind only
❌ edit http-client/src/client/  → regenerate with pnpm generate
❌ delete index.css files        → required for standalone mode
❌ disable cssInjectedByJsPlugin → required for remotes
❌ unsorted imports     → ESLint enforced
❌ unused vars/imports  → ESLint enforced
```

## TMDB Image URLs
```typescript
// Construct full URL with size
`https://image.tmdb.org/t/p/${size}${path}`

// OFFICIALLY SUPPORTED SIZES (from /configuration API endpoint)
// Reference: https://www.themoviedb.org/talk/53c11d4ec3a3684cf4006400
//
// Posters:   w92, w154, w185, w342, w500, w780, original
// Backdrops: w300, w780, w1280, original (used in our app: w300 mobile, w500 tablet, w780 desktop, w1280 ultrawide)
// Profiles:  w45, w185, h632, original
// Still:     w92, w185, w300, original
// Logos:     w45, w92, w154, w185, w300, w500, original
//
// Note: Only use these officially supported sizes. While other dimensions might load,
// they are not guaranteed to work and may be slower.
```

## Responsive Breakpoints (mobile-first)
```
sm:  640px   md: 768px   lg: 1024px   xl: 1280px   2xl: 1536px
```

## Section max-width
`max-w-screen-xl` (1280px) via Section component from packages/layouts.
