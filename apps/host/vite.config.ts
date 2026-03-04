import { readFileSync } from 'fs'
import { resolve } from 'path'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { listenForRemoteRebuilds } from '@antdevx/vite-plugin-hmr-sync'
import { federation } from '@module-federation/vite'
import { assetPreloadInjection, fontPreloadInjection } from '@vite-mf-monorepo/shared/vite'
import dotenv from 'dotenv'
import { parse } from 'yaml'

dotenv.config()

// Read versions from pnpm catalog (single source of truth)
const workspace = parse(
  readFileSync(resolve(__dirname, '../../pnpm-workspace.yaml'), 'utf-8')
)
const catalog = workspace.catalog

// ============================================================================
// Module Federation Configuration
// ============================================================================
// This configuration defines how the host loads remote applications.
//
// Development: Uses localhost URLs with ports from .env
// Production: Uses Netlify deployment URLs from environment variables
// ============================================================================

const moduleFederationConfig = {
  name: 'host',
  exposes: {},
  filename: 'remoteEntry.js',
  remotes: {
    home: {
      type: 'module',
      name: 'home',
      // Production: Use VITE_HOME_URL from Netlify environment variables
      // Development: Use localhost with REMOTE_HOME_PORT from .env
      entry:
        process.env.NODE_ENV === 'production'
          ? `${process.env.VITE_HOME_URL}/remoteEntry.js`
          : `http://localhost:${process.env.REMOTE_HOME_PORT}/remoteEntry.js`,
      entryGlobalName: 'home',
      sharedScope: 'default',
    },
    media: {
      type: 'module',
      name: 'media',
      // Production: Use VITE_MEDIA_URL from Netlify environment variables
      // Development: Use localhost with REMOTE_MOVIE_PORT from .env
      entry:
        process.env.NODE_ENV === 'production'
          ? `${process.env.VITE_MEDIA_URL}/remoteEntry.js`
          : `http://localhost:${process.env.REMOTE_MOVIE_PORT}/remoteEntry.js`,
      entryGlobalName: 'media',
      sharedScope: 'default',
    },
    photos: {
      type: 'module',
      name: 'photos',
      // Production: Use VITE_PHOTOS_URL from Netlify environment variables
      // Development: Use localhost with REMOTE_PHOTOS_PORT from .env
      entry:
        process.env.NODE_ENV === 'production'
          ? `${process.env.VITE_PHOTOS_URL}/remoteEntry.js`
          : `http://localhost:${process.env.REMOTE_PHOTOS_PORT}/remoteEntry.js`,
      entryGlobalName: 'photos',
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
            fontPreloadInjection({
              criticalFonts: ['inter', 'roboto'],
              suppressLogs: false,
            }),
            assetPreloadInjection({
              include: ['index', 'hostInit', 'main'],
              exclude: ['remoteEntry'],
              suppressLogs: false,
            }),
            federation(moduleFederationConfig),
            listenForRemoteRebuilds({
              allowedApps: ['home', 'media', 'photos'],
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
