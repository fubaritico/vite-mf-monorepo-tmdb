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
import { notifyHostOnHmr } from '@vite-mf-monorepo/shared'

import type { ModuleFederationOptions } from '@module-federation/vite/lib/utils/normalizeModuleFederationOptions'
import type { CommonServerOptions } from 'vite'

dotenv.config({ path: resolve(__dirname, '../../.env') })

// Read versions from pnpm catalog (single source of truth)
const workspace = parse(readFileSync(resolve(__dirname, '../../pnpm-workspace.yaml'), 'utf-8'))
const catalog = workspace.catalog

const remoteConfig: ModuleFederationOptions = {
  name: 'detail',
  filename: 'remoteEntry.js',
  exposes: {
    './Detail': './src/components/Detail',
    './DetailErrorBoundary': './src/components/DetailErrorBoundary',
    './routes': './src/routes',
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
    generateTypes: {
      compileInChildProcess: true,
      generateAPITypes: false,
      extractThirdParty: false,
      extractRemoteTypes: false,
      abortOnError: false,
    },
    consumeTypes: false,
  },
}

const proxyOptions: CommonServerOptions = {
  proxy: {
    '/@mf-types.zip': {
      target: `http://localhost:${process.env.REMOTE_DETAIL_PORT}`,
      changeOrigin: true,
      rewrite: () => `/@fs/${process.cwd()}/dist/@mf-types.zip`,
    },
    '/remoteEntry.js': {
      target: `http://localhost:${process.env.REMOTE_DETAIL_PORT}`,
      changeOrigin: true,
      rewrite: () => `/@fs/${process.cwd()}/dist/remoteEntry.js`,
    },
    '/mf-manifest.json': {
      target: `http://localhost:${process.env.REMOTE_DETAIL_PORT}`,
      changeOrigin: true,
      rewrite: () => `/@fs/${process.cwd()}/dist/mf-manifest.json`,
    },
  },
}

export default defineConfig(({ mode }) => ({
  envDir: resolve(__dirname, '../..'),
  plugins: [
    tailwindcss(),
    federation({
      ...remoteConfig,
    }),
    react(),
    // Allow CSS to be injected in host app
    cssInjectedByJsPlugin({
      relativeCSSInjection: true,
    }),
    topLevelAwait(),
    /**
     * HMR Sync: Notify host when files change in this remote.
     *
     * Sends an HTTP request to the host's /on-child-rebuild endpoint
     * on every HMR update, triggering a full page reload in the browser.
     *
     * @see packages/shared/src/vite/notifyHostOnHmr.ts - Plugin implementation
     * @see files/HMR-SYNC.md - Full documentation
     */
    notifyHostOnHmr({
      appName: 'detail',
      hostUrl: `http://localhost:${process.env.HOST_PORT}`,
      endpoint: '/on-child-rebuild',
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  ...(mode === 'development'
    ? {
        server: {
          port: parseInt(process.env.REMOTE_DETAIL_PORT),
          strictPort: true,
          ...proxyOptions,
          fs: {
            allow: ['./dist/mf-manifest.json', 'dist', 'src'],
          },
        },
      }
    : {}),
}))
