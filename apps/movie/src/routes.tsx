import { QueryClient } from '@tanstack/react-query'
import { RouteObject } from 'react-router-dom'

import App from './App'
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
    path: '/',
    element: <App />,
    children: [
      {
        path: 'movie/:id',
        element: <Movie />,
        loader: Movie.loader(queryClient),
        errorElement: <MovieErrorBoundary />,
      },
    ],
  },
]
