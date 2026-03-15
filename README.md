## 🚀 Live Demo

**[https://vite-mf-tmdb.netlify.app](https://vite-mf-tmdb.netlify.app)**

Browse movies, explore detail pages, cast, crew and photos — powered by a micro-frontend architecture deployed on Netlify.

**[https://vite-mf-tmdb-storybook.netlify.app](https://vite-mf-tmdb-storybook.netlify.app)** — Design system Storybook

---

## Monorepo Micro Front End \w React, Vite, @module-federation/vite Lerna & Pnpm

This project is a grid of movies that uses micro frontends architecture. A detail page is accessed by clicking on a movie card. It is built using React, Vite, Lerna, and Pnpm. The project is structured as a monorepo, which allows for easy management of multiple packages and applications.
The micro frontends are loaded dynamically in the host application, allowing for a modular and scalable architecture. The project is designed to be easy to understand and extend, making it a great starting point for anyone looking to learn about micro frontends.

The project is designed to be easy to understand and extend, making it a great starting point for anyone looking to setup a micro frontends project.

This is a test to check if it was possible to create a project from a previous one used as an inspiration to produce good model context, using the same tech stack.

All techs and deps used in this project are the latest versions available at the time of writing this README. Some update maintenance for dependencies will be done in time.

I use IntelliJ for this project with claude sonnet 4.6 plugin, getting some cursor flavor while coding.

It's a work in progress, so many future enhancements are planned.

## Project Purpose

This project demonstrates a **real-world micro-frontend architecture** designed for **multi-team collaboration** on a single application. It showcases how different teams can work independently on distinct features while maintaining a cohesive user experience.

### Team Organization

The architecture is structured to support multiple autonomous teams:

- **Home & Media Team**: Manages the home page and movie/tv series detail pages (`apps/home`, `apps/media`)
- **User & Wishlist Team**: Handles user accounts and wishlist features (planned)
- **Talent Team**: Develops person/talent detail pages (planned, `apps/talent`)

Each team owns their remote application, with full autonomy over their codebase, deployment, and release cycle.

### Developer Experience

The project setup is designed for **simplicity and efficiency**:

```bash
# Requires to have pnpm installed and node >=22.11.0
# First, get an API key from tmdb by creating an account, it's free 
# Create a .env.local from .env.local.example file in the root of the project and add your API key

pnpm setup  # Install dependencies and build packages
pnpm dev  # Start development
```

Two commands to get started. No complex configuration, no manual setup steps. The monorepo structure with shared packages (design system, tokens, API client) ensures consistency while preserving team independence.

### Architecture Benefits

- **Independent deployment**: Each remote can be deployed separately
- **Team autonomy**: Teams work on isolated codebases with minimal coordination
- **Shared foundation**: Common design system, tokens, and utilities ensure consistency
- **Type safety**: TypeScript types are generated and shared between remotes and host
- **Scalability**: New teams and features can be added without disrupting existing work

### Technologies Used
- React
- Vite
- Typescript
- @module-federation/vite
- Lerna
- eslint
- prettier
- commitlint
- Pnpm
- React Router
- React Query
- Tailwind CSS v4 (shared theme across remote/host)
- Style Dictionary (design tokens)
- React Testing Library
- Vitest
- Storybook

### Getting Started

1. Clone the repository
2. Subscribe to TMDB API and get your API key
3. Create a `.env.local` file in the root of the project and add your API key
   ```bash
   VITE_TMDB_API_TOKEN=your_bearer_token
   ```
4. Install dependencies
   ```bash
   pnpm setup
   ```
5. Start the development server
   ```bash
   pnpm dev
   ```
6. Open your browser and navigate to `http://localhost:3000`

### Reset Scenario

If you need to reset the project (clean install, clear caches):

```bash
# Full reset: removes node_modules, dist folders, and reinstalls
pnpm reset

# Then start dev
pnpm dev
```

### Useful Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all apps with watch mode for packages |
| `pnpm reset` | Full reset: clean + install |
| `pnpm build:packages` | Rebuild shared packages (use if you modify ui, layouts, or shared) |
| `pnpm storybook` | Start Storybook |
| `pnpm kill-ports` | Kill processes on ports 3000, 3001, 3002, 6006 |
| `pnpm test` | Run tests |
| `pnpm lint` | Run ESLint |
| `pnpm type-check` | Run TypeScript type checking |

### Production Build Commands

The project separates **build-only** commands from **build + server** commands for different deployment scenarios:

#### Root Commands

| Command | Context | Behavior                                                              |
|---------|---------|-----------------------------------------------------------------------|
| `pnpm prod` | CI/GitHub Actions/Netlify | Builds all apps (host, home, media, photos) — **no servers started**  |
| `pnpm prod:server` | Local development | Builds all apps **and** starts servers on ports 3000-3003 in parallel |

#### When to Use Each

**CI/GitHub Actions:**
```bash
pnpm prod          # Just build, job terminates quickly
```

**Netlify (remotes):**
Each remote uses a custom build script that only builds:
```bash
pnpm install && pnpm build:packages && cd apps/home && pnpm build
# (Netlify serves the dist/ files, no servers needed)
```

**Local Development** (test servers locally):
```bash
pnpm prod:server          # Build all + start all servers (parallel)
pnpm prod:server:ordered  # Build all + start all servers (sequential)
```

Then open: **http://localhost:3000** (host application)

*Note: Remotes (home, media, photos) run on separate ports but are consumed by the host. You typically only access the host.*

### Continuous Integration & Deployment

#### On push or pull_request to `main` / `develop`

The **CI** workflow runs — 3 sequential phases:

**Phase 1 — Validate** (3 parallel jobs, no dependency between them):
- **Lint** — ESLint across the entire monorepo
- **Type Check** — TypeScript `--noEmit` verification
- **Test** — Vitest with 80% line coverage threshold; uploads coverage as a workflow artifact

Once all 3 pass, a **Build** job runs: `pnpm prod` (all apps) and uploads dist artifacts (retained 1 day).

**Phase 2 — SonarQube** (after Validate):
- Downloads the coverage artifact produced by Phase 1
- Runs SonarQube scan against SonarCloud

**Phase 3 — Quality Gate** (after Validate + SonarQube, always runs):
- Checks both phases completed as `success`
- ❌ If either failed → exits 1, GitHub marks the commit/PR as failed and blocks merge

#### On push to `main` (after CI succeeds)

Five **deploy workflows** run in parallel, each triggered by `workflow_run: ["CI"]` completing with `conclusion == 'success'`.

Each workflow follows the same sequence:

1. Checkout the exact SHA that triggered CI (full git history, `fetch-depth: 0`)
2. Fetch the parent commit SHA via the GitHub API
3. Run `paths-filter` comparing changed files between parent SHA and head SHA
4. Compute a single boolean output (`changed.result`) from the filter outputs
5. **If `false`** → all remaining steps are skipped (no install, no build, no deploy)
6. **If `true`** → `pnpm install` + `pnpm build:packages` → `pnpm prod` → `netlify deploy --prod`

**Deploy conditions per workflow:**

| Workflow | Triggers deploy when |
|---|---|
| `deploy-home` | `apps/home/**` or `packages/**` changed |
| `deploy-host` | `apps/host/**` or `packages/**` changed |
| `deploy-media` | `apps/media/**` or `packages/**` changed |
| `deploy-photos` | `apps/photos/**` or `packages/**` changed |
| `deploy-storybook` | `packages/storybook/**`, `packages/ui/**`, or `packages/layouts/**` changed |

#### GitHub Actions Secrets

All secrets are configured in **GitHub → Settings → Secrets and variables → Actions**.

> **Important — build-time embedding**: The `VITE_*` variables are not runtime environment variables. Vite replaces them with their literal values inside the JavaScript bundle during `pnpm prod`. If a secret is missing or empty when the build runs, the wrong value is permanently baked into the deployed bundle.

##### Netlify

| Secret | Used by workflow | Description |
|---|---|---|
| `NETLIFY_AUTH_TOKEN` | all deploy workflows | Netlify personal access token. Authenticates `netlify-cli` to push builds to any site. |
| `NETLIFY_SITE_ID_HOME` | `deploy-home` | Unique ID of the `vite-mf-tmdb-home` Netlify site. Passed to `netlify deploy --site`. |
| `NETLIFY_SITE_ID_HOST` | `deploy-host` | Unique ID of the `vite-mf-tmdb` Netlify site (host app). |
| `NETLIFY_SITE_ID_MEDIA` | `deploy-media` | Unique ID of the `vite-mf-tmdb-media` Netlify site. |
| `NETLIFY_SITE_ID_PHOTOS` | `deploy-photos` | Unique ID of the `vite-mf-tmdb-photos` Netlify site. |
| `NETLIFY_SITE_ID_STORYBOOK` | `deploy-storybook` | Unique ID of the `vite-mf-tmdb-storybook` Netlify site. |

##### Application — build-time variables

| Secret | Used by workflow | Description |
|---|---|---|
| `VITE_TMDB_API_TOKEN` | `deploy-home`, `deploy-media`, `deploy-photos`, `deploy-host` | TMDB bearer token. Embedded at build time into every remote bundle via `import.meta.env.VITE_TMDB_API_TOKEN`. Without it, all API calls return HTTP 401 "Invalid API key". |
| `VITE_HOME_URL` | `deploy-host` | Production URL of the home remote (`https://vite-mf-tmdb-home.netlify.app`). Baked into the host bundle at build time — used both to configure the Module Federation runtime and as a `<link rel="preload">` in `index.html`. If empty, the host loads its own `remoteEntry.js` instead of the home remote. |
| `VITE_MEDIA_URL` | `deploy-host` | Production URL of the media remote (`https://vite-mf-tmdb-media.netlify.app`). Same role as `VITE_HOME_URL` for the media micro-frontend. |
| `VITE_PHOTOS_URL` | `deploy-host` | Production URL of the photos remote (`https://vite-mf-tmdb-photos.netlify.app`). Same role as `VITE_HOME_URL` for the photos micro-frontend. |

##### Legacy — Netlify build hooks (no longer used)

These secrets were used when Netlify built the apps itself via its GitHub integration. Each hook is a unique URL that, when called, triggers a Netlify build including the environment variables configured in the Netlify UI.

Since the migration to `netlify-cli` with `--no-build`, the build now runs entirely in GitHub Actions and Netlify only receives the pre-built `dist/` folder. These hooks are no longer called and the `VITE_*` variables that were previously set in the Netlify UI must now be declared as GitHub Actions secrets (see section above).

| Secret | Description |
|---|---|
| `NETLIFY_BUILD_HOOK_HOME` | Netlify build hook URL for the home app — replaced by `deploy-home.yml` |
| `NETLIFY_BUILD_HOOK_HOST` | Netlify build hook URL for the host app — replaced by `deploy-host.yml` |
| `NETLIFY_BUILD_HOOK_MEDIA` | Netlify build hook URL for the media app — replaced by `deploy-media.yml` |
| `NETLIFY_BUILD_HOOK_PHOTOS` | Netlify build hook URL for the photos app — replaced by `deploy-photos.yml` |
| `NETLIFY_BUILD_HOOK_STORYBOOK` | Netlify build hook URL for Storybook — replaced by `deploy-storybook.yml` |

##### SonarQube

| Secret | Used by workflow | Description |
|---|---|---|
| `SONAR_TOKEN` | `sonarqube` | SonarCloud authentication token. |
| `SONAR_HOST_URL` | `sonarqube` | SonarCloud server URL (e.g. `https://sonarcloud.io`). |
| `SONAR_PROJECT_KEY` | `sonarqube` | Unique key identifying the project in SonarCloud. |

#### Manual

- **sonar-init** (`workflow_dispatch`) — initializes the SonarCloud project from `main`; run once on project setup

### Performance & Quality Metrics

Lighthouse scores (measured on deployed app):
- **Performance**: 80+
- **Accessibility (a11y)**: 100
- **Best Practices**: 100
- **SEO**: 83

Optimizations applied: responsive images, persistent skeletons (no CLS), Netlify Image CDN, code splitting via Module Federation.

### Design Tokens

This project uses [Style Dictionary](https://styledictionary.com/) to manage design tokens. Tokens are defined in JSON format following the [DTCG specification](https://tr.designtokens.org/format/) and are automatically compiled to CSS custom properties and Tailwind CSS theme.

The tokens package generates:
- **CSS variables** for use in any CSS
- **Tailwind @theme** for Tailwind v4 integration
- **JavaScript/TypeScript exports** for programmatic access

See [packages/tokens/README.md](./packages/tokens/README.md) for detailed documentation.

### Storybook

To run Storybook for the design system:

```bash
pnpm --filter @vite-mf-monorepo/storybook storybook
```

Open http://localhost:6006

### Project Structure

```
vite-mf-monorepo/
├── apps/
│   ├── host/          # Host application (port 3000)
│   ├── home/          # Home page - movies/tv series carrousels (port 3001)
│   ├── media/         # Media details page (port 3002)
│   └── photos/        # Routed photos carrousel in lightbox mode (port 3003)
├── packages/
│   ├── layouts/       # Shared component to setup page zoning
│   ├── shared/        # Shared utils, Vite plugins, Tailwind theme
│   ├── ui/            # Design system (Button, Card, etc.)
│   ├── tokens/        # Design tokens (Style Dictionary)
│   ├── http-client/   # TMDB API client (heyAPI + TanStack Query)
│   └── storybook/     # Storybook for UI components
└── scripts/           # Utility scripts (reset, kill-ports)
```

### Project features

- Micro frontends architecture
- Dynamic loading of micro frontends
- HMR enabled not only on host but on remotes as well when working in dev mode (not really full HMR, triggers a full reload)
- Modular and scalable architecture
- Easy to understand and extend
- Types generation in dev mode to allow host/consumer to get types from remote, now it's possible to do it with Vite
- Responsive design
- Tailwind CSS v4 with shared theme tokens
- Easy to add new micro frontends
- Each remote is standalone and can be deployed independently
- For production mode (locally), each part of the application is hosted in a expressJS server

### Testing

This project uses Vitest and React Testing Library for testing. The tests are located in the `components` folder of each package. To run the tests, use the following command at the root of the project:

```bash
pnpm t
```   

Some extra tests will be added in the future, but for now, the focus is on the main features of the project.

#### Coverage

To run the tests with coverage, use the following command at the root of the project:

```bash
pnpm coverage
```

This will generate a coverage report in the `coverage` folder of each package. The coverage report will be generated in HTML format, and you can open it in your browser to see the coverage details.

With Intellij, you can open the coverage report by right-clicking on the `coverage` folder and selecting "Open in Browser". This will open the coverage report in your default browser.

### Accessibility (a11y)

This project prioritizes **accessible user interfaces** by following WCAG guidelines and automated testing.

#### Testing Accessibility

Tests use **React Testing Library's semantic queries** to ensure components are accessible:

```typescript
// ✅ Good: Query by semantic roles (mimics how users interact)
screen.getByRole('button', { name: /submit/i })
screen.getByRole('tab', { name: /today/i })
screen.getByRole('tabpanel', { name: /content/i })

// ❌ Bad: Query by implementation (brittle, not accessible)
screen.getByText('Click me')
container.querySelector('.btn')
```

**Key patterns**:
- Use `getByRole()` for interactive elements (button, tab, dialog, tabpanel)
- Target specific panels when elements appear in multiple locations (e.g., tabs rendering all panels)
- Use `.querySelector()` scoped to a specific container to avoid "Found multiple elements" errors

#### pa11y Automation

This project uses **[pa11y](https://www.pa11y.org/)** for automated accessibility scanning. Configuration is in `.pa11yci.json`:

```bash
# Run accessibility audit on all pages
pnpm test:a11y
```

**What pa11y checks**:
- WCAG 2.1 compliance (contrast, aria attributes, semantic HTML)
- Broken links and missing alt text
- Form labels and keyboard navigation
- Page structure and heading hierarchy

#### Accessibility Best Practices Applied

- **Semantic HTML**: Use native `<button>`, `<a>`, `<form>` elements instead of divs
- **ARIA attributes**: Add `aria-label`, `aria-controls`, `role` when needed
- **Keyboard navigation**: All interactive elements are reachable via Tab
- **Color contrast**: Text meets WCAG AA (4.5:1) or AAA (7:1) standards
- **Focus management**: Clear focus indicators on interactive elements
- **Testing Library**: Tests query by accessible role, not implementation

See [docs/A11Y.md](./docs/A11Y.md) for detailed accessibility guidelines.

### Issues

The micro frontends architecture doesn't provide good SEO. It's rather meant for big apps like Paas or Saas. It's basically not a good fit for a movie database app or any ecommerce website.

But starting from a public API, it was possible to display complex contents from data.

A better option will be to have another version of the app using a server side rendering architecture based on NextJS getting real good lighthouse scores.

### Future Enhancements

- Add e2e tests with vitest in browser mode
- Add a detail page for the talent (people) taking part in a movie
- Make packages like `token`, `layouts` and `ui` available via npm registry for other architectural approaches.
- For DX, add a .vscode and .cursor rules for Cursor users
- Create a server side rendering version of the app using NextJS

### Acknowledgments

Special thanks to [Nsttt](https://github.com/Nsttt) for his work on the DTS (TypeScript declarations) plugin integration with `@module-federation/vite`. His contributions to the Module Federation ecosystem made it possible to have proper type generation between remotes and host in dev mode, which is essential for a good DX in a micro-frontend architecture.
