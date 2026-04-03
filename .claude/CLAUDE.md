# vite-mf-monorepo — Claude Code Instructions

## Project
TMDB media app. Lerna + pnpm workspaces. Module Federation.
- `apps/host` (3000), `apps/home` (3001), `apps/media` (3002), `apps/photos` (3003, `ph:` prefix)
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
- CSS prefixes: `ui:` (packages/ui), `layout:` (layouts), `mda:` (media), `hm:` (home), `ph:` (photos)

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

### Next
- Typeahead feature: Input done, Menu done. Next is **(3) Typeahead** — compound component composing Input + Menu with shared context for search state, keyboard nav, open/close. Typeahead calls TMDB search endpoint for talents or movies, displays suggestions via renderItem. After UI components, create search page wiring with hooks + debounce. Work in Storybook first.

### Known Issues
- packages/shared exports: add to `exports` when a new subpath is imported
- `.env.production` overrides `VITE_*_URL` with Netlify URLs during `--mode production` builds; E2E script injects localhost overrides via `localRemoteEnv`
- GitHub Apps ne comptent pas comme "reviewers with write access" pour les rulesets — leur approval ne débloque pas le merge même avec bypass list
- `packages/layouts/publish.sh` git push fails — tries to push `release/layouts` branch that doesn't exist
- `packages/layouts/.npmrc` contains npm token, not in `.gitignore` — must not be committed
- `packages/ui/.npmrc` contains npm token, not in `.gitignore` — must not be committed
- E2E "Navigating to the next photo in the carousel" scenario flaky in CI (timeout on Next button click) — skipped with `@skip` tag, needs investigation

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

**Before coding**: ask which reference files are needed — do NOT start coding without the relevant files loaded.
