import { readFileSync } from 'fs'
import { resolve } from 'path'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { listenForRemoteRebuilds } from '@antdevx/vite-plugin-hmr-sync'
import { federation } from '@module-federation/vite'
import dotenv from 'dotenv'
import { parse } from 'yaml'

dotenv.config()

// Read versions from pnpm catalog (single source of truth)
const workspace = parse(
  readFileSync(resolve(__dirname, '../../pnpm-workspace.yaml'), 'utf-8')
)
const catalog = workspace.catalog

const moduleFederationConfig = {
  name: 'host',
  exposes: {},
  filename: 'remoteEntry.js',
  remotes: {
    list: {
      type: 'module',
      name: 'list',
      entry: `http://localhost:${process.env.REMOTE_LIST_PORT}/remoteEntry.js`,
      entryGlobalName: 'list',
      sharedScope: 'default',
    },
    detail: {
      type: 'module',
      name: 'detail',
      entry: `http://localhost:${process.env.REMOTE_DETAIL_PORT}/remoteEntry.js`,
      entryGlobalName: 'detail',
      sharedScope: 'default',
    },
  },
  shared: {
    react: {
      singleton: true,
      requiredVersion: catalog['react'],
    },
    'react-dom': {
      singleton: true,
      requiredVersion: catalog['react-dom'],
    },
    'react-router-dom': {
      singleton: true,
      requiredVersion: catalog['react-router-dom'],
    },
    '@tanstack/react-query': {
      singleton: true,
      requiredVersion: catalog['@tanstack/react-query'],
    },
  },
  dts: {
    generateTypes: false,
    consumeTypes: true,
  },
}

export default defineConfig(({ mode }) => {
  return {
    define: {
      __MF_VERSIONS__: JSON.stringify({
        react: catalog['react'],
        'react-dom': catalog['react-dom'],
        'react-router-dom': catalog['react-router-dom'],
        '@tanstack/react-query': catalog['@tanstack/react-query'],
      }),
    },
    plugins: [
      tailwindcss(),
      federation(moduleFederationConfig),
      react(),
      /**
       * HMR Sync: Listen for rebuild notifications from remotes.
       *
       * In Module Federation, HMR doesn't work between host and remotes because
       * the WebSocket connection is only established by the host. This plugin
       * creates an HTTP endpoint that remotes can call to trigger a full page
       * reload in the browser.
       *
       * Remotes use the custom `notifyHostOnHmr` plugin from @vite-mf-monorepo/shared
       * to send notifications when files change.
       *
       * @see packages/shared/src/vite/notifyHostOnHmr.ts - Remote-side plugin
       * @see files/HMR-SYNC.md - Full documentation
       */
      listenForRemoteRebuilds({
        allowedApps: ['list', 'detail'],
        endpoint: '/on-child-rebuild',
        hotPayload: { type: 'full-reload', path: '*' },
        onRebuild: (appName) => {
          console.warn(`[host] 🔁 Reload triggered by: ${appName}`)
        },
      }),
    ],
    build: {
      target: 'esnext',
    },
    server: {
      port: parseInt(process.env.HOST_PORT),
      strictPort: true,
    },
  }
})
