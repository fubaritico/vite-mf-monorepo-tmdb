import { RootLayout } from '@vite-mf-monorepo/layouts'
import { createBrowserRouter } from 'react-router-dom'

import queryClient from './queryClient.ts'

import type { FC } from 'react'

type RouteComponent = FC & {
  loader: (qc: typeof queryClient) => () => Promise<unknown>
}

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
              import('movie/Movie') as Promise<{ default: RouteComponent }>,
              import('movie/MovieErrorBoundary') as Promise<{
                default: FC
              }>,
            ])
          return {
            Component: Movie,
            loader: Movie.loader(queryClient),
            ErrorBoundary: MovieErrorBoundary,
          }
        },
      },
    ],
  },
])

export { router, queryClient }
