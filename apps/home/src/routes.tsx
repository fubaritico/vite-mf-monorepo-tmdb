import { QueryClient } from '@tanstack/react-query'
import { RouteObject } from 'react-router-dom'

import App from './App'
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
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: Home.loader(queryClient),
      },
    ],
  },
]
