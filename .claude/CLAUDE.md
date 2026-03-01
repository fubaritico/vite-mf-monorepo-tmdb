# vite-mf-monorepo — Claude Code Instructions

## Project
TMDB media app. Lerna + pnpm workspaces. Module Federation.
- `apps/host` (3000), `apps/home` (3001), `apps/media` (3002)
- `packages/ui` (design system, `ui:` prefix), `packages/layouts` (`layout:` prefix)
- `packages/shared` (mocks, test-utils, utils), `packages/http-client` (TMDB heyAPI client)

## Critical Workflow Rules
- **Discuss approach FIRST** — never code without confirming approach
- **Review → Test → Commit** per change — no accumulation
- **I propose commands, user executes** (exception: read-only git/ls)
- **Never hallucinate** — if uncertain, say so and read the code first
- **Ask permission** before consulting external docs (APIs, libraries)
- **Never `console.log`** — use `console.warn` / `console.error`
- **Never explicit `any`** — strict TypeScript
- **Always run** lint + typecheck + test before commit

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

### Next
- 🎯 Button polymorphic (as='link' | as='button') → then Cast Section (Phase 4.8)

### Pending
- Phase 3.10: rounded={false} on all carousels

### Known Issues
- Font loading in remotes → use `theme-no-fonts.css`
- Tailwind reserved names → never use `container`, use `media-section`

## Reference Files (use @mention to load)
- Patterns & templates: `@.claude/rules/component-patterns.md`
- Architecture & stack: `@.claude/rules/architecture.md`
- Bugs & decisions: `@.claude/rules/troubleshooting.md`
- Full roadmap: `@files/ROADMAP.md`

## Skills (slash commands)
- `/new-ui-component [Name]` — create UI component in packages/ui
- `/new-section [AppName] [SectionName]` — create embedded-query section in any app
- `/story [Name]` — create Storybook story (**mandatory** after every component)
- `/commit` — prepare conventional commit message
