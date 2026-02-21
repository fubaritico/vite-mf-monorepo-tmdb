import { QueryClient } from '@tanstack/react-query'
import { RootLayout } from '@vite-mf-monorepo/layouts'
import { RouteObject } from 'react-router-dom'

import Home from './components/Home'

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
        path: '/',
        element: <Home />,
        loader: Home.loader(queryClient),
      },
    ],
  },
]
