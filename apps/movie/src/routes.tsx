import { QueryClient } from '@tanstack/react-query'
import { RootLayout } from '@vite-mf-monorepo/layouts'
import { RouteObject } from 'react-router-dom'

import Movie from './components/Movie'
import MovieErrorBoundary from './components/MovieErrorBoundary'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
  },
})

export const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    children: [
      {
        path: 'movie/:id',
        element: <Movie />,
        errorElement: <MovieErrorBoundary />,
      },
      {
        path: 'tv/:id',
        element: <Movie />,
        errorElement: <MovieErrorBoundary />,
      },
    ],
  },
]
