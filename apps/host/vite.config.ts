import { readFileSync } from 'fs'
import { resolve } from 'path'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite'
import dotenv from 'dotenv'
import { parse } from 'yaml'

dotenv.config()

// Read versions from pnpm catalog (single source of truth)
const workspace = parse(readFileSync(resolve(__dirname, '../../pnpm-workspace.yaml'), 'utf-8'))
const catalog = workspace.catalog

const moduleFederationConfig = {
  name: 'host',
  exposes: {},
  filename: 'remoteEntry.js',
  remotes: {
    list: `list@http://localhost:${process.env.REMOTE_LIST_PORT}/mf-manifest.json`,
    detail: `detail@http://localhost:${process.env.REMOTE_DETAIL_PORT}/mf-manifest.json`,
  },
  shared: ['react', 'react-dom', 'react-router-dom'],
}

const moduleFederationConfig2 = {
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
  dts: false,
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
      federation(moduleFederationConfig2),
      react(),
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
