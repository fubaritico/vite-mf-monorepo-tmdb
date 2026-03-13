# vite-mf-monorepo — Claude Code Instructions

## Project
TMDB media app. Lerna + pnpm workspaces. Module Federation.
- `apps/host` (3000), `apps/home` (3001), `apps/media` (3002), `apps/photos` (3003, `ph:` prefix)
- `packages/ui` (design system, `ui:` prefix), `packages/layouts` (`layout:` prefix)
- `packages/shared` (mocks, test-utils, utils), `packages/http-client` (TMDB heyAPI client)
- `packages/tokens` (design tokens, OKLCH/DTCG format)

## Critical Workflow Rules
- **During work**: Explain what you do. Commands, changes, steps — but no unnecessary comments or enumerations.
- **Discuss approach FIRST** — never code without confirming approach
- **Review → Test → Commit** per change — no accumulation
- **Never execute commands** — propose only. Exception: user says "execute", "run", etc.
  - **ESPECIALLY `git push`** — NEVER push without explicit user approval ("execute" or user provides command)
  - Risky actions (git push, git reset --hard, rm -rf, etc.) require explicit permission EVERY TIME
- **Never hallucinate** — if uncertain, say so and read the code first, ask to search online and give sources
- **Secrets** — toute information sensible (tokens, clés API, credentials) est dans les fichiers `.env*` — jamais dans les rules, memory ou dans le code
- **Documentation reference** - Always get latest information from context7
- **Ask permission** before consulting external docs (APIs, libraries)
- **Never `console.log`** — use `console.warn` / `console.error`
- **Never explicit `any`** — strict TypeScript
- **Always run** lint + typecheck + test before commit
- **Always test** in Storybook + app before commit

## Code Conventions
- Functional components only: `const Name: FC<NameProps> = ({ ... }) => { ... }`
- Import order: external → @vite-mf-monorepo/* → relative → `import type`
- Newlines between import groups
- Single quotes, 2 spaces, semicolons (Prettier)
- `.tsx` for JSX files, `.ts` for pure TS
- `clsx` for conditional classes
- `ui:` prefix for all Tailwind classes in packages/ui
- `mda:` prefix in apps/media, `hm:` in apps/home, `ph:` in apps/photos

## Commands
```bash
pnpm test                              # all tests
pnpm test -- ComponentName             # single file by name pattern
pnpm test -- --grep "test description" # single test by name
pnpm storybook                         # Storybook on port 6006
pnpm lint:fix                          # auto-fix ESLint
pnpm type-check                        # TypeScript no-emit
```
See also: [Production builds](README.md#production-build-commands) · [Setup](README.md#getting-started) · [CI/CD](README.md#continuous-integration--deployment)

## Architecture Decisions
- **Embedded queries**: each section fetches its own data (no React Router loaders)
- **Function overloads**: for conditional hooks (no conditional hook calls)
- **CSS nth-of-type**: alternating section backgrounds via CSS, not props
- **theme-no-fonts.css**: remotes import this instead of full theme

## Session State (updated by `/end-session`)

### Completed
- Phases 3.x, 4.1–4.11 ✅ (media rename, routing, hooks, MediaHero, Synopsis, Crew, Cast, Photos, Trailers, Similar, Recommended)
- Button polymorphic (as='link' | as='button') ✅
- component-patterns.md découpé en patterns-ui / patterns-section / patterns-page / patterns-route ✅

### Next
- Consulter `files/ROADMAP.md` pour les prochaines phases

### Known Issues
- packages/shared exports: ajouter dans `exports` si un nouveau sous-chemin est importé

## Model Selection
- **Haiku** — questions simples, explications, recherche, status, discussion
- **Sonnet** — code, refactoring, debug, architecture, commits
- Évaluer la complexité avant de répondre et suggérer Haiku si approprié

## Reference Files (load on demand — NOT auto-loaded)
| File | When to load |
|---|---|
| `.claude/rules/patterns-ui.md` | Création composant UI (packages/ui, layouts), story design system |
| `.claude/rules/patterns-section.md` | Création section app, hook, mock, test |
| `.claude/rules/patterns-page.md` | Page orchestrator (Home, Media) — composition de sections, Outlet |
| `.claude/rules/patterns-route.md` | RouteComponent, router MF, intégration host, modal nested route |
| `.claude/rules/patterns-remote-setup.md` | Nouveau remote app from scratch — vite.config, CSS, main, host registration |
| `.claude/rules/architecture.md` | Stack, scripts, CSS, Module Federation |
| `.claude/rules/troubleshooting.md` | Debug, décision architecturale |
| `files/ROADMAP.md` | Planification, roadmap |

**Before coding**: based on the user's task description, ask which reference files are needed — do NOT start coding without the relevant files loaded.

## Skills (slash commands)
- `/new-ui-component [Name]` — create UI component in packages/ui
- `/new-section [AppName] [SectionName]` — create embedded-query section in any app
- `/story [Name]` — create Storybook story (**mandatory** after every component)
- `/commit` — prepare conventional commit message
- `/message-commit` — prepare conventional commit message only
- `/start-session` — resume a work session
- `/end-session` — update Session State in CLAUDE.md before closing
