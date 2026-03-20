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
- **Never execute commands** — propose only. Exception: user says "execute", "run", etc.
- **Risky actions** (git push, reset --hard, rm -rf) require explicit permission EVERY TIME
- **Never hallucinate** — if uncertain, read code first
- **Always use context7** for any question about an API, library, or package
- **Secrets** — live in `.env*` files — never in rules, memory, or code
- **Never `console.log`** — use `console.warn` / `console.error`
- **Never explicit `any`** — strict TypeScript
- **Always run** lint + typecheck + test + Storybook before commit
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

### Next
- Continue making packages usable for React Router and Next.js: `packages/ui` is next

### Known Issues
- packages/shared exports: add to `exports` when a new subpath is imported
- `.env.production` overrides `VITE_*_URL` with Netlify URLs during `--mode production` builds; E2E script injects localhost overrides via `localRemoteEnv`
- GitHub Apps ne comptent pas comme "reviewers with write access" pour les rulesets — leur approval ne débloque pas le merge même avec bypass list
- `packages/layouts/publish.sh` git push fails — tries to push `release/layouts` branch that doesn't exist
- `packages/layouts/.npmrc` contains npm token, not in `.gitignore` — must not be committed

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
