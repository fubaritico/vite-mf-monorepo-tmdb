import { createInstance } from '@module-federation/runtime'
import { QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import './index.css'

import ErrorBoundary from './components/ErrorBoundary'
import { queryClient, router } from './router'

// Initialize module federation runtime
createInstance({
  name: 'host',
  remotes: [
    {
      name: 'list',
      alias: 'list',
      entry: `http://localhost:${import.meta.env.VITE_REMOTE_LIST_PORT as string}/remoteEntry.js`,
    },
    {
      name: 'detail',
      alias: 'detail',
      entry: `http://localhost:${import.meta.env.VITE_REMOTE_DETAIL_PORT as string}/remoteEntry.js`,
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

createRoot(root).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </QueryClientProvider>
  </StrictMode>
)
