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
├── host/           port 3000 — consumes remotes
│   └── src/
│       ├── main.tsx, router.tsx, queryClient.ts, instrument.ts
│       └── index.css
├── home/           port 3001 — exposes ./Home, ./routes
│   └── src/
│       ├── main.tsx, routes.tsx, instrument.ts
│       ├── index.css, remote-input.css, remote.css (generated)
│       ├── components/
│       │   ├── Home.tsx
│       │   ├── HeroSection/, TrendingSection/
│       │   ├── PopularSection/, FreeToWatchSection/
│       │   └── [Section]/  → Section.tsx, Section.test.tsx, index.ts
│       └── hooks/  → useTrending.ts, usePopularMovies.ts, ...
├── media/          port 3002 — exposes ./Media, ./MediaErrorBoundary, ./routes
│   └── src/
│       ├── main.tsx, routes.tsx, instrument.ts
│       ├── index.css, remote-input.css, remote.css (generated)
│       ├── components/
│       │   ├── Media.tsx, MediaErrorBoundary.tsx
│       │   ├── MediaHero/, Synopsis/, Crew/, Cast/
│       │   ├── Photos/, TrailersSection/
│       │   ├── SimilarSection/, RecommendedSection/
│       │   └── [Section]/  → Section.tsx, Section.test.tsx, index.ts
│       ├── hooks/  → useMediaDetails.ts, useMovieCredits.ts, ...
│       └── utils/  → typeGuards.ts, formatters.ts, ...
└── photos/         port 3003 — exposes ./Photos, ./PhotosErrorBoundary, ./router
                    nested child route under /movie/:id and /tv/:id
    └── src/
        ├── main.tsx, router.tsx, instrument.ts
        ├── index.css, remote-input.css, remote.css (generated)
        ├── components/Photos/  → Photos.tsx, PhotosModal.tsx, PhotosErrorBoundary.tsx
        └── hooks/  → useMovieImages.ts

packages/
├── ui/             design system (ui: prefix) — 20+ components
│   ├── tsup.config.ts, postcss.config.js, publish.sh
│   └── src/
│       ├── index.ts (barrel), styles.css
│       └── [Component]/  → Component.tsx, Component.test.tsx, index.ts
│           (Avatar, Badge, Button, Card, Carousel, HeroImage, Icon,
│            IconButton, Image, Modal, MovieCard, Rating, Skeleton,
│            Spinner, Tabs, Talent, TrailerCard, Typography)
├── layouts/        Container, Section, Header, Footer, RootLayout (layout: prefix)
│   ├── tsup.config.ts, postcss.config.js, publish.sh
│   └── src/
│       ├── index.ts (barrel), styles.css
│       ├── Container/, Section/, Header/, Footer/, RootLayout/
│       ├── next/         → Server Component RootLayout
│       └── react-router/ → React Router entry point
├── shared/         utils, mocks, test-utils, tailwind theme, vite plugins
│   ├── postcss.config.js, publish.sh
│   └── src/
│       ├── tailwind/   → theme.css, theme-no-fonts.css
│       ├── fonts/      → fonts.css (@fontsource imports)
│       ├── utils/      → tmdbImage.ts, healthCheck.ts, retry.ts, ...
│       ├── vite/       → tailwindRemoteCss.ts, notifyHostOnHmr.ts, ...
│       ├── test-utils/ → renderWithReactQuery.tsx, renderWithRouter.tsx, ...
│       └── mocks/
│           ├── data/     → 16 mock data files (real TMDB payloads)
│           └── handlers/ → 16 MSW handler files
├── http-client/    TMDB heyAPI client → @fubar-it-co/tmdb-client (auto-generated)
│   ├── openapi-ts.config.ts, publish.sh
│   └── src/
│       ├── index.ts, tmdb-config.ts
│       └── client/  → *.gen.ts (DO NOT EDIT — pnpm generate)
├── tokens/         design tokens (Style Dictionary, OKLCH, DTCG format)
│   ├── sd.config.js, publish.sh
│   ├── tokens/  → color/, font.json, radius.json, shadow.json, spacing.json
│   └── dist/    → css/, js/, ts/, tailwind/ (generated)
├── storybook/      stories for all components (port 6006)
│   ├── .storybook/ → main.ts, preview.ts, decorators/
│   └── src/stories/ → 39+ story files
└── e2e/            Cucumber.js + Playwright
    ├── cucumber.config.cjs
    └── src/
        ├── features/         → smoke.feature, browse-media.feature
        ├── step-definitions/ → smoke.steps.ts, browse-media.steps.ts
        ├── page-objects/     → HomePage.ts, MediaPage.ts, PhotosPage.ts
        └── support/          → world.ts, hooks.ts
```

## CSS Architecture
- Tailwind v4, CSS-first (no tailwind.config.js)
- Shared theme: `packages/shared/src/tailwind/theme.css` (OKLCH tokens)
- `theme-no-fonts.css`: for remotes (no @font-face, avoids broken font paths)
- packages/ui: `ui:` prefix — `ui:flex ui:items-center`
- packages/layouts: `layout:` prefix
- apps/home: `hm:` prefix
- apps/media: `mda:` prefix
- apps/photos: `ph:` prefix
- Remotes use `vite-plugin-css-injected-by-js` for CSS bundling
- Custom utilities in `@layer utilities` with escaped prefix: `.mda\:hero-height`

## Module Federation
- Bootstrap pattern: app logic inline in `main.tsx` (no separate bootstrap file)
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
pnpm kill-ports       # kill dev servers on ports 3000-3003, 6006
pnpm storybook        # Storybook on port 6006
```

## Git & Commits
Conventional commits — pre-commit hook runs: typecheck + lint + test.

Allowed types: `build chore ci docs feat fix perf refactor revert style test`

Format: `type(scope): subject` (lowercase subject, no trailing period, max 100 chars)

Examples:
- `feat(media): add Cast section with top 10 actors`
- `fix(ui): resolve Button disabled state for link variant`
- `refactor(shared): extract test utilities to shared package`

## CI/CD Workflows

See [README.md — Continuous Integration & Deployment](../../README.md#continuous-integration--deployment).

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
