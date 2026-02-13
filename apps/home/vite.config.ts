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

// Read versions from pnpm catalog (single source of truth)
const workspace = parse(readFileSync(resolve(__dirname, '../../pnpm-workspace.yaml'), 'utf-8'))
const catalog = workspace.catalog

import type { ModuleFederationOptions } from '@module-federation/vite/lib/utils/normalizeModuleFederationOptions'
import type { CommonServerOptions } from 'vite'

const remoteConfig: ModuleFederationOptions = {
  name: 'home',
  filename: 'remoteEntry.js',
  exposes: {
    './Home': './src/components/Home',
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
      target: `http://localhost:${process.env.REMOTE_HOME_PORT}`,
      changeOrigin: true,
      rewrite: () => `/@fs/${process.cwd()}/dist/@mf-types.zip`,
    },
    '/remoteEntry.js': {
      target: `http://localhost:${process.env.REMOTE_HOME_PORT}`,
      changeOrigin: true,
      rewrite: () => `/@fs/${process.cwd()}/dist/remoteEntry.js`,
    },
    '/mf-manifest.json': {
      target: `http://localhost:${process.env.REMOTE_HOME_PORT}`,
      changeOrigin: true,
      rewrite: () => `/@fs/${process.cwd()}/dist/mf-manifest.json`,
    },
  },
}

export default defineConfig(({ mode }) => {
  const isTest = process.env.VITEST === 'true'

  return {
    envDir: resolve(__dirname, '../..'),
    plugins: [
      /**
       * Generate remote.css (without preflight) for host consumption.
       * Must run before other plugins to ensure CSS is available.
       * Skip in test mode - use pre-generated CSS.
       */
      // Skip build-time plugins in test mode
      ...(isTest
        ? []
        : [
            tailwindRemoteCss({
              input: './src/remote-input.css',
              output: './src/remote.css',
              content: './src/**/*.tsx',
            }),
            federation({
              ...remoteConfig,
            }),
            cssInjectedByJsPlugin({
              relativeCSSInjection: true,
            }),
            topLevelAwait(),
            notifyHostOnHmr({
              appName: 'home',
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
            port: parseInt(process.env.REMOTE_HOME_PORT),
            strictPort: true,
            ...proxyOptions,
            fs: {
              allow: ['./dist/mf-manifest.json', 'dist', 'src'],
            },
          },
        }
      : {}),
  }
})
