import { RootLayout } from '@vite-mf-monorepo/layouts'
import { createBrowserRouter } from 'react-router-dom'

import queryClient from './queryClient.ts'

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        async lazy() {
          const { default: Home } = await import('home/Home')
          return { Component: Home }
        },
      },
      {
        path: 'movie/:id',
        async lazy() {
          const [{ default: Media }, { default: MediaErrorBoundary }] =
            await Promise.all([
              import('media/Media'),
              import('media/MediaErrorBoundary'),
            ])
          return {
            Component: Media,
            ErrorBoundary: MediaErrorBoundary,
          }
        },
      },
      {
        path: 'tv/:id',
        async lazy() {
          const [{ default: Media }, { default: MediaErrorBoundary }] =
            await Promise.all([
              import('media/Media'),
              import('media/MediaErrorBoundary'),
            ])
          return {
            Component: Media,
            ErrorBoundary: MediaErrorBoundary,
          }
        },
      },
    ],
  },
])

export { router, queryClient }
