import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'

import Home from '../components/Home.tsx'

import { ReactQueryWrapper } from './react-query'

import type { RenderOptions } from '@testing-library/react'

/**
 * Renders a component with a router provider (v7), One route config
 *
 * @param routes - the route to match as declared in the router configuration
 * @param path - the path to navigate to, supposed to match the route
 * @param options - additional options to pass to the render method
 */
export const renderWithRouter = (
  routes: string | string[] = '',
  path: string | string[] = '/',
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  const router = createMemoryRouter(
    Array.isArray(routes)
      ? routes.map((route) => ({
          path: route,
          element: <Home />,
        }))
      : [
          {
            path: routes,
            element: <Home />,
          },
        ],
    {
      initialEntries: Array.isArray(path) ? path : [path],
    }
  )
  return render(<RouterProvider router={router} />, {
    ...options,
  })
}

/**
 *
 * @param routes - the route to match as declared in the router configuration
 * @param path - the path to navigate to, supposed to match the route
 * @param options - additional options to pass to the render method
 */
export const renderReactQueryWithRouter = (
  routes: string | string[] = '',
  path: string | string[] = '/',
  options?: RenderOptions
) => {
  return renderWithRouter(routes, path, {
    wrapper: ReactQueryWrapper,
    ...options,
  })
}

/**
 * Renders a component with router and react-query providers
 * @param component - the component to render
 * @param route - the route path (default '/')
 * @param queryClient - optional QueryClient instance for custom configuration
 */
export const renderComponentWithRouter = (
  component: React.ReactElement,
  route = '/',
  queryClient?: QueryClient
) => {
  const router = createMemoryRouter(
    [
      {
        path: route,
        element: component,
      },
    ],
    {
      initialEntries: [route],
    }
  )

  const Wrapper = queryClient
    ? ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      )
    : ReactQueryWrapper

  return render(
    <Wrapper>
      <RouterProvider router={router} />
    </Wrapper>
  )
}
