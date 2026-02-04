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
          // Lazy load the List component from the 'list' remote
          const { default: List } = (await import('list/List')) as {
            default: RouteComponent
          }
          return { Component: List, loader: List.loader(queryClient) }
        },
      },
      {
        path: 'detail/:id',
        async lazy() {
          // Lazy load the Detail component from the 'detail' remote
          const { default: Detail } = (await import('detail/Detail')) as {
            default: RouteComponent
          }
          return { Component: Detail, loader: Detail.loader(queryClient) }
        },
      },
    ],
  },
])

export { router, queryClient }
