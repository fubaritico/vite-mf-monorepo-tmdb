Create a new embedded-query section component in an app following the project patterns.

Reference the component patterns: @.claude/rules/component-patterns.md

## Arguments
`$ARGUMENTS` = `[AppName] [SectionName]`
Example: `/new-section media Cast` or `/new-section home FeaturedSection`

## CSS prefix per app
- `apps/media` → `mda:` prefix
- `apps/home` → `hm:` prefix
- New apps → define prefix first, follow same convention

## Steps

1. Read an existing section in the target app as reference (e.g. `apps/media/src/components/Crew/Crew.tsx`)
2. Create `apps/[app]/src/components/[Name]/[Name].tsx`:
   - `useParams` to get id
   - `useQuery` hook internally (no data props)
   - Handle loading (Skeleton), error (Typography message), empty (return null), success states
   - Use `Section` from `@vite-mf-monorepo/layouts`
   - Use correct CSS prefix for the app
3. Create `apps/[app]/src/components/[Name]/[Name].test.tsx` (if tests requested)
4. Create `apps/[app]/src/components/[Name]/index.ts`
5. Add export to `apps/[app]/src/index.ts`
6. Add component to the app's composition file (e.g. `Media.tsx`, `Home.tsx`)
7. Run `/story [Name]` to create the Storybook story

## Rules
- Correct CSS prefix for the target app
- Embedded queries only (no data props passed from parent)
- Section title always visible (not conditional on data)
- Return null for empty state (hide section entirely)
- Always follow with a story (step 7)
