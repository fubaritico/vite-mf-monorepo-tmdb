# New Remote App Setup

## When to use
Creating a new Vite remote app from scratch (new entry in `apps/`).

## 1. `vite.config.ts`

```typescript
import { readFileSync } from 'fs'
import { resolve } from 'path'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import topLevelAwait from 'vite-plugin-top-level-await'
import { federation } from '@module-federation/vite'
import dotenv from 'dotenv'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import { parse } from 'yaml'
import { notifyHostOnHmr, tailwindRemoteCss } from '@vite-mf-monorepo/shared/vite'

dotenv.config({ path: resolve(__dirname, '../../.env') })

const workspace = parse(readFileSync(resolve(__dirname, '../../pnpm-workspace.yaml'), 'utf-8'))
const catalog = workspace.catalog

export default defineConfig(({ mode }) => {
  const isTest = process.env.VITEST === 'true'

  return {
    envDir: resolve(__dirname, '../..'),
    plugins: [
      ...(isTest ? [] : [
        tailwindRemoteCss({
          input: './src/remote-input.css',
          output: './src/remote.css',
          content: './src/**/*.tsx',
        }),
        federation({
          name: 'remote-name',           // unique, matches host remotes key
          filename: 'remoteEntry.js',
          exposes: {
            './ComponentName': './src/components/ComponentName',
            './routes': './src/routes',
          },
          shared: {
            react: { singleton: true, requiredVersion: catalog['react'] },
            'react-dom': { singleton: true, requiredVersion: catalog['react-dom'] },
            'react-router-dom': { singleton: true, requiredVersion: catalog['react-router-dom'] },
            '@tanstack/react-query': { singleton: true, requiredVersion: catalog['@tanstack/react-query'] },
          },
          dts: {
            generateTypes: { compileInChildProcess: true, generateAPITypes: false, extractThirdParty: false, extractRemoteTypes: false, abortOnError: false },
            consumeTypes: false,
          },
        }),
        cssInjectedByJsPlugin({ relativeCSSInjection: true }),
        topLevelAwait(),
        notifyHostOnHmr({
          appName: 'remote-name',
          hostUrl: `http://localhost:${process.env.HOST_PORT}`,
          endpoint: '/on-child-rebuild',
        }),
      ]),
      tailwindcss(),
      react(),
    ],
    build: {
      modulePreload: false,
      target: 'esnext',
      minify: 'esbuild',
      cssCodeSplit: false,
      emptyOutDir: true,
      rollupOptions: { output: { manualChunks: undefined } },
    },
    ...(mode === 'development' ? {
      server: {
        port: parseInt(process.env.REMOTE_NAME_PORT),
        strictPort: true,
      },
    } : {}),
  }
})
```

## 2. `src/remote-input.css`

Processed by `tailwindRemoteCss` to generate `src/remote.css` for host consumption.
No preflight (host already has it). Uses `theme-no-fonts.css` (font path fix).

```css
@layer theme, base, components, utilities;
@import "tailwindcss/theme.css" layer(theme) prefix(xx);
@import "tailwindcss/utilities.css" layer(utilities) prefix(xx);
@import "@vite-mf-monorepo/shared/src/tailwind/theme-no-fonts.css";

@layer components {
  .media-section:nth-of-type(odd) { background-color: var(--xx-color-muted); }
  .media-section:nth-of-type(even) { background-color: white; }
  footer .media-section { background-color: transparent !important; }
}

@layer utilities {
  /* app-specific custom utilities */
}
```

Replace `xx` with the app CSS prefix (`hm`, `mda`, `ph`, etc.).

## 3. `src/index.css`

For standalone mode (app runs directly without host).

```css
@import "tailwindcss" prefix(xx);
@import "@vite-mf-monorepo/shared/src/tailwind/theme.css" prefix(xx);
@import "@vite-mf-monorepo/layouts/styles.css";
@import "@vite-mf-monorepo/ui/styles.css";

@layer components {
  /* same nth-of-type rules as remote-input.css */
  .media-section:nth-of-type(odd) { background-color: var(--xx-color-muted); }
  .media-section:nth-of-type(even) { background-color: white; }
  footer .media-section { background-color: transparent !important; }
}

@layer utilities {
  /* same custom utilities as remote-input.css */
}

:root { font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif; }
body { display: flex; min-width: 320px; min-height: 100vh; }
#root { width: 100%; }
```

Rule: `index.css` and `remote-input.css` must stay in sync — same `@layer utilities` blocks.

## 4. `src/main.tsx`

No separate bootstrap file — app logic is inline.

```typescript
import { QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { queryClient, routes } from './routes'

import './index.css'

const router = createBrowserRouter(routes)

const root = document.getElementById('root')
if (!root) throw new Error('root not found')

createRoot(root).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
)
```

## 5. Register in host `apps/host/vite.config.ts`

Add to `moduleFederationConfig.remotes`:

```typescript
'remote-name': {
  type: 'module',
  name: 'remote-name',
  entry: process.env.NODE_ENV === 'production'
    ? `${process.env.VITE_REMOTE_NAME_URL}/remoteEntry.js`
    : `http://localhost:${process.env.REMOTE_NAME_PORT}/remoteEntry.js`,
  entryGlobalName: 'remote-name',
  sharedScope: 'default',
},
```

Add to `listenForRemoteRebuilds.allowedApps`:
```typescript
allowedApps: ['home', 'media', 'photos', 'remote-name'],
```

## 6. `.env` — add port

```
REMOTE_NAME_PORT=3004
```

## Checklist

- [ ] `vite.config.ts` — federation name, exposes, port env var
- [ ] `remote-input.css` — correct prefix, nth-of-type rules
- [ ] `index.css` — mirrors remote-input.css, adds full tailwind + fonts
- [ ] `main.tsx` — RouterProvider + QueryClientProvider
- [ ] `routes.tsx` — queryClient + routes array (see `patterns-route.md`)
- [ ] Host vite.config — new remote entry + allowedApps
- [ ] `.env` — new port
- [ ] CLAUDE.md — new app prefix documented
