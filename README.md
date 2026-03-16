## Live Demo

**<a href="https://vite-mf-tmdb.netlify.app" target="_blank" rel="noopener noreferrer">https://vite-mf-tmdb.netlify.app</a>** — Browse movies, explore detail pages, cast, crew and photos.

**<a href="https://vite-mf-tmdb-storybook.netlify.app" target="_blank" rel="noopener noreferrer">https://vite-mf-tmdb-storybook.netlify.app</a>** — Design system Storybook

---

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Architecture & Features](#architecture--features)
- [Development](#development)
  - [Useful Commands](#useful-commands)
  - [Production Builds](#production-builds)
  - [Storybook](#storybook)
  - [Testing](#testing)
  - [Accessibility](#accessibility)
- [Design Tokens](#design-tokens)
- [Error Monitoring (Sentry)](#error-monitoring-sentry)
- [CI/CD & Deployment](#cicd--deployment)
  - [CI Workflow](#ci-workflow)
  - [Deploy Workflows](#deploy-workflows)
  - [GitHub Actions Secrets](#github-actions-secrets)
- [Performance & Quality](#performance--quality)
- [Known Limitations](#known-limitations)
- [Future Enhancements](#future-enhancements)
- [Acknowledgments](#acknowledgments)

---

## Overview

A **real-world micro-frontend architecture** built with React, Vite, and Module Federation, designed for **multi-team collaboration** on a single application. Different teams can work independently on distinct features while maintaining a cohesive user experience.

### Technologies

React · Vite · TypeScript · @module-federation/vite · Lerna · pnpm · React Router · TanStack Query · Tailwind CSS v4 · Style Dictionary · Vitest · React Testing Library · Storybook · SonarQube · Sentry

### Team Organization

| Team | Scope | Apps |
|---|---|---|
| Home & Media | Home page, movie/TV detail pages | `apps/home`, `apps/media` |
| User & Wishlist | User accounts and wishlist features | Planned |
| Talent | Person/talent detail pages | Planned (`apps/talent`) |

Each team owns their remote application with full autonomy over codebase, deployment, and release cycle.

[⬆ Back to top](#table-of-contents)

---

## Getting Started

> Requires pnpm installed and Node >= 22.11.0

1. Clone the repository
2. Get a free [TMDB API key](https://www.themoviedb.org/) and create `.env.local` at the project root:
   ```bash
   VITE_TMDB_API_TOKEN=your_bearer_token
   ```
3. Install dependencies and start:
   ```bash
   pnpm setup  # Install dependencies and build packages
   pnpm dev    # Start development
   ```
4. Open http://localhost:3000

### Reset

If you need a clean install (removes `node_modules`, `dist` folders, and reinstalls):

```bash
pnpm reset
pnpm dev
```

[⬆ Back to top](#table-of-contents)

---

## Project Structure

```
vite-mf-monorepo/
├── apps/
│   ├── host/          # Host application (port 3000)
│   ├── home/          # Home page - movies/tv series carousels (port 3001)
│   ├── media/         # Media details page (port 3002)
│   └── photos/        # Routed photos carousel in lightbox mode (port 3003)
├── packages/
│   ├── layouts/       # Shared component to setup page zoning
│   ├── shared/        # Shared utils, Vite plugins, Tailwind theme
│   ├── ui/            # Design system (Button, Card, etc.)
│   ├── tokens/        # Design tokens (Style Dictionary)
│   ├── http-client/   # TMDB API client (heyAPI + TanStack Query)
│   └── storybook/     # Storybook for UI components
└── scripts/           # Utility scripts (reset, kill-ports)
```

[⬆ Back to top](#table-of-contents)

---

## Architecture & Features

### Architecture Benefits

- **Independent deployment** — each remote can be deployed separately
- **Team autonomy** — teams work on isolated codebases with minimal coordination
- **Shared foundation** — common design system, tokens, and utilities ensure consistency
- **Type safety** — TypeScript types are generated and shared between remotes and host
- **Scalability** — new teams and features can be added without disrupting existing work

### Key Features

- Dynamic loading of micro frontends via Module Federation
- HMR on both host and remotes in dev mode (triggers a full reload)
- Types generation in dev mode for host/consumer type safety
- Responsive design with Tailwind CSS v4 shared theme tokens
- Each remote is standalone and can be deployed independently
- Production mode uses Express.js servers locally

[⬆ Back to top](#table-of-contents)

---

## Development

### Useful Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all apps with watch mode for packages |
| `pnpm reset` | Full reset: clean + install |
| `pnpm build:packages` | Rebuild shared packages (if you modify ui, layouts, or shared) |
| `pnpm storybook` | Start Storybook |
| `pnpm kill-ports` | Kill processes on ports 3000, 3001, 3002, 6006 |
| `pnpm test` | Run tests |
| `pnpm lint` | Run ESLint |
| `pnpm type-check` | Run TypeScript type checking |

### Production Builds

The project separates **build-only** commands from **build + server** commands:

| Command | Context | Behavior |
|---------|---------|---------|
| `pnpm prod` | CI / GitHub Actions / Netlify | Builds all apps — **no servers started** |
| `pnpm prod:server` | Local development | Builds all apps **and** starts servers on ports 3000-3003 |
| `pnpm prod:server:ordered` | Local development | Same as above, but sequential |

**CI / GitHub Actions:**
```bash
pnpm prod          # Just build, job terminates quickly
```

**Netlify (remotes)** — each remote uses a custom build script:
```bash
pnpm install && pnpm build:packages && cd apps/home && pnpm build
```

**Local testing:**
```bash
pnpm prod:server   # Build all + start all servers
```
Then open http://localhost:3000. Remotes run on separate ports but are consumed by the host.

### Storybook

```bash
pnpm --filter @vite-mf-monorepo/storybook storybook
```

Open http://localhost:6006

### Testing

Uses **Vitest** and **React Testing Library**. Tests are co-located with components.

```bash
pnpm test       # Run tests
pnpm coverage   # Run tests with coverage (HTML report in coverage/)
```

### Accessibility

This project prioritizes accessible UIs following WCAG guidelines.

#### Testing Approach

Tests use **React Testing Library's semantic queries**:

```typescript
// ✅ Query by semantic roles (mimics how users interact)
screen.getByRole('button', { name: /submit/i })
screen.getByRole('tab', { name: /today/i })
screen.getByRole('tabpanel', { name: /content/i })

// ❌ Query by implementation (brittle, not accessible)
screen.getByText('Click me')
container.querySelector('.btn')
```

#### pa11y Automation

[pa11y](https://www.pa11y.org/) runs automated WCAG 2.1 scans (contrast, ARIA, semantic HTML, heading hierarchy, keyboard navigation):

```bash
pnpm test:a11y
```

#### Best Practices Applied

- **Semantic HTML** — native `<button>`, `<a>`, `<form>` over divs
- **ARIA attributes** — `aria-label`, `aria-controls`, `role` where needed
- **Keyboard navigation** — all interactive elements reachable via Tab
- **Color contrast** — WCAG AA (4.5:1) or AAA (7:1) standards
- **Focus management** — clear focus indicators on interactive elements

See [docs/A11Y.md](./docs/A11Y.md) for detailed guidelines.

[⬆ Back to top](#table-of-contents)

---

## Design Tokens

Uses [Style Dictionary](https://styledictionary.com/) with tokens defined in JSON following the [DTCG specification](https://tr.designtokens.org/format/). Tokens are compiled to:

- **CSS variables** for use in any CSS
- **Tailwind @theme** for Tailwind v4 integration
- **JavaScript/TypeScript exports** for programmatic access

See [packages/tokens/README.md](./packages/tokens/README.md) for detailed documentation.

[⬆ Back to top](#table-of-contents)

---

## Error Monitoring (Sentry)

Each app (host, home, media, photos) initializes Sentry independently via an `instrument.ts` file imported before the application bootstraps.

### What's Captured

- **Errors** — unhandled exceptions, promise rejections, React component errors (via React 19 hooks)
- **Performance** — browser tracing with configurable sample rate (10% in production, 100% in development)
- **Session Replay** — 10% of sessions recorded, 100% on error

### Configuration

Each app tags events with its own name (`app: 'host'`, `app: 'home'`, etc.) and uses a unique release identifier (`host@<git-sha>`) for source map association.

| Environment variable | Purpose |
|---|---|
| `VITE_SENTRY_DSN` | Project DSN — if empty, Sentry is silently disabled |
| `VITE_SENTRY_ENVIRONMENT` | Environment tag (`production` in CI) |
| `VITE_GIT_SHA` | Git SHA used as release identifier |
| `SENTRY_AUTH_TOKEN` | Auth token for source map upload (build-time only, not embedded) |

### Key Decisions

- **`tracePropagationTargets: []`** — disables `sentry-trace` header injection on outgoing requests to avoid CORS issues with third-party APIs (TMDB)
- **`ChunkLoadError` filtered** — Module Federation chunk failures are dropped to reduce noise
- **Source maps** uploaded via `@sentry/vite-plugin` during CI builds

[⬆ Back to top](#table-of-contents)

---

## CI/CD & Deployment

### CI Workflow

Runs on push or pull_request to `main` / `develop` — 3 sequential phases:

**Phase 1 — Validate** (3 parallel jobs):
- **Lint** — ESLint across the entire monorepo
- **Type Check** — TypeScript `--noEmit` verification
- **Test** — Vitest with 80% line coverage threshold; uploads coverage artifact

Once all 3 pass, a **Build** job runs: `pnpm prod` (all apps), uploads dist artifacts (retained 1 day).

**Phase 2 — SonarQube** (after Validate):
- Downloads the coverage artifact from Phase 1
- Runs SonarQube scan against SonarCloud

**Phase 3 — Quality Gate** (after Validate + SonarQube, always runs):
- Checks both phases completed as `success`
- If either failed → exits 1, blocks merge

### Deploy Workflows

Five deploy workflows run in parallel on push to `main` after CI succeeds (`workflow_run: [\"CI\"]` with `conclusion == 'success'`).

Each workflow:
1. Checks out the exact SHA that triggered CI (full history)
2. Fetches parent commit SHA via GitHub API
3. Runs `paths-filter` comparing changed files
4. **If nothing changed** → skips entirely (no install, no build, no deploy)
5. **If changed** → `pnpm install` + `pnpm build:packages` → `pnpm prod` → `netlify deploy --prod`

| Workflow | Triggers deploy when |
|---|---|
| `deploy-home` | `apps/home/**` or `packages/**` changed |
| `deploy-host` | `apps/host/**` or `packages/**` changed |
| `deploy-media` | `apps/media/**` or `packages/**` changed |
| `deploy-photos` | `apps/photos/**` or `packages/**` changed |
| `deploy-storybook` | `packages/storybook/**`, `packages/ui/**`, or `packages/layouts/**` changed |

#### Manual Workflows

- **sonar-init** (`workflow_dispatch`) — initializes the SonarCloud project from `main`; run once on setup

### GitHub Actions Secrets

All secrets are configured in **GitHub → Settings → Secrets and variables → Actions**.

> **Important — build-time embedding**: `VITE_*` variables are replaced with literal values in the JavaScript bundle during `pnpm prod`. If a secret is missing at build time, the wrong value is permanently baked into the deployed bundle.

#### Netlify

| Secret | Used by | Description |
|---|---|---|
| `NETLIFY_AUTH_TOKEN` | all deploy workflows | Personal access token for `netlify-cli` |
| `NETLIFY_SITE_ID_HOME` | `deploy-home` | Site ID for `vite-mf-tmdb-home` |
| `NETLIFY_SITE_ID_HOST` | `deploy-host` | Site ID for `vite-mf-tmdb` (host app) |
| `NETLIFY_SITE_ID_MEDIA` | `deploy-media` | Site ID for `vite-mf-tmdb-media` |
| `NETLIFY_SITE_ID_PHOTOS` | `deploy-photos` | Site ID for `vite-mf-tmdb-photos` |
| `NETLIFY_SITE_ID_STORYBOOK` | `deploy-storybook` | Site ID for `vite-mf-tmdb-storybook` |

#### Application (build-time variables)

| Secret | Used by | Description |
|---|---|---|
| `VITE_TMDB_API_TOKEN` | home, media, photos, host | TMDB bearer token. Without it, all API calls return HTTP 401. |
| `VITE_HOME_URL` | host | Production URL of the home remote. If empty, host loads its own `remoteEntry.js`. |
| `VITE_MEDIA_URL` | host | Production URL of the media remote. |
| `VITE_PHOTOS_URL` | host | Production URL of the photos remote. |
| `VITE_SENTRY_DSN` | all deploy workflows | Sentry project DSN. Without it, Sentry is silently disabled. |
| `VITE_SENTRY_ENVIRONMENT` | all deploy workflows | Hardcoded to `production` in CI. |
| `VITE_GIT_SHA` | all deploy workflows | Git commit SHA used as Sentry release identifier. |
| `SENTRY_AUTH_TOKEN` | all deploy workflows | Sentry auth token for source map upload. **Not** `VITE_`-prefixed — never embedded in bundles. |
| `SENTRY_ORG` | all deploy workflows | Sentry organization slug. |
| `SENTRY_PROJECT` | all deploy workflows | Sentry project slug. |

#### SonarQube

| Secret | Used by | Description |
|---|---|---|
| `SONAR_TOKEN` | `sonarqube` | SonarCloud authentication token |
| `SONAR_HOST_URL` | `sonarqube` | SonarCloud server URL |
| `SONAR_PROJECT_KEY` | `sonarqube` | Project key in SonarCloud |

#### Legacy — Netlify build hooks (no longer used)

These secrets were used when Netlify built the apps itself via its GitHub integration. Since the migration to `netlify-cli` with `--no-build`, builds run entirely in GitHub Actions and Netlify only receives the pre-built `dist/` folder. These hooks are no longer called.

| Secret | Description |
|---|---|
| `NETLIFY_BUILD_HOOK_HOME` | Replaced by `deploy-home.yml` |
| `NETLIFY_BUILD_HOOK_HOST` | Replaced by `deploy-host.yml` |
| `NETLIFY_BUILD_HOOK_MEDIA` | Replaced by `deploy-media.yml` |
| `NETLIFY_BUILD_HOOK_PHOTOS` | Replaced by `deploy-photos.yml` |
| `NETLIFY_BUILD_HOOK_STORYBOOK` | Replaced by `deploy-storybook.yml` |

[⬆ Back to top](#table-of-contents)

---

## Performance & Quality

Lighthouse scores (measured on deployed app):

| Metric | Score |
|---|---|
| Performance | 80+ |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 83 |

Optimizations: responsive images, persistent skeletons (no CLS), Netlify Image CDN, code splitting via Module Federation.

[⬆ Back to top](#table-of-contents)

---

## Known Limitations

The micro-frontend architecture is not ideal for SEO. It's better suited for large SaaS/PaaS applications than a public-facing movie database or e-commerce site. However, starting from a public API, it was possible to display complex content and demonstrate the architecture's strengths.

[⬆ Back to top](#table-of-contents)

---

## Future Enhancements

- E2E tests with Vitest in browser mode
- Talent detail page (`apps/talent`)
- Publish `tokens`, `layouts`, and `ui` packages to npm for reuse in other architectures
- `.vscode` and `.cursor` rules for Cursor/VS Code users
- Server-side rendering version with Next.js

[⬆ Back to top](#table-of-contents)

---

## Acknowledgments

Special thanks to [Nsttt](https://github.com/Nsttt) for his work on the DTS (TypeScript declarations) plugin integration with `@module-federation/vite`. His contributions to the Module Federation ecosystem made it possible to have proper type generation between remotes and host in dev mode, which is essential for a good DX in a micro-frontend architecture.

[⬆ Back to top](#table-of-contents)