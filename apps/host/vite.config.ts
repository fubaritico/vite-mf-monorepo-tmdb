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
    home: {
      type: 'module',
      name: 'home',
      entry: `http://localhost:${process.env.REMOTE_HOME_PORT}/remoteEntry.js`,
      entryGlobalName: 'home',
      sharedScope: 'default',
    },
    movie: {
      type: 'module',
      name: 'movie',
      entry: `http://localhost:${process.env.REMOTE_MOVIE_PORT}/remoteEntry.js`,
      entryGlobalName: 'movie',
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
  const isTest = process.env.VITEST === 'true'

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
      react(),
      // Skip build-time plugins in test mode
      ...(isTest
        ? []
        : [
            federation(moduleFederationConfig),
            listenForRemoteRebuilds({
              allowedApps: ['home', 'movie'],
              endpoint: '/on-child-rebuild',
              hotPayload: { type: 'full-reload', path: '*' },
              onRebuild: (appName) => {
                console.warn(`[host] 🔁 Reload triggered by: ${appName}`)
              },
            }),
          ]),
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
