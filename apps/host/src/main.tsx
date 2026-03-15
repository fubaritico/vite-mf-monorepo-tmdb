import './instrument'

import { createInstance } from '@module-federation/runtime'
import * as Sentry from '@sentry/react'
import { QueryClientProvider } from '@tanstack/react-query'
// import { checkRemoteHealth } from '@vite-mf-monorepo/shared'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import './index.css'

import { queryClient, router } from './router'

// const HOME_REMOTE_URL = `${import.meta.env.VITE_HOME_URL as string}/health`
// const MOVIE_REMOTE_URL = `${import.meta.env.VITE_MEDIA_URL as string}/health`

// Initialize module federation runtime
createInstance({
  name: 'host',
  remotes: [
    {
      name: 'home',
      alias: 'home',
      entry: `${import.meta.env.VITE_HOME_URL as string}/remoteEntry.js`,
    },
    {
      name: 'media',
      alias: 'media',
      entry: `${import.meta.env.VITE_MEDIA_URL as string}/remoteEntry.js`,
    },
    {
      name: 'photos',
      alias: 'photos',
      entry: `${import.meta.env.VITE_PHOTOS_URL as string}/remoteEntry.js`,
    },
  ],
  /* eslint-disable @typescript-eslint/dot-notation -- consistent bracket notation for all keys */
  shared: {
    react: [
      {
        version: __MF_VERSIONS__['react'],
        scope: 'default',
        shareConfig: {
          singleton: true,
          eager: true,
          requiredVersion: __MF_VERSIONS__['react'],
        },
      },
    ],
    'react-dom': [
      {
        version: __MF_VERSIONS__['react-dom'],
        scope: 'default',
        shareConfig: {
          singleton: true,
          eager: true,
          requiredVersion: __MF_VERSIONS__['react-dom'],
        },
      },
    ],
    'react-router-dom': [
      {
        version: __MF_VERSIONS__['react-router-dom'],
        scope: 'default',
        shareConfig: {
          singleton: true,
          eager: true,
          requiredVersion: __MF_VERSIONS__['react-router-dom'],
        },
      },
    ],
    '@tanstack/react-query': [
      {
        version: __MF_VERSIONS__['@tanstack/react-query'],
        scope: 'default',
        shareConfig: {
          singleton: true,
          eager: true,
          requiredVersion: __MF_VERSIONS__['@tanstack/react-query'],
        },
      },
    ],
  },
  /* eslint-enable @typescript-eslint/dot-notation */
})

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
      <Sentry.ErrorBoundary fallback={<div>Something went wrong</div>}>
        <RouterProvider router={router} />
      </Sentry.ErrorBoundary>
    </QueryClientProvider>
  </StrictMode>
)
