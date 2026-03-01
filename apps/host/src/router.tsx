import { RootLayout } from '@vite-mf-monorepo/layouts'
import { createBrowserRouter } from 'react-router-dom'

import queryClient from './queryClient.ts'

import type { QueryClient } from '@tanstack/react-query'
import type { FC } from 'react'
import type { LoaderFunctionArgs } from 'react-router-dom'

type RouteComponent = FC & {
  loader: (
    queryClient: QueryClient
  ) => (args: LoaderFunctionArgs) => Promise<unknown>
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
          const [{ default: Media }, { default: MediaErrorBoundary }] =
            await Promise.all([
              import('media/Media'),
              import('media/MediaErrorBoundary'),
            ])
          return {
            Component: Media,
            ErrorBoundary: MediaErrorBoundary,
          }
        },
        children: [
          {
            path: 'photos/:index',
            async lazy() {
              const { default: Photos } = (await import('photos/Photos')) as {
                default: RouteComponent
              }
              return { Component: Photos, loader: Photos.loader(queryClient) }
            },
          },
        ],
      },
      {
        path: 'tv/:id',
        async lazy() {
          const [{ default: Media }, { default: MediaErrorBoundary }] =
            await Promise.all([
              import('media/Media'),
              import('media/MediaErrorBoundary'),
            ])
          return {
            Component: Media,
            ErrorBoundary: MediaErrorBoundary,
          }
        },
        children: [
          {
            path: 'photos/:index',
            async lazy() {
              const { default: Photos } = (await import('photos/Photos')) as {
                default: RouteComponent
              }
              return { Component: Photos, loader: Photos.loader(queryClient) }
            },
          },
        ],
      },
    ],
  },
])

export { router, queryClient }
