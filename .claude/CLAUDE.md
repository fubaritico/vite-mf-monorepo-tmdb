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

### Next
- Commit pending E2E changes (2 commits — see end of previous session for exact commands)

### Known Issues
- packages/shared exports: add to `exports` when a new subpath is imported
- `.env.production` overrides `VITE_*_URL` with Netlify URLs during `--mode production` builds; E2E script injects localhost overrides via `localRemoteEnv`

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
