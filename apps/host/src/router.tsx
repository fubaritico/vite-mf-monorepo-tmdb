import * as Sentry from '@sentry/react'
import { RootLayout } from '@vite-mf-monorepo/layouts'
import { createBrowserRouter } from 'react-router-dom'

import { HeaderSearch } from './components/HeaderSearch'
import queryClient from './queryClient.ts'

const sentryCreateBrowserRouter =
  Sentry.wrapCreateBrowserRouterV7(createBrowserRouter)

const router = sentryCreateBrowserRouter([
  {
    element: (
      <RootLayout
        projectUrl="https://github.com/fubaritico/vite-mf-monorepo-tmdb"
        headerChildren={<HeaderSearch />}
      />
    ),
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
              const [{ default: Photos }, { default: PhotosErrorBoundary }] =
                await Promise.all([
                  import('photos/Photos'),
                  import('photos/PhotosErrorBoundary'),
                ])
              return {
                Component: Photos,
                ErrorBoundary: PhotosErrorBoundary,
              }
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
              const [{ default: Photos }, { default: PhotosErrorBoundary }] =
                await Promise.all([
                  import('photos/Photos'),
                  import('photos/PhotosErrorBoundary'),
                ])
              return {
                Component: Photos,
                ErrorBoundary: PhotosErrorBoundary,
              }
            },
          },
        ],
      },
      {
        path: 'search/:query',
        async lazy() {
          const { default: Search } = await import('search/Search')
          return { Component: Search }
        },
      },
    ],
  },
])

export { router, queryClient }
