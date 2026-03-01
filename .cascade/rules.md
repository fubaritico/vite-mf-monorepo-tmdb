# vite-mf-monorepo Project Rules

## Development Environment

- **IDE**: IntelliJ IDEA (WebStorm)
- **Package Manager**: pnpm (version 10.8.1)
- **Operating System**: macOS
- **Node Version**: >= 22.11.0

## User Preferences & Workflow

### Communication Style
- **Terse and direct responses** - No verbose explanations, get to the point
- **No acknowledgment phrases** - Never start with "You're absolutely right!", "Great idea!", etc.
- **Fact-based progress updates** - Brief summaries after tool calls when needed
- **Ask for clarification** only when genuinely uncertain about intent or requirements

### Code Style Preferences
- **Prefer inline transformations** over utility functions (unless reused 3+ times)
- **Prefer explicit code** over clever abstractions
- **Prefer composition** over inheritance
- **Prefer minimal edits** - focused, scoped changes over large refactors
- **No helper scripts** or hard-coded shortcuts

### Workflow Preferences
- **Review → Test → Commit** workflow is MANDATORY for each change
- **One feature per commit** (atomic commits with conventional commit messages)
- **Always run lint/typecheck/test** before proposing commit
- **Discuss approach first** before coding (CRITICAL - never code without asking)
- **Explain step by step** what will be modified and why
- **Ask permission before consulting documentation** to avoid hallucinations

### Decision-Making Preferences
- **Start simple, refactor when needed** (YAGNI principle)
- **Prefer centralized solutions** over duplication
- **Prefer CSS control** over component props for page-level styling
- **Prefer embedded queries** over React Router loaders for sections
- **Prefer function overloads** over conditional hook calls

### Testing Preferences
- **Always use userEvent** (never fireEvent) for user interactions
- **Reuse shared mocks** from `@vite-mf-monorepo/shared/mocks` (DRY)
- **Test loading/error/empty states** for all data-fetching components
- **Mock at module level** with `vi.mock()` for hooks and router

## Session Notes Template

**Purpose**: Track current status, known issues, and next steps between sessions.

**Location**: Update this section at end of each session or when switching context.

### Current Session (1 Mars 2026)

**Status**:
- ✅ Phase 3.7 Detail Pages - Completed (MediaHero)
- ✅ Phase 3.11 Navigation to Media Detail - Completed
- ✅ Phase 3.12 Test Utilities Refactoring - Completed
- ✅ Phase 3.13 Bug fix TrendingSection carousel - Completed (queryKey includes timeWindow)
- ✅ Phase 4.5 Synopsis - Completed
- ✅ Phase 4.7 Crew - Completed (Director + Writers with Talent component)
- ✅ Avatar 2xl size added (128px for crew photos)
- ✅ Alternating section backgrounds via CSS (media-section class)

**Next Priority**:
- 🎯 Phase 4.8 Top 10 Cast Section (CastCard + Carousel with top 10 actors)

**Known Issues to Watch**:
- ⚠️ Font loading in remotes - use `theme-no-fonts.css` instead of full theme
- ⚠️ Tailwind reserved class names - avoid `container`, use custom names like `media-section`

**Recent Decisions**:
- All Container components use `variant="default"`, CSS controls backgrounds
- Talent component accepts optional `name`/`role` to match TMDB API types
- Embedded queries pattern for all Media sections (no React Router loaders)

**Pending Tasks** (from Phase 3):
- Phase 3.10 Carousel styling consistency (rounded={false})

## Command Aliases

**Purpose**: Automate common workflows and reduce repetitive commands.

### Development Workflow Aliases

```bash
# Alias: "mise à jour" or "update"
# Action: Update memory, plan, and ROADMAP.md with session summary
# Usage: User says "mise à jour" → AI updates all documentation

# Alias: "commit" or "git commit"
# Action: Full commit workflow automation
# Steps:
#   1. Run git status to see changed files
#   2. Analyze changes to understand what was modified
#   3. Generate clear, concise, complete conventional commit message
#   4. Provide git add command for all relevant files
#   5. Provide git commit command with generated message
# Format: type(scope): subject + optional body with bullet points
# Example output:
#   git add apps/media/src/components/Crew/ packages/ui/src/Avatar/ packages/ui/src/Talent/
#   git commit -m "feat(media): improve Crew component and add alternating backgrounds
#   
#   - Add size 2xl (128px) to Avatar for larger crew photos
#   - Make Talent name/role props optional with fallbacks
#   - Fix Crew to handle undefined crew data gracefully
#   - Add media-section class to Container for CSS targeting
#   - Implement alternating backgrounds via CSS nth-of-type"

# Alias: "commit [feature]" or "commit crew"
# Action: Same as "commit" but with context hint for scope
# Usage: User says "commit crew" → AI focuses on crew-related changes

# Alias: "test [component]" or "test crew"
# Action: Run tests for specific component/package
# Commands: pnpm --filter @vite-mf-monorepo/[package] test

# Alias: "lint fix"
# Action: Run ESLint with auto-fix
# Command: pnpm lint:fix

# Alias: "check all"
# Action: Run full validation suite (lint, typecheck, test)
# Commands: pnpm lint && pnpm typecheck && pnpm test
```

### Component Creation Aliases

```bash
# Alias: "create ui component [Name]"
# Action: Create new component in packages/ui with boilerplate
# Files: ComponentName.tsx, ComponentName.test.tsx, index.ts

# Alias: "create media section [Name]"
# Action: Create new section in apps/media with embedded query pattern
# Files: SectionName.tsx, SectionName.test.tsx, index.ts

# Alias: "create hook [name]"
# Action: Create new TanStack Query hook in apps/[app]/src/hooks/
# File: useHookName.ts with proper pattern
```

### Documentation Aliases

```bash
# Alias: "doc pattern [name]"
# Action: Add new pattern to .windsurfrules Additional Development Patterns

# Alias: "doc bug [description]"
# Action: Add new bug/solution to files/TROUBLESHOOTING.md

# Alias: "update roadmap"
# Action: Update files/ROADMAP.md with current progress
```

### Debugging Aliases

```bash
# Alias: "debug [component]"
# Action: Add console.warn logs for investigation (remove after)

# Alias: "check types [file]"
# Action: Run TypeScript check on specific file
# Command: pnpm typecheck

# Alias: "check imports [file]"
# Action: Verify import order and missing imports
```

### Quick Reference Aliases

```bash
# Alias: "show patterns"
# Action: List all architectural patterns from .windsurfrules

# Alias: "show issues"
# Action: List common issues from TROUBLESHOOTING.md

# Alias: "show roadmap"
# Action: Display current phase and next steps from ROADMAP.md

# Alias: "show rules [category]"
# Action: Display specific rules (testing, css, typescript, etc.)
```

## AI Assistant Workflow Rules

**CRITICAL**: These rules must be followed at all times without exception.

### Before any code modification:
1. **Ask for explicit confirmation** before modifying any code, config, or file
2. **Explain step by step** what will be modified and why
3. **Never hallucinate or invent** - if uncertain, say so and verify via code reading/tools
4. **Provide sources** (links/docs/issues) when reasoning relies on external information
5. **Ask permission before consulting documentation** - When uncertain about syntax, API, or implementation details, ALWAYS ask "Puis-je consulter la documentation [library/tool] pour vérifier ?" before using read_url_content or search_web tools. This is MANDATORY and SYSTEMATIC to avoid hallucinations.

### Commit Workflow (MANDATORY):
**Each modification step MUST follow this workflow:**
1. ✅ **Review** - Verify the code generated is correct
2. ✅ **Test** - Execute tests (unit tests, lint, type-check)
3. ✅ **Commit** - Make an atomic commit with conventional commit message

**Examples:**
- Fix bug → Review code → Run tests → Commit → Next task
- Add feature → Review code → Run tests → Commit → Next task
- Refactor → Review code → Run tests → Commit → Next task

**Forbidden:**
- ❌ Accumulating multiple changes without intermediate commits
- ❌ Skipping tests before commit
- ❌ Moving to next task without committing current changes

### Terminal commands:
- **The user executes all terminal commands** - propose commands but never execute them
- Only exception: safe read-only commands like `git status`, `ls`, `cat`

### Debug logs:
- When adding debug logs (`console.warn`/`console.error`) for investigation, **remove them** once the investigation is complete

### Language:
- All code, comments, documentation, and README files must be in **English**

## Code Generation Rules for AI

**CRITICAL**: All code generated must be compliant with the project's ESLint and Prettier configuration.

### When generating code, ALWAYS:
- Sort imports alphabetically with proper groups (builtin, external, internal, parent, sibling, index, object, type)
- Add newlines between import groups
- Use functional React components only
- Never use `console.log` (only `console.warn` or `console.error`)
- Never use explicit `any` type
- Follow BEM-like CSS naming with context prefixes
- Use strict TypeScript types
- Add proper JSDoc comments when needed
- Ensure no unused variables or imports
- Use single quotes for strings (per Prettier config)
- Use 2 spaces for indentation
- Add semicolons at end of statements
- **Use `.tsx` extension for files containing JSX** (including test files with React components/JSX)
- Use `.ts` extension only for files with pure TypeScript (no JSX)

### React Component Patterns

**How to identify which pattern to use:**
- **Reusable Component**: If the request mentions "component", "UI", "reusable", "button", "input", "card", "modal", or any UI element without data fetching
- **Page Component**: If the request mentions "page", "route", "loader", "data fetching", "TanStack Query", or needs to fetch data from an API

#### 1. Reusable Components (UI Components)

**File structure:**
```
ComponentName/
├── ComponentName.tsx
├── ComponentName.css
└── ComponentName.test.tsx (if applicable)
```

**Component template:**
```typescript
import clsx from 'clsx'

import './ComponentName.css'

import type { FC, HTMLAttributes } from 'react'

export interface ComponentNameProps extends HTMLAttributes<HTMLDivElement> {
  /* Component prop description */
  propName?: string
  /* Size variant */
  size?: 'sm' | 'md' | 'lg'
  /* Visual variant */
  variant?: 'primary' | 'secondary'
}

const ComponentName: FC<ComponentNameProps> = ({
  className,
  propName,
  size = 'md',
  variant = 'primary',
  ...rest
}) => {
  return (
    <div
      className={clsx('ComponentName', size, variant, className)}
      {...rest}
    >
      {/* Component content */}
    </div>
  )
}

export default ComponentName
```

**Reusable component rules:**
- Use `clsx` for conditional class names
- Extend appropriate HTML attributes (HTMLAttributes, ButtonHTMLAttributes, etc.)
- Destructure props with defaults
- Spread remaining props with `{...rest}`
- Export interface as named export
- Export component as default
- Add JSDoc comments for all props
- Use PascalCase for root className
- Colocate CSS file

#### 2. Page Components (Route Components with Data Loading)

**File structure:**
```
PageName/
├── PageName.tsx
├── PageName.css
└── PageName.test.tsx (if applicable)
```

**Component template:**
```typescript
import { QueryClient } from '@tanstack/react-query'
import { useLoaderData, useQuery } from 'react-router-dom'

import './PageName.css'

import type { FC } from 'react'

// Type definitions
export type RouteComponent = FC & {
  loader: (queryClient: QueryClient) => () => Promise<DataType>
}

interface PageNameProps {
  // Props if needed
}

// Query definition
const query = () => ({
  queryKey: ['queryName'],
  queryFn: async () => {
    // Fetch logic
  },
})

// Loader for React Router
const loader = (queryClient: QueryClient) => async () => {
  return queryClient.ensureQueryData(query())
}

// Component
const PageName: RouteComponent = (props: PageNameProps) => {
  const initialData = useLoaderData<DataType>()

  const { data, error, isLoading } = useQuery<DataType>({
    ...query(),
    initialData,
  })

  if (isLoading) {
    return <div className="loading">Loading...</div>
  }

  if (error) {
    return <div className="error">{error.message}</div>
  }

  return (
    <div className="page-name">
      {/* Page content */}
    </div>
  )
}

export default PageName

// Attach loader to component
PageName.loader = loader
```

**Page component rules:**
- Use RouteComponent pattern for components with loaders
- Handle loading and error states explicitly
- Use kebab-case for root className
- Colocate CSS file
- Export RouteComponent type as named export
- Attach loader to component after export

**CSS naming convention (both types):**
- Root class: PascalCase for reusable components (`.Button`), kebab-case for pages (`.page-name`)
- Child elements: `.ComponentName-element` or `.page-name-element`
- Modifiers: Use clsx with variant props instead of BEM modifiers
- Context prefix for domain-specific components (e.g., `.movie-grid-card`)

**General component rules:**
- Always use functional components with arrow functions
- Export component as default
- Export types and interfaces as named exports
- Use data-testid attributes for testable elements
- Never use inline styles unless absolutely necessary

## Component Patterns & File Organization

### Component Types by Location

#### packages/ui (Design System - Tier 1 Primitives)
**Purpose**: Atomic, reusable UI components with no domain knowledge
**Examples**: Button, Card, Avatar, Badge, Rating, Carousel, Tabs, Skeleton, Typography
**Pattern**:
```
packages/ui/src/ComponentName/
├── ComponentName.tsx       # Component implementation
├── ComponentName.test.tsx  # Unit tests
└── index.ts               # Re-export
```
**Rules**:
- Use `ui:` prefix for all Tailwind classes
- No domain logic (no TMDB, no movie/tv concepts)
- Props extend HTML attributes (`ComponentProps<'button'>`, `HTMLAttributes<HTMLDivElement>`)
- Export interface as named export, component as default
- Use `clsx` for conditional classes
- No external CSS files (Tailwind only, except index.css for @layer definitions)

#### packages/layouts (Layout Components)
**Purpose**: Page structure components (Container, Section, Header, Footer, RootLayout)
**Pattern**: Same as packages/ui
**Rules**:
- Use `layout:` prefix for Tailwind classes
- Focus on structure, spacing, max-width
- No domain logic

#### apps/[app]/src/components/ (Domain Components)
**Purpose**: App-specific components with business logic and data fetching
**Examples**: MediaHero, Synopsis, Crew, MovieCard (when using domain data)
**Pattern**:
```
apps/media/src/components/ComponentName/
├── ComponentName.tsx       # Component with embedded query
├── ComponentName.test.tsx  # Tests with mocked hooks
└── index.ts               # Re-export
```
**Rules**:
- Use `mda:` prefix for media app, `hm:` for home app
- Embedded queries pattern (useQuery inside component, no props for data)
- Handle loading/error/empty states
- Can use domain-specific utilities (getMediaTypeFromPath, getImageUrl)

### Hooks Organization

#### apps/[app]/src/hooks/ (App-specific hooks)
**Purpose**: TanStack Query hooks for data fetching
**Pattern**:
```
apps/media/src/hooks/
├── useMovieDetails.ts      # Specific hook
├── useTVDetails.ts         # Specific hook
├── useMediaDetails.ts      # Generic with function overloads
└── useMovieCredits.ts
```
**Rules**:
- One hook per file
- Return `useQuery` result directly
- Set `staleTime` appropriately (5-10 min for static data)
- Use function overloads for conditional logic (avoid conditional hook calls)

### Mocks Organization

#### packages/shared/src/mocks/
**Purpose**: Centralized mocks for tests and Storybook
**Pattern**:
```
packages/shared/src/mocks/
├── data/
│   ├── movieDetailsData.ts      # Mock data objects
│   ├── tvSeriesDetailsData.ts
│   └── movieCreditsData.ts
├── handlers/
│   ├── movieDetailsHandlers.ts  # MSW handlers
│   ├── tvSeriesDetailsHandlers.ts
│   └── movieCreditsHandlers.ts
└── browser.ts                   # Browser mocks (ResizeObserver, etc.)
```
**Rules**:
- Mock data typed with TMDB types from `@vite-mf-monorepo/tmdb-client`
- Handlers export object with named variants (default, loading, error)
- Real TMDB data via curl for accurate paths/structure
- Reuse across tests and Storybook (DRY)

### File Naming Conventions

**Components**: PascalCase
- `MediaHero.tsx`, `Synopsis.tsx`, `Crew.tsx`

**Hooks**: camelCase with `use` prefix
- `useMovieDetails.ts`, `useMediaDetails.ts`

**Utils**: camelCase
- `getMediaTypeFromPath.ts`, `formatRuntime.ts`

**Types**: PascalCase with descriptive suffix
- `MovieDetailsResponse`, `TvSeriesCreditsResponse`

**CSS**: kebab-case or match component name
- `index.css`, `remote-input.css`, `MediaHero.css` (if needed)

**Tests**: Match source file with `.test.tsx` suffix
- `MediaHero.test.tsx`, `useMovieDetails.test.ts`

### Import Order (ESLint enforced)
1. **External packages** (react, react-router-dom, @tanstack/react-query)
2. **Internal packages** (@vite-mf-monorepo/*)
3. **Relative imports** (../utils, ./ComponentName)
4. **Type imports** (import type { FC } from 'react')

**Example**:
```typescript
import { useParams } from 'react-router-dom'

import { Container, Section } from '@vite-mf-monorepo/layouts'
import { getImageUrl } from '@vite-mf-monorepo/shared'
import { Skeleton, Talent, Typography } from '@vite-mf-monorepo/ui'

import { useMovieCredits } from '../../hooks/useMovieCredits'

import type { FC } from 'react'
```

## Tech Stack

### Architecture
- **Monorepo**: Lerna 8.2.2 + pnpm workspaces (pnpm 10.8.1)
- **Micro-frontends**: Module Federation with @module-federation/vite 1.11.0
- **Build**: Vite 6.2
- **Node**: >= 22.11.0

### Frontend
- **Framework**: React 19.1.0
- **Routing**: React Router 7.5.2
- **Data fetching**: TanStack Query 5.74.4
- **Styling**: Tailwind CSS 4.1.0 with @tailwindcss/vite plugin
- **TypeScript**: 5.7.2

### API Client
- **Generator**: heyAPI 0.71.0 (OpenAPI to TypeScript)
- **HTTP Client**: @hey-api/client-fetch 0.10.0
- **Integration**: TanStack Query hooks auto-generated

### Quality
- **Linting**: ESLint 9 (flat config) + Prettier 3.5.3
- **Tests**: Vitest 3.1.2 + React Testing Library 16.3.0 + jsdom 26.1.0
- **Git hooks**: Husky 9.1.7 + commitlint + lint-staged
- **Coverage**: @vitest/coverage-v8 3.1.2

### Module Federation
- **Runtime**: @module-federation/runtime 0.24.1
- **DTS Plugin**: @module-federation/dts-plugin 0.24.1
- **CSS injection**: vite-plugin-css-injected-by-js 3.5.2
- **Top-level await**: vite-plugin-top-level-await 1.5.0

### Production
- **Server**: Express 5.1.0 with CORS
- **External API**: TMDB API (key in .env.local)

## Project Structure

### Apps (Micro-frontends)
- `apps/host`: Host application (port 3000) that consumes remotes
- `apps/list`: Remote for movie list (port 3001, route `/`)
- `apps/detail`: Remote for movie detail (port 3002, route `/detail/:id`)

### Packages (Shared libraries)
- `packages/shared`: Shared utilities (healthCheck, retry), Vite plugins (notifyHostOnHmr, tailwindRemoteCss), Tailwind theme
- `packages/ui`: Design system components (Button, Card) with Tailwind v4 and `ui:` prefix
- `packages/http-client`: TMDB API client generated with heyAPI, exported as @vite-mf-monorepo/tmdb-client

### Ports (defined in .env)
- HOST_PORT=3000
- REMOTE_LIST_PORT=3001
- REMOTE_DETAIL_PORT=3002

## Code Conventions

### TypeScript
- Strict mode enabled
- No explicit `any` (ESLint error)
- No unused variables (ESLint error)
- strictTypeChecked + stylisticTypeChecked configuration

### React
- Functional components only
- Hooks are mandatory (react-hooks/rules-of-hooks: error)
- No `console.log` (only `console.warn` and `console.error`)
- React 19 without explicit React import (automatic JSX transform)

### Imports
- Alphabetical sorting with groups: builtin, external, internal, parent, sibling, index, object, type
- Newlines between groups
- Sort-imports enabled with ignoreDeclarationSort

### CSS / Tailwind
- Tailwind CSS v4 with CSS-first configuration (no tailwind.config.js)
- Shared theme in `packages/shared/src/tailwind/theme.css` with OKLCH colors
- Host: Full Tailwind with preflight
- Remotes: Use `tailwindRemoteCss` plugin to generate CSS without preflight (avoids duplication)
- Remotes import `remote.css` (generated) instead of `index.css` for exposed components
- packages/ui uses `ui:` prefix for style isolation
- Dynamic injection via vite-plugin-css-injected-by-js in remotes

### Commits
- Conventional commits format mandatory
- Allowed types: build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test
- Type in lowercase
- Subject without trailing period
- Max 100 characters for header

## Git Workflow

### Pre-commit Hook
Automatically runs before each commit:
1. `pnpm run type-check` - TypeScript validation
2. `pnpm run lint` - ESLint check
3. `pnpm run test` - Vitest tests

All checks must pass before the commit is allowed.

### Commit Message Hook
- Uses commitlint to validate commit message format
- Enforces conventional commits standard
- Validates type, scope, and subject format

### Commit Message Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Examples:**
- `feat(list): add pagination to movie grid`
- `fix(detail): resolve image loading issue`
- `chore(deps): update vite to 6.2.0`
- `docs(readme): update installation instructions`

**Rules:**
- Type must be one of: build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test
- Type must be lowercase
- Scope is optional but recommended (list, detail, host, shared)
- Subject must not end with a period
- Subject must be lowercase (no PascalCase, UPPER_CASE, or sentence-case)
- Header (type + scope + subject) must not exceed 100 characters
- Body and footer are optional

## Module Federation Architecture

### Bootstrap Pattern
- Entry point: `main.tsx` → `await import('./bootstrap')`
- Allows Module Federation initialization before application code

### Standalone Remotes
- Each remote can function autonomously
- Dual configuration: standalone routes + MF exposition
- Bootstrap creates its own router and QueryClient
- Different App wrapper in standalone vs consumed by host

### Type Hinting Generation (DTS)
- Built-in DTS in @module-federation/vite 1.11.0 with @module-federation/dts-plugin 0.24.1
- Remotes: `dts.generateTypes` generates types in `dist/.dev-server/@mf-types.zip`
- Host: `dts.consumeTypes` downloads and extracts types to `@mf-types/`
- Types resolved via tsconfig paths: `"*": ["./@mf-types/*"]`
- RouteComponent pattern to expose typed loaders
- `apps/host/@mf-types/` is gitignored (auto-generated)

### Health Checks
- `checkRemoteHealth` utility in packages/shared
- Retry with backoff (5 attempts, 1s delay)
- 5s timeout per attempt
- `/health` endpoint in each Express server

### Shared Dependencies
- react, react-dom, react-router-dom, @tanstack/react-query as singletons
- Strict versions defined in MF config

## Scripts

### Development
- `pnpm dev`: Launch all packages in parallel
- `pnpm dev:ordered`: Launch in order list → detail → host
- `pnpm [package]:dev`: Launch a specific package

### Project Reset
- `pnpm reset`: Clean install simulating a fresh clone
  - Removes: node_modules, dist, .__mf__temp, @mf-types
  - Reinstalls with `pnpm install --frozen-lockfile`
  - Use this to test onboarding experience for new developers

### Production
- `pnpm prod`: Build and launch in production mode with Express servers
- Each remote exposes an Express server with CORS and /health endpoint

### Quality
- `pnpm lint`: ESLint on entire project
- `pnpm lint:fix`: ESLint with auto-fix
- `pnpm type-check`: TypeScript check without emission
- `pnpm test`: Vitest tests
- `pnpm coverage`: Tests with coverage

## Tests

### Configuration
- Workspace mode on `packages/*`
- Globals enabled (no need to import describe, it, expect)
- Setup file: vitest.setup.ts with @testing-library/jest-dom
- Coverage on `packages/*/src/**/*`

### Structure
- Tests colocated with components
- Using React Testing Library
- Mocks in `src/mocks/`

## Forbidden

### Code
- ❌ No `console.log` (use console.warn or console.error)
- ❌ No explicit `any` in TypeScript
- ❌ No unused variables/parameters
- ❌ No unsorted imports
- ❌ No CSS Modules
- ❌ No CSS-in-JS
- ❌ No custom CSS when Tailwind utilities exist

### Commits
- ❌ No commits without conventional type
- ❌ No subject in PascalCase, UPPER_CASE, or sentence-case
- ❌ No trailing period in subject
- ❌ No header > 100 characters

### Architecture
- ❌ Never modify shared dependencies without synchronizing host and remotes
- ❌ Never delete index.css files (required for standalone mode)
- ❌ Never disable cssInjectedByJsPlugin in remotes
- ❌ Never manually edit generated files in packages/http-client/src/client/ (regenerate with `pnpm generate`)

## Best Practices

### Module Federation
- Always test in standalone AND integrated in host
- Verify types are generated in @mf-types/ in dev
- Ensure health checks work before starting host
- Expose loaders with RouteComponent pattern

### Tailwind CSS
- Use Tailwind utility classes, avoid custom CSS when possible
- Shared theme tokens defined in packages/shared/src/tailwind/theme.css
- Remotes: import `../remote.css` in exposed components (not index.css)
- packages/ui: use `ui:` prefix for all classes
- Use relativeCSSInjection: true in cssInjectedByJsPlugin

### Tests
- Add data-testid on tested elements
- Use React Testing Library queries (getByRole, getByTestId, etc.)
- Mock API calls in tests

### Performance
- Use lazy loading for remotes in host
- Configure staleTime and refetch in QueryClient
- Singleton for shared dependencies

## Known Issues

### Dev Mode
- Production and standalone modes work correctly
- DTS types are generated automatically on dev server start

## Common Issues & Solutions

### TypeScript Errors with Optional API Fields
**Problem**: TMDB API types use optional fields (`name?: string`, `job?: string`, `crew?: Array<...>`), causing TS errors when passing to components expecting required props.
**Solution**: Make UI component props optional and use fallbacks with `??` operator (`name ?? 'Unknown'`, `role ?? 'N/A'`).
**Applied to**: Talent component, future Cast components.

### ESLint Optional Chaining Warning
**Problem**: ESLint warns about `!credits || !credits.crew` being verbose (prefer-optional-chain).
**Solution**: Use optional chaining `!credits?.crew` (more concise and idiomatic).
**Example**: `if (error || !credits?.crew) { return null }`

### Tailwind Reserved Class Names
**Problem**: Using `container` as a class name conflicts with Tailwind's built-in `.container` utility, breaking layout.
**Solution**: Use custom class names (e.g., `media-section`) to avoid conflicts with Tailwind reserved utilities.
**Applied to**: Container component uses `media-section` class for CSS targeting.

### CSS Prefix Issues in Remote Consumption
**Problem**: Font paths break in remote.css when using full theme with `@font-face` rules (paths relative to wrong location).
**Solution**: Create `theme-no-fonts.css` variant for remote consumption (imports only colors/spacing/tokens, not fonts).
**Applied to**: `apps/media/src/remote-input.css` imports `theme-no-fonts.css` instead of full theme.

### Query Key Missing Dynamic Parameters
**Problem**: TanStack Query cache conflicts when query key doesn't include all dynamic parameters (e.g., `timeWindow` in useTrending).
**Symptom**: Data doesn't update when switching tabs, stale data from previous tab shown.
**Solution**: Always include all dynamic parameters in queryKey: `['trending', timeWindow]` not just `['trending']`.
**Rule**: Query key must uniquely identify the data being fetched.

### Conditional Hook Calls (React Rules Violation)
**Problem**: Cannot call hooks conditionally (`if (mediaType === 'movie') { useMovieDetails() }`).
**Solution**: Use function overloads pattern - select function reference then call:
```typescript
const query = mediaType === 'tv' ? useTVDetails : useMovieDetails
return query(contentId)
```
**Applied to**: useMediaDetails, future useMediaCredits.

### Import Extensions with NodeNext
**Problem**: TypeScript with `moduleResolution: "NodeNext"` requires `.js` extensions for relative imports.
**Solution**: Always add `.js` extension to relative imports: `import { foo } from './utils.js'`
**Note**: Write `.js` even though source file is `.ts` (TypeScript resolves correctly).

## Project Documentation

### Full Project History & Roadmap
For detailed project history, completed features, and roadmap, see:
- **`files/ROADMAP.md`** - Complete feature timeline, status, and next steps
- **`files/SCREEN_ANALYSIS.md`** - UI/UX reference for all pages (Home, Detail, Person) with component breakdown
- **`files/TROUBLESHOOTING.md`** - Complete bug history and solutions
- **`files/screenshots/`** - Reference screenshots from IMDB/TMDB for styling and layout inspiration
- **System memories** - Architectural decisions and reasoning (auto-retrieved when relevant)

### Screen Analysis Reference
`files/SCREEN_ANALYSIS.md` contains the analysis of IMDB and TMDB screens to define what we implement:
- **Home Page**: Trending section, carousels, search, hero banner
- **Detail Page**: MediaHero, Synopsis, Crew, Cast, Trailers, Photos, Recommendations
- **Person Page** (Phase 3): Biography, Known For, Filmography
- **Component Tiers**: Tier 1 (primitives), Tier 2 (composed), Tier 3 (domain-specific)
- **Design System**: Avatar, Badge, Carousel, Rating, Skeleton, Tabs, etc.
- **Implementation Priority**: Phase 1 (MVP), Phase 2 (Enhanced), Phase 3 (Extended)

**Note**: This is a reference guide, not a strict specification. We adapt based on technical constraints and user needs.

### Key Architectural Decisions & Patterns

#### Embedded Queries Pattern (Phase 4 - Media Detail)
- **Decision**: Each section component manages its own TanStack Query (no React Router loaders at page level)
- **Why**: Parallel loading, independent cache, isolated error handling, progressive UX
- **Applied to**: MediaHero, Synopsis, Crew sections
- **Example**: `useMovieDetails` called inside MediaHero, not passed as props

#### Function Overloads for Conditional Hooks
- **Pattern**: `useMediaDetails(mediaType, contentId)` with TypeScript function overloads
- **Why**: Avoid conditional hook calls (React rules violation), precise TypeScript type inference
- **Implementation**: Select function reference then call (not calling both hooks)
- **Applied to**: `useMediaDetails` (Movie/TV), future `useMediaCredits`

#### CSS Alternating Section Backgrounds
- **Pattern**: All `Container` components use `variant="default"`, CSS controls backgrounds via `.media-section:nth-of-type()`
- **Why**: Centralized styling at page level, easier design iteration, no hardcoded variants per section
- **Implementation**: Custom class `media-section` added to Container (avoids Tailwind reserved `container`)
- **Applied to**: Media page sections (Synopsis, Crew, Photos, Cast, etc.)

#### Optional Props for API-Driven Components
- **Pattern**: UI components accept optional props matching API reality (e.g., `name?: string`, `role?: string`)
- **Why**: TMDB API types use optional fields, prevents TypeScript errors, avoids defensive mapping everywhere
- **Fallbacks**: Use `??` operator with sensible defaults (`'Unknown'`, `'N/A'`)
- **Applied to**: Talent component, future Cast components

#### Avatar Size Extension
- **Pattern**: Add size variants as needed (`2xl` = 128px for crew photos)
- **Why**: Design requirements may exceed initial size range, extensible design system
- **Applied to**: Avatar component (xs/sm/md/lg/xl/2xl)

## Additional Development Patterns

### 1. Error Handling Pattern

**Component Error States**:
```typescript
const Component: FC = () => {
  const { data, isLoading, error } = useQuery(...)
  
  // Loading state
  if (isLoading) {
    return <Skeleton />
  }
  
  // Error state - show message or return null
  if (error || !data) {
    return (
      <Section>
        <Typography variant="body" className="text-muted-foreground">
          Unable to load information.
        </Typography>
      </Section>
    )
  }
  
  // Empty state - return null if no useful data
  if (!data.items || data.items.length === 0) {
    return null
  }
  
  // Success state
  return <div>{/* render data */}</div>
}
```

**Rules**:
- Always handle loading, error, and empty states explicitly
- Use `Skeleton` for loading (match final content dimensions)
- Show error message for user-facing errors
- Return `null` for sections with no data (hide section entirely)
- Never leave unhandled error states

### 2. Storybook Patterns

**Story Structure**:
```typescript
import type { Meta, StoryObj } from '@storybook/react'
import { withQueryClient, withRouter } from '../decorators'
import { ComponentName } from '@vite-mf-monorepo/package'
import { componentHandlers } from '@vite-mf-monorepo/shared/mocks'

const meta: Meta<typeof ComponentName> = {
  title: 'Group/ComponentName',
  component: ComponentName,
  decorators: [withQueryClient, withRouter('/route/:id')],
  parameters: {
    msw: { handlers: [componentHandlers.default] },
  },
}

export default meta
type Story = StoryObj<typeof ComponentName>

export const Default: Story = {}

export const Loading: Story = {
  parameters: {
    msw: { handlers: [componentHandlers.loading] },
  },
}

export const Error: Story = {
  parameters: {
    msw: { handlers: [componentHandlers.error] },
  },
}
```

**Rules**:
- Always create Default, Loading, and Error stories minimum
- Use MSW handlers from shared mocks (DRY)
- Apply decorators in correct order: withQueryClient first, withRouter second
- withRouter accepts route parameter for components using useParams

### 3. Testing Patterns

**Test Structure (Arrange-Act-Assert)**:
```typescript
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { vi } from 'vitest'

describe('ComponentName', () => {
  it('should render correctly', async () => {
    // Arrange - setup mocks and data
    const user = userEvent.setup()
    const mockFn = vi.fn()
    
    // Act - render and interact
    render(<ComponentName onClick={mockFn} />)
    const button = screen.getByRole('button', { name: /click me/i })
    await user.click(button)
    
    // Assert - verify behavior
    expect(mockFn).toHaveBeenCalledOnce()
    expect(screen.getByText('Success')).toBeInTheDocument()
  })
})
```

**Rules**:
- **ALWAYS use `userEvent`** (never `fireEvent`) for user interactions
- Use `await` with all userEvent methods (`await user.click()`, `await user.keyboard()`)
- Mock hooks at module level with `vi.mock()`
- Use shared mocks from `@vite-mf-monorepo/shared/mocks`
- Query by role when possible (`getByRole`), fallback to `getByTestId`
- One assertion per test (or closely related assertions)

**Mocking Patterns**:
```typescript
// Mock react-router-dom
vi.mock('react-router-dom', () => ({
  useParams: vi.fn(),
  useLocation: vi.fn(),
}))

// Mock custom hooks
vi.mock('../../hooks/useMovieDetails', () => ({
  useMovieDetails: vi.fn(),
}))

// In test
beforeEach(() => {
  vi.mocked(useParams).mockReturnValue({ id: '278' })
  vi.mocked(useMovieDetails).mockReturnValue({
    data: mockMovieDetails,
    isLoading: false,
    error: null,
  })
})
```

### 4. Type Guards & Utilities

**Type Guard Pattern**:
```typescript
// Type guard for discriminated unions
export function isMovie(
  data: MovieDetailsResponse | TvSeriesDetailsResponse
): data is MovieDetailsResponse {
  return 'title' in data && 'runtime' in data
}

// Usage
if (isMovie(data)) {
  // TypeScript knows data is MovieDetailsResponse
  console.log(data.title, data.runtime)
} else {
  // TypeScript knows data is TvSeriesDetailsResponse
  console.log(data.name, data.number_of_seasons)
}
```

**Utility Organization**:
- **Location**: `apps/[app]/src/utils/` for app-specific, `packages/shared/src/utils/` for reusable
- **One utility per file**: `formatRuntime.ts`, `getMediaTypeFromPath.ts`
- **Export as named export**: `export function formatRuntime(minutes: number): string`
- **Add JSDoc comments** for complex utilities

**When to create a utility**:
- Logic used in 2+ places → extract to utility
- Complex transformation → extract for testability
- Domain-specific logic → keep in app utils
- Generic logic → move to shared utils

### 5. CSS Custom Utilities

**When to create custom utilities**:
- Repeated CSS patterns (text-shadow, aspect-ratio overrides)
- Design system tokens not in Tailwind
- App-specific responsive patterns

**Pattern**:
```css
/* apps/media/src/remote-input.css or index.css */
@layer utilities {
  .mda\:text-shadow-strong {
    text-shadow: 0 0 10px rgb(0 0 0 / 0.75);
  }
  
  .mda\:hero-height {
    aspect-ratio: 21/9;
  }
  
  @media (min-width: 1024px) {
    .mda\:hero-height {
      aspect-ratio: auto;
      max-height: 440px;
    }
  }
}
```

**Rules**:
- Always use `@layer utilities` for custom utilities
- Use app prefix (`mda:`, `hm:`) to avoid conflicts
- Escape colons in class names with backslash (`\:`)
- Place in `remote-input.css` for host consumption, `index.css` for standalone

### 6. Compound Components Pattern

**When to use**:
- Component has multiple related sub-components (Carousel, Tabs, Accordion)
- Sub-components need to share state
- Want flexible composition API

**Pattern**:
```typescript
// Context for shared state
const CarouselContext = createContext<CarouselContextValue | null>(null)

// Parent component
export const Carousel: FC<CarouselProps> & {
  Item: typeof CarouselItem
  Navigation: typeof CarouselNavigation
  Pagination: typeof CarouselPagination
} = ({ children, ...props }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  
  return (
    <CarouselContext.Provider value={{ activeIndex, setActiveIndex }}>
      <div className="carousel">{children}</div>
    </CarouselContext.Provider>
  )
}

// Sub-components
const CarouselItem: FC = ({ children }) => {
  const context = useContext(CarouselContext)
  if (!context) throw new Error('CarouselItem must be used within Carousel')
  return <div>{children}</div>
}

// Attach sub-components
Carousel.Item = CarouselItem
Carousel.Navigation = CarouselNavigation
Carousel.Pagination = CarouselPagination

// Usage
<Carousel>
  <Carousel.Item>Content 1</Carousel.Item>
  <Carousel.Item>Content 2</Carousel.Item>
  <Carousel.Navigation />
  <Carousel.Pagination />
</Carousel>
```

**Rules**:
- Use Context API for shared state between parent and children
- Throw error if sub-component used outside parent
- Export sub-components as properties of parent
- Document composition API in Storybook

### 7. Data Transformation Pattern

**Where to transform API data**:
```typescript
// ✅ Transform in component that consumes the data
const MovieCarousel: FC = () => {
  const { data } = usePopularMovies()
  
  return (
    <Carousel>
      {data.results?.map((item) => {
        // Transform here - explicit and readable
        const posterUrl = item.poster_path
          ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
          : ''
        const year = item.release_date
          ? new Date(item.release_date).getFullYear()
          : null
        
        return (
          <MovieCard
            key={item.id}
            id={item.id ?? 0}
            title={item.title ?? 'Unknown'}
            posterUrl={posterUrl}
            year={year}
          />
        )
      })}
    </Carousel>
  )
}

// ❌ Don't create wrapper components just for mapping
const TMDBMovieCard = ({ tmdbData }) => {
  return <MovieCard {...transformTMDBData(tmdbData)} />
}
```

**Rules**:
- Transform data in the component that renders it (not in hooks)
- Use `??` operator for fallbacks (`item.title ?? 'Unknown'`)
- Keep transformations explicit and readable (no complex utility functions unless reused 3+ times)
- For image URLs, construct full URL with size parameter (`w500`, `w185`, etc.)

**TMDB Image Sizes**:
- Posters: `w92`, `w154`, `w185`, `w342`, `w500`, `w780`, `original`
- Backdrops: `w300`, `w780`, `w1280`, `original`
- Profiles: `w45`, `w185`, `h632`, `original`

### 8. Loading States Pattern

**Skeleton Composition**:
```typescript
// ✅ Compose skeletons inline to match final layout
if (isLoading) {
  return (
    <Section>
      <Typography variant="h2" className="mb-6">Title</Typography>
      <div className="flex gap-6">
        <Skeleton variant="circle" width="128px" height="128px" />
        <Skeleton variant="circle" width="128px" height="128px" />
        <Skeleton variant="circle" width="128px" height="128px" />
      </div>
    </Section>
  )
}

// ❌ Don't create separate skeleton components unless complex and reused
const CrewSkeleton = () => { /* ... */ }
```

**Anti-Layout-Shift Strategies**:
- Skeleton dimensions match final content (same height, aspect-ratio)
- Titles and section headers always visible (not conditional on data)
- Use fixed heights or aspect-ratios for images
- Test with network throttling (Slow 3G in DevTools)

**Rules**:
- Loading skeleton should have same dimensions as loaded content
- Use `Skeleton` component from `@vite-mf-monorepo/ui`
- Compose inline unless skeleton is complex and reused 3+ times
- Always show section title during loading (not conditional)

### 9. Responsive Design Pattern

**Mobile-First Approach**:
```typescript
// Base styles = mobile, add breakpoints for larger screens
<div className="
  flex flex-col gap-4 p-4
  sm:flex-row sm:gap-6 sm:p-6
  md:gap-8 md:p-8
  lg:gap-10 lg:p-10
">
```

**Tailwind Breakpoints**:
- `sm`: 640px (small tablets)
- `md`: 768px (tablets)
- `lg`: 1024px (laptops)
- `xl`: 1280px (desktops)
- `2xl`: 1536px (large desktops)

**Responsive Typography**:
```typescript
// Use responsive variants in Typography component
<Typography 
  variant="h1" 
  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
>
```

**Rules**:
- Start with mobile styles (no prefix)
- Add breakpoint prefixes for larger screens (`sm:`, `md:`, `lg:`)
- Test on multiple screen sizes (DevTools responsive mode)
- Use Section component for consistent max-width and padding

### 10. Performance Patterns

**React.memo Usage**:
```typescript
// ✅ Use memo for expensive pure components rendered in lists
export const MovieCard = memo<MovieCardProps>(({ title, posterUrl }) => {
  return <Card>{/* ... */}</Card>
})

// ❌ Don't memo everything - adds overhead
const SimpleButton = memo(({ onClick }) => <button onClick={onClick}>Click</button>)
```

**useMemo / useCallback Guidelines**:
```typescript
// ✅ Use useMemo for expensive calculations
const sortedItems = useMemo(
  () => items.sort((a, b) => b.rating - a.rating),
  [items]
)

// ✅ Use useCallback for callbacks passed to memoized children
const handleClick = useCallback(() => {
  console.log('clicked')
}, [])

// ❌ Don't use for simple operations
const doubled = useMemo(() => count * 2, [count]) // Overkill
```

**Lazy Loading**:
```typescript
// ✅ Lazy load routes in Module Federation
{
  path: '/movie/:id',
  async lazy() {
    const { default: Movie } = await import('media/Movie')
    return { Component: Movie }
  },
}

// ✅ Lazy load heavy components
const HeavyChart = lazy(() => import('./HeavyChart'))
```

**Rules**:
- Use `React.memo` only for components in lists or with expensive renders
- Use `useMemo` only for expensive calculations (not simple operations)
- Use `useCallback` only for callbacks passed to memoized children
- Lazy load routes and heavy components (charts, editors, etc.)
- Profile before optimizing (React DevTools Profiler)

## Future Enhancements

- E2E tests with Playwright or Vitest browser mode
- People package for talent details
- More Tier 1 primitives in packages/ui (Image, Rating, Badge, Carousel, Input, IconButton, Skeleton)
- Storybook for component documentation
- Style Dictionary for design token management
- Dark mode support
- More tests for error cases
- Test utils in shared package
