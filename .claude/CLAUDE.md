# vite-mf-monorepo — Claude Code Instructions

## Project
TMDB media app. Lerna + pnpm workspaces. Module Federation.
- `apps/host` (3000), `apps/home` (3001), `apps/media` (3002)
- `packages/ui` (design system, `ui:` prefix), `packages/layouts` (`layout:` prefix)
- `packages/shared` (mocks, test-utils, utils), `packages/http-client` (TMDB heyAPI client)

## Critical Workflow Rules
- **Discuss approach FIRST** — never code without confirming approach
- **Review → Test → Commit** per change — no accumulation
- **Never execute commands** — propose only. Exception: user says "execute", "run", etc.
- **Never hallucinate** — if uncertain, say so and read the code first
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
- `mda:` prefix in apps/media, `hm:` in apps/home

## Architecture Decisions
- **Embedded queries**: each section fetches its own data (no React Router loaders)
- **Function overloads**: for conditional hooks (no conditional hook calls)
- **CSS nth-of-type**: alternating section backgrounds via CSS, not props
- **theme-no-fonts.css**: remotes import this instead of full theme

## Session Notes (1 Mars 2026)

### Completed
- Phase 3.7, 3.11, 3.12, 3.13 ✅
- Phase 4.1 (media rename), 4.2 (routing), 4.3 (hooks), 4.4 (MediaHero) ✅
- Phase 4.5 (Synopsis), 4.7 (Crew), 4.7.1 (alternating backgrounds) ✅
- Button polymorphic (as='link' | as='button') ✅
- Phase 4.8 (Cast Section) ✅

### Next
- 🎯 Phase 4.6 — Photos Section + PhotoViewer remote (planifié, prêt à coder)
  - Plan B (host orchestrateur, background location routing) — voir ROADMAP.md §4.6
  - 10 commits : Modal → Carousel lightbox → apps/photos → host routing → media Photos
- Phase 4.9 — Trailers & Clips Section
- Phase 4.10 — You May Also Like Section (similar movies carousel)

### Pending
- (rien pour l'instant)

### Known Issues
- Font loading in remotes → use `theme-no-fonts.css`
- Tailwind reserved names → never use `container`, use `media-section`
- packages/shared exports: ajouter dans `exports` si un nouveau sous-chemin est importé

## Model Selection
- **Haiku** — questions simples, explications, recherche, status, discussion
- **Sonnet** — code, refactoring, debug, architecture, commits
- Évaluer la complexité avant de répondre et suggérer Haiku si approprié

## Reference Files (load on demand — NOT auto-loaded)
| File | When to load |
|---|---|
| `.claude/rules/component-patterns.md` | Création composant, section, story, test |
| `.claude/rules/architecture.md` | Stack, scripts, CSS, Module Federation |
| `.claude/rules/troubleshooting.md` | Debug, décision architecturale |
| `files/ROADMAP.md` | Planification, roadmap |

**Before coding**: based on the user's task description, ask which reference files are needed — do NOT start coding without the relevant files loaded.

## Skills (slash commands)
- `/new-ui-component [Name]` — create UI component in packages/ui
- `/new-section [AppName] [SectionName]` — create embedded-query section in any app
- `/story [Name]` — create Storybook story (**mandatory** after every component)
- `/commit` — prepare conventional commit message
