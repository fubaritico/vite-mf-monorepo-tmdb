import { QueryClient } from '@tanstack/react-query'
import { RootLayout } from '@vite-mf-monorepo/layouts'
import { RouteObject } from 'react-router-dom'

import Media from './components/Media.tsx'
import MediaErrorBoundary from './components/MediaErrorBoundary.tsx'

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
        element: <Media />,
        errorElement: <MediaErrorBoundary />,
      },
      {
        path: 'tv/:id',
        element: <Media />,
        errorElement: <MediaErrorBoundary />,
      },
    ],
  },
]
