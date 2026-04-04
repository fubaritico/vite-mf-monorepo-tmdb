import { QueryClient } from '@tanstack/react-query'
import { RootLayout } from '@vite-mf-monorepo/layouts'

import Search from './components/Search'

import type { RouteObject } from 'react-router-dom'

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
    element: (
      <RootLayout projectUrl="https://github.com/fubaritico/vite-mf-monorepo-tmdb" />
    ),
    children: [
      {
        path: '/search',
        element: <Search />,
      },
    ],
  },
]
