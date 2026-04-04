# New Remote App Setup — Step-by-step Guide

Complete operational guide for creating a new Module Federation remote app from scratch.
Reference implementation: `apps/search` (port 3004, prefix `sr:`).

---

## Step 1 — Choose name, port, and CSS prefix

| Setting | Convention | Example |
|---|---|---|
| App name | lowercase, short | `search` |
| Package name | `@vite-mf-monorepo/{name}` | `@vite-mf-monorepo/search` |
| Port | next available after 3003 | `3004` |
| CSS prefix | 2-letter abbreviation | `sr:` |
| Env var (port) | `REMOTE_{NAME}_PORT` | `REMOTE_SEARCH_PORT` |
| Env var (URL) | `VITE_{NAME}_URL` | `VITE_SEARCH_URL` |

---

## Step 2 — Create files in `apps/{name}/`

### 2.1 `package.json`

Copy from `apps/home/package.json`. Change:
- `"name"` → `"@vite-mf-monorepo/{name}"`
- Add `"type-check": "tsc -p ./ --noEmit"` to scripts
- Add `"--passWithNoTests"` to test script until tests exist

Dependencies and devDependencies are identical across all remotes.

### 2.2 `tsconfig.json`

```json
{
  "extends": ["../../tsconfig"],
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "exclude": ["**/*.test.ts", "**/*.test.tsx"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### 2.3 `tsconfig.node.json`

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

### 2.4 `index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{Name}</title>
    <link rel="preconnect" href="https://image.tmdb.org">
    <link rel="preconnect" href="https://api.themoviedb.org">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### 2.5 `vite.config.ts`

Copy from `apps/home/vite.config.ts`. Change:
- `name: '{name}'` in federation config
- `exposes` — adjust to your components
- Port env var: `process.env.REMOTE_{NAME}_PORT`
- `appName: '{name}'` in notifyHostOnHmr
- `release: { name: '{name}@...' }` in sentryVitePlugin
- Proxy targets: use the correct port env var

### 2.6 `server.js`

Express production server. Copy from `apps/home/server.js`. Change:
- `process.env.REMOTE_{NAME}_PORT`
- SPA fallback route: `app.get('/{route}', ...)` matching the app's main route
- Use `console.warn` (never `console.log`)

### 2.7 `vitest.config.ts`

```typescript
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    name: '{name}',
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.test.tsx'],
    disableConsoleIntercept: true,
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json', 'html'],
    },
  },
})
```

### 2.8 `vitest.setup.ts`

```typescript
import '@testing-library/jest-dom/vitest'

import { setupBrowserMocks } from '@vite-mf-monorepo/shared/mocks'

setupBrowserMocks()
```

### 2.9 `eslint.config.js`

```javascript
import rootEsLingConfig from '../../eslint.config.js'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  rootEsLingConfig,
  {
    ignores: ['dist', '.___mf__temp', 'nodes_modules'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['**/*.test.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
    },
  }
)
```

### 2.10 `.prettierrc`

```json
{
  "semi": false,
  "trailingComma": "es5",
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": false
}
```

---

## Step 3 — Create files in `apps/{name}/src/`

### 3.1 `vite-env.d.ts`

```typescript
/// <reference types="vite/client" />
```

### 3.2 `instrument.ts`

Copy from `apps/home/src/instrument.ts`. Change:
- `release: '{name}@${String(import.meta.env.VITE_GIT_SHA ?? 'local')}'`
- `initialScope: { tags: { app: '{name}' } }`

Note: use `String()` wrapper on `import.meta.env.VITE_GIT_SHA` to avoid ESLint `restrict-template-expressions` error.

### 3.3 `main.tsx`

```typescript
import './instrument'

import * as Sentry from '@sentry/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import './index.css'

import { queryClient, routes } from './routes'

const sentryCreateBrowserRouter =
  Sentry.wrapCreateBrowserRouterV7(createBrowserRouter)
const router = sentryCreateBrowserRouter(routes)

const root = document.getElementById('root')
if (!root) {
  throw new Error('root not found')
}

createRoot(root, {
  onUncaughtError: Sentry.reactErrorHandler(),
  onCaughtError: Sentry.reactErrorHandler(),
  onRecoverableError: Sentry.reactErrorHandler(),
}).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
)
```

### 3.4 `routes.tsx`

```typescript
import { QueryClient } from '@tanstack/react-query'
import { RootLayout } from '@vite-mf-monorepo/layouts'

import {ComponentName} from './components/{ComponentName}'

import type { RouteObject } from 'react-router-dom'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
  },
})

export const routes: RouteObject[] = [
  {
    element: (
      <RootLayout projectUrl="https://github.com/fubaritico/vite-mf-monorepo-tmdb" />
    ),
    children: [
      {
        path: '/{route}',
        element: <{ComponentName} />,
      },
    ],
  },
]
```

### 3.5 `index.css`

Standalone mode CSS (full Tailwind + fonts). Replace `xx` with your prefix.

```css
@import "tailwindcss" prefix(xx);
@import "@vite-mf-monorepo/shared/src/tailwind/theme.css" prefix(xx);
@import "@vite-mf-monorepo/layouts/styles.css";
@import "@vite-mf-monorepo/ui/styles.css";

@layer utilities {
}

:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  display: flex;
  min-width: 320px;
  min-height: 100vh;
}

#root {
  width: 100%;
}
```

### 3.6 `remote-input.css`

Host-consumption CSS (no preflight, no fonts). Replace `xx` with your prefix.

```css
/**
 * Input CSS for remote consumption (without preflight).
 * Processed by Tailwind CLI to generate remote.css.
 * Prefix: xx ({name}) to avoid conflicts with host classes.
 */
@layer theme, base, components, utilities;
@import "tailwindcss/theme.css" layer(theme) prefix(xx);
@import "tailwindcss/utilities.css" layer(utilities) prefix(xx);
@import "@vite-mf-monorepo/shared/src/tailwind/theme-no-fonts.css";

@layer utilities {
}
```

Rule: `@layer utilities` blocks must stay in sync between `index.css` and `remote-input.css`.

### 3.7 `index.ts`

Barrel export:

```typescript
export { default as {ComponentName} } from './components/{ComponentName}'
```

### 3.8 `components/{ComponentName}.tsx`

Placeholder page with MF sentinel:

```typescript
import { Typography } from '@vite-mf-monorepo/ui'

import type { FC } from 'react'

import '../remote.css'

const {ComponentName}: FC = () => {
  return (
    <div data-testid="mf-ready-{name}">
      <Typography variant="h1">{Name}</Typography>
    </div>
  )
}

export default {ComponentName}
```

`data-testid="mf-ready-{name}"` is the MF sentinel used by E2E tests.
`import '../remote.css'` only on the root MF-exposed component.

---

## Step 4 — Modify existing files

### 4.1 `.env`

Add port and URL:

```
REMOTE_{NAME}_PORT={port}
VITE_{NAME}_URL=http://localhost:{port}
```

### 4.2 `apps/host/vite.config.ts`

Add to `moduleFederationConfig.remotes`:

```typescript
{name}: {
  type: 'module',
  name: '{name}',
  entry:
    process.env.NODE_ENV === 'production'
      ? `${process.env.VITE_{NAME}_URL}/remoteEntry.js`
      : `http://localhost:${process.env.REMOTE_{NAME}_PORT}/remoteEntry.js`,
  entryGlobalName: '{name}',
  sharedScope: 'default',
},
```

Add to `listenForRemoteRebuilds.allowedApps`:

```typescript
allowedApps: ['home', 'media', 'photos', 'search', '{name}'],
```

### 4.3 `apps/host/src/router.tsx`

Add route:

```typescript
{
  path: '{route}',
  async lazy() {
    const { default: {ComponentName} } = await import('{name}/{ComponentName}')
    return { Component: {ComponentName} }
  },
},
```

### 4.4 `scripts/kill-ports.sh`

Add the new port to the `lsof` command.

---

## Step 5 — Install and validate

```bash
pnpm install
pnpm type-check && pnpm lint && pnpm test
pnpm dev   # verify http://localhost:3000/{route} works
```

---

## Step 6 — CI/CD deployment

### 6.1 Create `.github/workflows/deploy-{name}.yml`

Copy from `deploy-home.yml`. Change:
- Workflow name: `Deploy {Name} to Netlify`
- paths-filter: `'apps/{name}/**'`
- Deploy dir: `apps/{name}/dist`
- Site ID env var: `NETLIFY_SITE_ID_{NAME}`
- `--cwd apps/{name}`

### 6.2 Add `VITE_{NAME}_URL` to `deploy-host.yml`

In the Build step `env:` section, add:

```yaml
VITE_{NAME}_URL: ${{ secrets.VITE_{NAME}_URL }}
```

Without this, the host builds with `undefined` for the remote URL.

### 6.3 Create Netlify site

```bash
netlify sites:create --name vite-mf-tmdb-{name}
```

### 6.4 Add GitHub secrets

| Secret | Value |
|---|---|
| `NETLIFY_SITE_ID_{NAME}` | Site ID from Netlify |
| `VITE_{NAME}_URL` | `https://vite-mf-tmdb-{name}.netlify.app` |

### 6.5 Deploy sequence

1. Push code → CI runs → `deploy-{name}.yml` deploys the remote
2. Add secrets → re-run `deploy-host.yml` (or push a change to host) → host rebuilds with the new remote URL

---

## Step 7 — Update documentation

- `CLAUDE.md` — add app with port, prefix, and any special notes
- `architecture.md` — add to project structure and port table
- `README.md` — add to app list if applicable

---

## Checklist

### Files to create (`apps/{name}/`)
- [ ] `package.json` — name, scripts (incl. `type-check`), deps
- [ ] `tsconfig.json` — extends root, strict, bundler mode
- [ ] `tsconfig.node.json` — composite, includes vite.config.ts
- [ ] `index.html` — root div, preconnect, script
- [ ] `vite.config.ts` — federation, CSS, Sentry, HMR, proxy
- [ ] `server.js` — Express, CORS, /health, SPA fallback
- [ ] `vitest.config.ts` — jsdom, Istanbul, setup file
- [ ] `vitest.setup.ts` — jest-dom + setupBrowserMocks
- [ ] `eslint.config.js` — extends root, ignores dist
- [ ] `.prettierrc` — project conventions
- [ ] `src/vite-env.d.ts` — Vite client types
- [ ] `src/instrument.ts` — Sentry init, app tag
- [ ] `src/main.tsx` — Sentry router, QueryClient, StrictMode
- [ ] `src/routes.tsx` — queryClient, routes, RootLayout
- [ ] `src/index.css` — full Tailwind + fonts (standalone)
- [ ] `src/remote-input.css` — theme-no-fonts (host consumption)
- [ ] `src/index.ts` — barrel export
- [ ] `src/components/{Component}.tsx` — placeholder + MF sentinel

### Files to modify
- [ ] `.env` — port + URL
- [ ] `apps/host/vite.config.ts` — remote entry + allowedApps
- [ ] `apps/host/src/router.tsx` — route
- [ ] `scripts/kill-ports.sh` — add port

### CI/CD
- [ ] `.github/workflows/deploy-{name}.yml` — Netlify deploy workflow
- [ ] `.github/workflows/deploy-host.yml` — add `VITE_{NAME}_URL` to Build env
- [ ] Netlify — create site
- [ ] GitHub Secrets — `NETLIFY_SITE_ID_{NAME}` + `VITE_{NAME}_URL`
