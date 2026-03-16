# Troubleshooting & Architectural Decisions

## Common Issues & Solutions

### Font paths broken in remotes
**Problem**: `@font-face` paths in `theme.css` are relative to wrong location in remotes.
**Solution**: `remote-input.css` imports `theme-no-fonts.css` instead of full theme.
**Applied to**: apps/media/src/remote-input.css, apps/home/src/remote-input.css

### Tailwind reserved class names
**Problem**: Using `container` conflicts with Tailwind's built-in `.container` utility.
**Solution**: Use custom names — `media-section` instead of `container`.
**Applied to**: Container component uses `media-section` for CSS nth-of-type targeting.

### Query key missing dynamic parameters
**Problem**: TanStack Query cache conflicts when queryKey omits dynamic params.
**Symptom**: Stale data shown when switching tabs, images missing on 2nd tab click.
**Solution**: Include ALL dynamic params in queryKey: `['trending', timeWindow]` not `['trending']`.
**Rule**: queryKey must uniquely identify the data.

### TypeScript errors with optional TMDB API fields
**Problem**: TMDB types use optional fields (`name?: string`), causes TS errors on required props.
**Solution**: Make UI component props optional, use `??` fallbacks (`name ?? 'Unknown'`).
**Applied to**: Talent component, Cast components.

### ESLint optional chaining warning
**Problem**: `!credits || !credits.crew` → ESLint warns (prefer-optional-chain).
**Solution**: `!credits?.crew` (more concise).

### Conditional hook calls (React rules violation)
**Problem**: Cannot call hooks conditionally.
**Solution**: Function overloads pattern:
```typescript
const query = mediaType === 'tv' ? useTVDetails : useMovieDetails
return query(contentId)
```
**Applied to**: useMediaDetails hook.

### Netlify CLI "multiple projects detected" in pnpm monorepo
**Problem**: `netlify deploy` scans the entire repo, finds all `package.json` files, and errors with "We've detected multiple projects inside your repository".
**Symptom**: Error even with `--site` and `--filter` flags set.
**Root cause**: `--filter home` does not match `@vite-mf-monorepo/home` (full package name required). And even with the correct name, detection runs before the filter applies.
**Solution**: Use `--cwd apps/<app>` to scope the CLI to a single `package.json`. Keep `--dir` as the full path from the repo root.
```bash
netlify deploy --prod --dir=apps/home/dist --site=$SITE_ID --no-build --cwd apps/home
```
**Rule**: `--cwd` = directory with the single `package.json`. `--dir` = full path to built assets from repo root.
**Applied to**: All 5 deploy workflows (deploy-home, deploy-host, deploy-media, deploy-photos, deploy-storybook).

### Sentry tracePropagationTargets CORS issue with third-party APIs
**Problem**: Setting `tracePropagationTargets` to a third-party API (e.g. TMDB) causes Sentry to inject `sentry-trace` and `baggage` headers. Third-party CORS policies block these → all API calls fail.
**Symptom**: TMDB returns `{"status_code":7,"status_message":"Invalid API key"}` — looks like auth but is actually CORS.
**Solution**: `tracePropagationTargets: []` — disables header injection on all outgoing requests.
**Rule**: Never target third-party APIs. Only use for services you control CORS headers of.
**Applied to**: all 4 instrument.ts files.

### TypeScript with NodeNext module resolution
**Problem**: Requires `.js` extensions for relative imports.
**Solution**: `import { foo } from './utils.js'` (write .js even though source is .ts).

---

## Key Architectural Decisions

### Embedded Queries (Phase 4)
Each section fetches its own data via useQuery — no React Router loaders at page level.
- **Why**: parallel loading, independent cache, isolated error handling, progressive UX
- **Applied to**: MediaHero, Synopsis, Crew, Cast

### CSS Alternating Section Backgrounds
All `Container` components use `variant="default"`. CSS controls backgrounds:
```css
.media-section:nth-of-type(odd) { background: white; }
.media-section:nth-of-type(even) { background: var(--muted); }
```
- **Why**: centralized styling, no hardcoded per-section variants
- **Applied to**: apps/media/src/index.css + remote-input.css

### Avatar Size Extension
Add size variants as needed. Current sizes: xs(24) sm(32) md(40) lg(48) xl(64) 2xl(96) 3xl(128).
- 2xl (96px) — actors / cast members
- 3xl (128px) — crew photos (Director)

### Optional Props for API-Driven Components
UI components accept optional props matching TMDB API reality.
Use `??` operator with sensible defaults.
- **Applied to**: Talent, Cast components

### Mock Data
Always use real TMDB data via curl for accurate structure:
```bash
curl "https://api.themoviedb.org/3/movie/278/credits" -H "Authorization: Bearer $TOKEN"
```
Mock data in `packages/shared/src/mocks/data/` typed with TMDB types.

### Storybook withRouter Decorator
Curried function accepting route parameter:
```typescript
decorators: [withRouter('/movie/278')]
```
Always add to stories using useParams. withQueryClient is in global decorators.
