# vite-mf-monorepo — Claude Code Instructions

## Project
TMDB media app. Lerna + pnpm workspaces. Module Federation.
- `apps/host` (3000), `apps/home` (3001), `apps/media` (3002), `apps/photos` (3003, `ph:` prefix), `apps/search` (3004, `sr:` prefix)
- `packages/ui` (design system, `ui:` prefix), `packages/layouts` (`layout:` prefix)
- `packages/shared` (mocks, test-utils, utils), `packages/http-client` (TMDB heyAPI client)
- `packages/tokens` (design tokens, OKLCH/DTCG format)

## Critical Workflow Rules
- **Be concise** — no recap, no enumerations, no unsolicited explanations. Act, then report briefly if needed.
- **Discuss approach FIRST** — never code without confirming approach
- **Review → Test → Commit** per change — no accumulation
- **Never execute commands** — propose only. Exceptions: (1) user says "execute", "run", etc. (2) `pnpm type-check && pnpm lint && pnpm test` from root — MUST run after every code change, never skip
- **Risky actions** (git push, reset --hard, rm -rf) require explicit permission EVERY TIME
- **Never hallucinate** — if uncertain, read code first
- **Always use context7** for any question about an API, library, or package
- **Secrets** — live in `.env*` files — never in rules, memory, or code
- **Never `console.log`** — use `console.warn` / `console.error`
- **Never explicit `any`** — strict TypeScript
- **Always run** lint + typecheck + test once a set of modifications is done
- **Always ask** user to run pnpm dev, pnpm prod:server and pnpm storybook after having modified a component
- **Always create a Storybook story** after every component (`/story`)
- **Model**: Haiku for questions/research, Sonnet for code/commits — suggest Haiku when appropriate

## Code Conventionsyes
- Functional components: `const Name: FC<NameProps> = ({ ... }) => { ... }`
- Import order: external → @vite-mf-monorepo/* → relative → `import type` (newlines between groups)
- `clsx` for conditional classes
- CSS prefixes: `ui:` (packages/ui), `layout:` (layouts), `mda:` (media), `hm:` (home), `ph:` (photos), `sr:` (search)
- When creating style with prefix, it MUST be in this order: prefix:modifier:style. ex: `layout:md:py-4`

## Session State (updated by `/end-session`)

### Completed
- Sentry error monitoring: instrument.ts per app, MF-aware init, wrapCreateBrowserRouterV7, React 19 hooks, source maps upload
- /sonar skill: fetches SonarCloud issues by severity via REST API
- README.md restructured: TOC, heading hierarchy, back-to-top links, Sentry section
- Agent files translated from French to English (6 files in .claude/agents/)
- E2E testing: Cucumber.js + Playwright, 8 scenarios (2 smoke + 6 browse-media), orchestration script, page objects, MF sentinels
- MF sentinels: data-testid mf-ready/mf-error/mf-loading on all 3 remotes
- E2E run modes: headless, headed, trace, codegen via orchestration scripts (packages/e2e/scripts/)
- Pre-commit hook: smoke E2E added after lint/typecheck/test
- README.md: E2E section with run modes, env vars, architecture
- Claude PR reviewer: workflow `claude-review.yml` with GitHub App `fubaritico-claude-reviewer`, auto review + verdict APPROVE/REQUEST_CHANGES, auto PR description
- `postinstall` script: `chmod +x scripts/*.sh` safety net for first-time cloners
- All 5 npm packages switched to public access (`publishConfig.access: "public"`)
- Both npm orgs (`@fubar-it-co`, `@vite-mf-monorepo`) downgraded from Pro to Free ($0/mth)
- npm 2FA configured with Touch ID (security key "stephane")
- `@vite-mf-monorepo/layouts@0.2.0` published: added `/next` (Server Component RootLayout) and `/react-router` entry points, CJS output alongside ESM, `dist/` added to ESLint ignores
- `@vite-mf-monorepo/shared@0.0.3` published: bundled CSS exports (`./theme.css`, `./theme-no-fonts.css`, `./fonts.css`) with all `@fontsource` and `@vite-mf-monorepo/tokens` imports inlined, font files (.woff/.woff2) copied to `dist/files/`, postcss-import build step, `copy-fonts.js` script
- `@vite-mf-monorepo/layouts` switched to unbundled ESM build: `bundle: false` in tsup, CJS dropped, `'use client'` directive on Header preserved in output, `react-router-dom` moved to optional peerDependency, CSS side-effect import removed from barrel, build order fixed (js then css)
- `@vite-mf-monorepo/ui` switched to unbundled ESM build (same approach as layouts)
- `@vite-mf-monorepo/shared@0.0.4`: moved react, react-dom, react-router-dom from dependencies to peerDependencies (fixes dual React in consumers) — published to npm
- `@vite-mf-monorepo/ui@0.2.0` published: split Button and MovieCard into `./react-router` and `./next` entry points, shared visual logic extracted (`Button.utils.ts`, `MovieCardContent.tsx`), `next` as optional peerDep, Tailwind `@source` fixed for `.ts` files
- `@vite-mf-monorepo/ui` published: added HeroImage `/next` variant (`next/image` with `fill`+`priority`+`sizes`, persistent skeleton, gradient overlay), exported from `./next` entry point
- CLAUDE.md rule updated: `pnpm type-check && pnpm lint && pnpm test` from root is now a mandatory self-run exception (no longer propose-only)
- `@vite-mf-monorepo/ui`: added `NextImage` component (`src/next/Image/`) — reusable `next/image` wrapper with `data-state`, opacity transition, error fallback, `blurDataURL` auto-toggle; `MovieCard /next` now uses local `MovieCardContent` with `NextImage`; `HeroImage /next` refactored to use `NextImage`; `blurDataURL` added to `MovieCardBaseProps`; `next/image` added to tsup externals
- `@vite-mf-monorepo/ui` switched to unbundled ESM build: `bundle: false` with glob entry (`src/**/*.{ts,tsx}`), dist mirrors src structure, `'use client'` directives preserved per-file naturally (no plugin needed), `minify: true` for JS, `--minify` for CSS, build order fixed (JS then CSS), export path corrected to `dist/styles.css`

- `@vite-mf-monorepo/ui@0.4.12` published: added `as="zone-link"` variant to MovieCard and Button `/next` exports — plain `<a>` tag for cross-zone navigation in Next.js Multi-Zones, visually identical to `as="link"`, with tests
- `@vite-mf-monorepo/layouts@0.4.2` published: added `crossZoneHome` prop to `next/RootLayout` — renders logo as plain `<a href="/">` instead of `next/link` for multi-zone setups, with tests
- Media sections (Cast, Crew, Photos, TrailersSection) now branch on `mediaType` (movie/tv) using `getMediaTypeFromPath` — fixes wrong content when TV series shares ID with a movie
- TV series mock data (Breaking Bad 1396): credits, images, videos + MSW handlers in `packages/shared`
- Hook tests for `useTVCredits`, `useTVImages`, `useTVVideos` (13 new tests)
- Fix TrailersSection loading state duplicate heading (removed `title` prop from Section, kept Typography)
- `NextImage` `imageClassName` prop + `HeroImage /next` sizing (`aspect-[21/9]` + `max-h-[440px]`)
- E2E: skip flaky "Navigating to the next photo" scenario (`@skip` tag + `not @skip` filter in cucumber config), bump timeout to 15s, add waitFor on Next button
- `@vite-mf-monorepo/ui@0.4.22` published: added `data-testid` to CarouselLoading (`carousel-loading`), Skeleton (`skeleton`), CarouselError (`carousel-error`) for consumer test assertions; removed redundant `pnpm build` from release scripts
- `@vite-mf-monorepo/ui@0.5.6` published: split `NextImage` into server and client variants — `NextImage` (no `'use client'`, full opacity, SSR-safe) and `NextImageClient` (fade-in, error fallback, `data-state`); `HeroImage` and `MovieCardContent` now server-compatible; `HeroImage` uses `w1280` instead of `original`, accepts `blurDataURL`; added `imageStyle` and `imageClassName` props to `NextImage`
- Merged standalone Crew section into MediaHero — director and writers display inline in hero overlay; removed Crew component, tests, storybook story, barrel exports; added credits MSW handlers to MediaHero stories
- `Input` component in `packages/ui`: three sizes (sm/md/lg), optional right icon (IconName), label with auto htmlFor/id, info/error message with aria-describedby/aria-invalid, destructive styling on error, Storybook story (Playground + Showcase, controls disabled on Showcase), 25 tests
- `Menu` compound component in `packages/ui`: `Menu` + `Menu.Item` via context, `role="listbox"`/`role="option"` ARIA pattern, keyboard nav (Arrow Up/Down, Home/End, Enter/Space, Escape), `variant` prop (`light`/`dark`) with primary/secondary color states (hover, selected, active, disabled), item register/unregister lifecycle for dynamic lists, Storybook story (Playground with inline-radio controls + Showcase 3-col grid), 28 tests
- `Portal` component in `packages/ui`: refactored with `useState` + proper cleanup, exported from barrel with `PortalProps` type
- `Listbox` base components: extracted `ListboxList` and `ListboxItem` shared visual primitives, composed by both `Menu` and `Typeahead`
- Refactored `Menu`/`MenuItem` to compose `ListboxList`/`ListboxItem` base components
- `Typeahead` compound component in `packages/ui`: `Typeahead.Input` (composing Input, combobox ARIA), `Typeahead.Menu`/`Item` (composing Listbox), `Typeahead.Empty`, `Typeahead.Highlight` (bold matching chars), `minChars` prop (default: 2), debounced `onSearch`, click-outside dismiss, `clearOnSelect`, `portal` prop for overflow escape (fixed positioning via `inputRef` + scroll/resize tracking), light/dark variant, 52 tests, Storybook story (Playground + Showcase with overflow demo)
- Applied `ComponentProps<'element'>` / `ComponentProps<typeof Component>` pattern to `Input`, `Menu`, `MenuItem`, `ListboxList`, all Typeahead sub-components
- Added `ComponentProps` rule to `patterns-ui.md` — always use over `HTMLAttributes`
- `fix(ui,layouts)`: replaced tsup DTS worker with `tsc --emitDeclarationOnly` — tsup's DTS worker OOMs with 92+ files, now uses separate `tsconfig.build.json`; fixed `MenuProps.onSelect` type conflict with native `onSelect` via `Omit`
- `apps/search` remote scaffolded: new MF remote on port 3004 (prefix `sr:`), exposes `./Search` and `./routes`, registered in host federation config and router (`/search`), MF sentinel `data-testid="mf-ready-search"`, Sentry instrument, deploy-search.yml workflow, VITE_SEARCH_URL added to deploy-host.yml, kill-ports.sh updated with ports 3003+3004
- `patterns-remote-setup.md` rewritten: full step-by-step operational guide (7 steps) covering files, host wiring, CI/CD, Netlify, GitHub secrets, checklist
- `Drawer` compound component in `packages/ui`: Header, Body sub-components, Portal rendering, dark/light variants, overlay with click-to-close, Escape key, slide-up animation, 16 tests
- `IconButton` `ghost-dark` variant for dark backgrounds
- Moved `useIsMobile` from `shared/utils/` to `shared/hooks/` with barrel file
- `RootLayout` accepts `headerChildren` prop for header slot injection
- `SearchTypeahead` in `apps/search`: mobile Drawer + desktop Typeahead, `useSearchMulti` hook (debounced), grouped results (movies, TV, people) with person department display, 11 component tests + 5 hook tests
- `HeaderSearch` wrapper in `apps/host`, integrated via `headerChildren` in RootLayout
- E2E orchestration (`run-e2e.mjs`, `run-codegen.mjs`) updated to include search service (port 3004, 5 services total)
- Storybook story for `Drawer`: Playground (variant + overlay controls) + Showcase (Light, Dark, Overlay, Scrollable)
- Storybook story for `SearchTypeahead`: live TMDB API (no mocks), catch-all router for item clicks, centered layout
- Search app registered in Storybook: alias in `main.ts`, tsconfig paths, `remote.css` in preview
- `SearchTypeahead` error state: `isError` handling — desktop "Search unavailable" in Typeahead.Empty, mobile Drawer error header + message
- `Input` focus ring: migrated from `ring-2 ring-offset-2` (v3 box-shadow hack) to `outline-2 outline-offset-2` (v4 native CSS), removed `transition-colors` on outline to prevent black-to-orange flash
- `fix(ci)`: corrected `SEARCH_PHOTOS_PORT` → `REMOTE_SEARCH_PORT` typo in `e2e.yml`
- `fix(search)`: removed unnecessary `String()` in `instrument.ts`
- Search results page (Phase 2): route changed to `/search/:query`, `useSearchMultiInfinite` hook (TanStack `useInfiniteQuery` with pagination), `SearchMedia` component (movies/TV rows with poster, title, year, stars rating, divider lines, "More results" button), `SearchPeople` component (actors/directors with Avatar, department, known_for), `Search.tsx` page orchestrator (hero image, dark search bar, grouped results by movies/TV/actors/directors), utility functions (`isActor`, `isDirector`, `getResultYear`, `getPersonKnownFor`, `getProfileImageUrl`, `getPosterUrl`)
- `HeaderSearch` hides on `/search/:query` via `useMatch` — no duplicate search input on results page
- Document title set dynamically: `Search results for "query"` on search page
- Search results page tests: 10 SearchMedia tests + 6 SearchPeople tests
- README.md updated: search app added to Team Organization, Deploy Workflows (5→6), Netlify secrets (`NETLIFY_SITE_ID_SEARCH`), application secrets (`VITE_SEARCH_URL`)
- Responsive CSS pass (mobile/tablet, iPhone 12 Pro reference): HeroSection line-clamp-3 on mobile, Carousel nav buttons hidden on mobile via `useIsMobile` + pagination dots centered, touch swipe handling (touchstart/touchend, 50px threshold, `touch-action-pan-x`), Section/Header/Footer responsive padding/height tiers, media section title margins responsive (`mb-0` mobile, `mb-3` tablet, `mb-6` desktop)
- MediaHero: tagline hidden on mobile (`useIsMobile`), title truncated on mobile (`truncate` + `sm:whitespace-normal`)
- PhotosModal: swipe support without triggering click-to-close (`swipedRef` pattern — touchStart resets, touchMove sets, click handler skips `onClose` when swiped)
- `useIsMobile` SSR/jsdom guard: `typeof window.matchMedia !== 'function'` check prevents test crashes
- CSS prefix ordering rule added to CLAUDE.md: `prefix:modifier:style` (e.g. `layout:md:py-4`)
- iOS Safari input zoom fix: `text-base sm:text-sm` on `inputSize="sm"` — 16px mobile prevents auto-zoom
- Mobile testing workflow: `pnpm dev:mobile` / `pnpm dev:local` — reverse proxy through host (single origin), auto LAN IP detection, `.env.local` backup/restore, `wait-on` readiness check
- Host `server.js`: `/_remote/:app` reverse proxy (only when `DEV_MOBILE=true`) with detailed documentation
- Search `server.js`: fixed SPA fallback for `/search/:query` route (Express 5 syntax)
- New reference file: `testing-on-iphone-locally.md` — full guide with architecture, caveats, debugging, failed approaches
- Troubleshooting: 3 new sections (iOS Safari zoom, cross-origin import, mobile workflow)

- `SearchBar` component tests: 13 tests (render, navigation, encoding, trim, min chars guard, Enter key, className/props spread)
- Storybook stories for `SearchMedia` (Movies, TVShows, WithShowMore, Empty, LoadingMore) and `SearchPeople` (Actors, Directors, WithShowMore, Empty, LoadingMore) — barrel exports added for Storybook consumption
- E2E functional scenarios: `search-and-browse.feature` (typeahead → Inception → photos → backdrop close), `search-results.feature` (Enter submit → sections → refine → click result), `browse-tv.feature` (Popular TV tab → TV detail page)
- E2E page objects: `SearchPage.ts` (combobox, option items), `SearchResultsPage.ts` (heading, sections, search bar, items)
- E2E step definitions: `search-and-browse.steps.ts`, `search-results.steps.ts`, `browse-tv.steps.ts` with world `currentSection` for cross-step scoping
- Re-enabled previously skipped photo navigation scenario (removed `@skip` tag from `browse-media.feature`)
- E2E a11y infrastructure: `@axe-core/playwright` installed, `a11y.steps.ts` (full page + scoped region WCAG 2.1 AA audits), `a11y-keyboard.steps.ts` (keyboard-only navigation: Tab, ArrowDown, ArrowRight, Enter, Escape)
- E2E a11y feature files: `a11y-browse-media.feature`, `a11y-search-and-browse.feature`, `a11y-search-results.feature`, `a11y-browse-tv.feature`
- E2E scripts: `test:a11y` / `test:ui:a11y` in e2e and root package.json (dedicated scripts — `--` separator causes cucumber to interpret `@tag` as rerun file path)
- Design token fix: `primitive.neutral.500` changed from `#737373` to `#6b6b6b` for WCAG AA contrast compliance (4.60:1 on #f5f5f5, 5.03:1 on white), tokens rebuilt
- Smoke steps updated: search added to remotes array

### Next
- Fix remaining a11y E2E failures: (1) `I open the application` timeout 5s→15s for a11y scenarios, (2) search typeahead contrast issues (muted-foreground on dark bg, year text opacity-50), (3) nested-interactive violation (focusable `<a>` inside `role="option"` in ListboxItem)

### Known Issues
- packages/shared exports: add to `exports` when a new subpath is imported
- `.env.production` overrides `VITE_*_URL` with Netlify URLs during `--mode production` builds; E2E script injects localhost overrides via `localRemoteEnv`
- GitHub Apps ne comptent pas comme "reviewers with write access" pour les rulesets — leur approval ne débloque pas le merge même avec bypass list
- `packages/layouts/publish.sh` git push fails — tries to push `release/layouts` branch that doesn't exist
- `packages/layouts/.npmrc` contains npm token, not in `.gitignore` — must not be committed
- `packages/ui/.npmrc` contains npm token, not in `.gitignore` — must not be committed
- Stale `apps/host/@mf-types/search/compiled-types/components/SearchMovies/` directory from rename to SearchMedia — can be deleted
- `pnpm dev:mobile`: first load on deep route (e.g. `/tv/2345`) fails — must start from `/` to init MF runtime, then navigate
- a11y E2E: `I open the application` step times out at 5s in a11y scenarios (3 of 5 fail) — needs `{ timeout: 15_000 }`
- Typeahead dark variant: muted-foreground (`#6b6b6b`) on dark bg (`#171717`) fails WCAG AA contrast (3.36:1 < 4.5:1) — affects group labels ("Movies", "TV Shows")
- Typeahead dark variant: year text with `sr:opacity-50` on dark bg fails contrast (4.41:1 < 4.5:1)
- ListboxItem with `role="option"` contains focusable `<a>` descendants — axe nested-interactive violation

## Reference Files (load on demand — NOT auto-loaded)
| File | When to load |
|---|---|
| `patterns-ui.md` | UI component, design system story |
| `patterns-section.md` | Section, hook, mock, test |
| `patterns-page.md` | Page orchestrator, Outlet |
| `patterns-route.md` | RouteComponent, MF router, nested route |
| `patterns-remote-setup.md` | New remote app from scratch |
| `architecture.md` | Stack, scripts, CSS, Module Federation |
| `troubleshooting.md` | Debug, architectural decisions |
| `testing-on-iphone-locally.md` | Mobile testing on iPhone via LAN |

**Before coding**: ask which reference files are needed — do NOT start coding without the relevant files loaded.
