# vite-mf-monorepo - Quick Rules

## 🚨 CRITICAL WORKFLOW RULES

### Before ANY code modification:
1. **Discuss approach first** - NEVER code without asking
2. **Explain step by step** what will be modified and why
3. **Ask for explicit confirmation** before proceeding
4. **Wait for validation** from user

### Mandatory Commit Workflow:
- ✅ Review → ✅ Test → ✅ Commit (for EACH change)
- One feature per commit (atomic commits)
- Run lint/typecheck/test before commit
- Conventional commit messages required

## 🏗️ Architecture

### Monorepo Structure
- **Host**: `apps/host` (port 3000) - Consumes remotes
- **Home**: `apps/home` (port 3001) - Home page remote
- **Media**: `apps/media` (port 3002) - Movie/TV detail remote
- **Packages**: `packages/ui`, `packages/layouts`, `packages/shared`, `packages/tmdb-client`

### Module Federation
- Micro-frontends with @module-federation/vite
- Standalone remotes (can run independently)
- Shared dependencies: react, react-router-dom, @tanstack/react-query

## 📦 Component Organization

### packages/ui (Design System - Tier 1)
- **Purpose**: Atomic, reusable UI components
- **Prefix**: `ui:` for all Tailwind classes
- **Examples**: Button, Card, Avatar, Badge, Rating, Carousel, Tabs, Skeleton, Typography
- **Rules**: No domain logic, extend HTML attributes, export interface + default component

### packages/layouts (Layout Components)
- **Purpose**: Page structure (Container, Section, Header, Footer, RootLayout)
- **Prefix**: `layout:` for Tailwind classes
- **Rules**: Focus on structure/spacing, no domain logic

### apps/[app]/src/components/ (Domain Components)
- **Purpose**: App-specific components with business logic
- **Prefix**: `mda:` (media app), `hm:` (home app)
- **Pattern**: Embedded queries (useQuery inside component, no props for data)
- **Rules**: Handle loading/error/empty states

## 🎣 Hooks Pattern

### TanStack Query Hooks
- **Location**: `apps/[app]/src/hooks/`
- **Pattern**: One hook per file, return `useQuery` result directly
- **Naming**: `useMovieDetails.ts`, `useTVDetails.ts`, `useMediaDetails.ts`
- **Rules**: Set `staleTime` (5-10 min), use function overloads for conditional logic

### Function Overloads for Conditional Hooks
```typescript
// ✅ CORRECT - Select function then call
const query = mediaType === 'tv' ? useTVDetails : useMovieDetails
return query(contentId)

// ❌ WRONG - Conditional hook calls
if (mediaType === 'tv') { return useTVDetails(id) }
```

## 🧪 Testing Rules

- **Always use userEvent** (never fireEvent)
- **Reuse shared mocks** from `@vite-mf-monorepo/shared/mocks`
- **Test loading/error/empty states** for all data-fetching components
- **Mock at module level** with `vi.mock()`

## 🎨 CSS & Styling

### Tailwind CSS v4
- **Configuration**: CSS-first (no tailwind.config.js)
- **Theme**: `packages/shared/src/tailwind/theme.css` (OKLCH colors)
- **Prefixes**: `ui:` (packages/ui), `layout:` (packages/layouts), `mda:` (media), `hm:` (home)

### CSS Rules
- Use Tailwind utilities, avoid custom CSS when possible
- No CSS Modules, no CSS-in-JS
- Remotes: import `remote.css` (not `index.css`) for exposed components
- Avoid Tailwind reserved class names (use `media-section` not `container`)

## 📝 Code Conventions

### TypeScript
- Strict mode enabled
- No explicit `any` (ESLint error)
- No unused variables
- Use `ComponentProps<'element'>` for props (not `HTMLAttributes`)

### React
- Functional components only
- No `console.log` (only `console.warn`/`console.error`)
- React 19 (no explicit React import needed)

### Imports (ESLint enforced)
1. External packages (react, react-router-dom, @tanstack/react-query)
2. Internal packages (@vite-mf-monorepo/*)
3. Relative imports (../utils, ./ComponentName)
4. Type imports (import type { FC } from 'react')

### File Extensions
- `.tsx` for files with JSX (including tests with React components)
- `.ts` for pure TypeScript (no JSX)

## 🔑 Key Patterns

### Embedded Queries Pattern
- Each section component manages its own TanStack Query
- No React Router loaders at page level
- Parallel loading, independent cache, isolated error handling

### Optional Props for API-Driven Components
- UI components accept optional props matching API reality (`name?: string`)
- Use `??` operator with fallbacks (`name ?? 'Unknown'`)
- Prevents TypeScript errors with TMDB API optional fields

### CSS Alternating Section Backgrounds
- All `Container` use `variant="default"`
- CSS controls backgrounds via `.media-section:nth-of-type()`
- Centralized styling at page level

## 🚫 Forbidden

- ❌ No `console.log`
- ❌ No explicit `any`
- ❌ No unused variables
- ❌ No custom CSS when Tailwind exists
- ❌ No commits without conventional type
- ❌ No coding without confirmation

## 📚 Documentation Reference

- **Full rules**: `.windsurfrules`
- **Roadmap**: `files/ROADMAP.md`
- **Screen analysis**: `files/SCREEN_ANALYSIS.md`
- **Troubleshooting**: `files/TROUBLESHOOTING.md`

## 🎯 Current Session (27 Février 2026)

**Status**:
- ✅ Phase 4.5 Synopsis - Completed
- ✅ Phase 4.7 Crew - Completed
- ✅ Avatar 2xl size added
- ✅ Alternating section backgrounds via CSS

**Next Priority**:
- 🎯 Phase 4.8 Top 10 Cast Section

**Known Issues**:
- ⚠️ TrendingSection carousel bug (query key issue)
- ⚠️ Font loading in remotes (use `theme-no-fonts.css`)
