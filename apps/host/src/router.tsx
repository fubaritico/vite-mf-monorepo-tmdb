// Define the routes with lazy loading
import { createBrowserRouter } from 'react-router-dom'

import App from './App.tsx'
import queryClient from './queryClient.ts'

import type { FC } from 'react'

type RouteComponent = FC & {
  loader: (qc: typeof queryClient) => () => Promise<unknown>
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        async lazy() {
          // Lazy load the Home component from the 'home' remote
          const { default: Home } = (await import('home/Home')) as {
            default: RouteComponent
          }
          return { Component: Home, loader: Home.loader(queryClient) }
        },
      },
      {
        path: 'movie/:id',
        async lazy() {
          // Lazy load the Movie component and ErrorBoundary from the 'movie' remote
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
