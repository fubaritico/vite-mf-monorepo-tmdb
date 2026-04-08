import { readFileSync } from 'fs'
import { resolve } from 'path'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import topLevelAwait from 'vite-plugin-top-level-await'
import { federation } from '@module-federation/vite'
import { sentryVitePlugin } from '@sentry/vite-plugin'
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
  name: 'search',
  filename: 'remoteEntry.js',
  exposes: {
    './Search': './src/components/Search',
    './SearchTypeahead': './src/components/SearchTypeahead/SearchTypeahead',
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
      target: `http://localhost:${process.env.REMOTE_SEARCH_PORT}`,
      changeOrigin: true,
      rewrite: () => `/@fs/${process.cwd()}/dist/@mf-types.zip`,
    },
    '/remoteEntry.js': {
      target: `http://localhost:${process.env.REMOTE_SEARCH_PORT}`,
      changeOrigin: true,
      rewrite: () => `/@fs/${process.cwd()}/dist/remoteEntry.js`,
    },
    '/mf-manifest.json': {
      target: `http://localhost:${process.env.REMOTE_SEARCH_PORT}`,
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
              appName: 'search',
              hostUrl: `http://localhost:${process.env.HOST_PORT}`,
              endpoint: '/on-child-rebuild',
            }),
            ...(process.env.NODE_ENV === 'production' && process.env.SENTRY_AUTH_TOKEN
              ? [
                  sentryVitePlugin({
                    org: process.env.SENTRY_ORG,
                    project: process.env.SENTRY_PROJECT,
                    authToken: process.env.SENTRY_AUTH_TOKEN,
                    release: { name: `search@${process.env.VITE_GIT_SHA ?? 'local'}` },
                    sourcemaps: {
                      assets: './dist/**',
                      filesToDeleteAfterUpload: './dist/**/*.map',
                    },
                    telemetry: false,
                  }),
                ]
              : []),
          ]),
      tailwindcss(),
      react(),
    ],
    build: {
      modulePreload: false,
      target: 'esnext',
      sourcemap: 'hidden',
      minify: 'esbuild',
      esbuild: {
        minifyIdentifiers: true,
        minifySyntax: true,
        minifyWhitespace: true,
        pure: ['console.log'],
        legalComments: 'none',
      },
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
            port: parseInt(process.env.REMOTE_SEARCH_PORT),
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
