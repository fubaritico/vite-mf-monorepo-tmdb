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
          const [{ default: Movie }, { default: MovieErrorBoundary }] =
            await Promise.all([
              import('movie/Movie'),
              import('movie/MovieErrorBoundary'),
            ])
          return {
            Component: Movie,
            ErrorBoundary: MovieErrorBoundary,
          }
        },
      },
    ],
  },
])

export { router, queryClient }
