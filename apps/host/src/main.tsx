import { createInstance } from '@module-federation/runtime'
import { QueryClientProvider } from '@tanstack/react-query'
import { checkRemoteHealth } from '@vite-mf-monorepo/shared'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import './index.css'

import ErrorBoundary from './components/ErrorBoundary'
import { queryClient, router } from './router'

const HOME_REMOTE_URL = `http://localhost:${import.meta.env.VITE_REMOTE_HOME_PORT as string}/health`
const MOVIE_REMOTE_URL = `http://localhost:${import.meta.env.VITE_REMOTE_MOVIE_PORT as string}/health`

// Initialize module federation runtime
createInstance({
  name: 'host',
  remotes: [
    {
      name: 'home',
      alias: 'home',
      entry: `http://localhost:${import.meta.env.VITE_REMOTE_HOME_PORT as string}/remoteEntry.js`,
    },
    {
      name: 'movie',
      alias: 'movie',
      entry: `http://localhost:${import.meta.env.VITE_REMOTE_MOVIE_PORT as string}/remoteEntry.js`,
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

async function bootstrap() {
  const root = document.getElementById('root')
  if (!root) {
    throw new Error('root not found')
  }

  try {
    // Check health of remote applications
    const [homeHealthy, movieHealthy] = await Promise.all([
      checkRemoteHealth(HOME_REMOTE_URL),
      checkRemoteHealth(MOVIE_REMOTE_URL),
    ])

    if (!homeHealthy || !movieHealthy) {
      throw new Error('Remote applications are not healthy')
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
  } catch (error) {
    console.error('Failed to bootstrap application:', error)
    createRoot(root).render(
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Application Error</h1>
        <p>
          We're having trouble loading the application. Please try again later.
        </p>
        <button
          onClick={() => {
            window.location.reload()
          }}
        >
          Retry
        </button>
      </div>
    )
  }
}

void bootstrap()
