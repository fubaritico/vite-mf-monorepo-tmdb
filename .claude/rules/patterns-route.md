# Route & Module Federation Patterns

## RouteComponent Template

Used for pages exposed via Module Federation AND consumed as lazy routes in the host.
The `loader` static method enables `queryClient.ensureQueryData` for prefetching.

```typescript
import { QueryClient, useQuery } from '@tanstack/react-query'
import { endpointOptions } from '@fubar-it-co/tmdb-client'
import { useLoaderData } from 'react-router-dom'

import type { ResponseType } from '@fubar-it-co/tmdb-client'
import type { LoaderFunctionArgs } from 'react-router-dom'
import type { FC } from 'react'

import '../remote.css'

export type RouteComponent = FC & {
  loader: (queryClient: QueryClient) => (args: LoaderFunctionArgs) => Promise<ResponseType>
}

// Without params (e.g., Home — index route):
const loaderNoParams = (queryClient: QueryClient) => async () => {
  return queryClient.ensureQueryData(endpointOptions())
}

// With URL params (e.g., Photos — /movie/:id/photos/:index):
const loaderWithParams = (queryClient: QueryClient) => async ({ params }: LoaderFunctionArgs) => {
  return queryClient.ensureQueryData(endpointOptions({ path: { movie_id: params.id } }))
}

const Component: RouteComponent = () => {
  const initialData = useLoaderData<ResponseType>()

  const { data, error } = useQuery({
    ...endpointOptions(),
    initialData,
  })

  if (error) return <div>{error.message}</div>

  return <div>{/* render */}</div>
}

Component.loader = loaderWithParams  // or loaderNoParams
export default Component
```

## Standalone Router File (`src/router.tsx`)

Always a dedicated file, never inline in `main.tsx`:

```typescript
import { QueryClient } from '@tanstack/react-query'
import { createBrowserRouter } from 'react-router-dom'

import Component from './components/Component'

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

export const router = createBrowserRouter([
  {
    path: '/some-path/:id',
    element: <Component />,
    loader: Component.loader(queryClient),
  },
])
```

## Host Integration — Standard Page (lazy + loader)

```typescript
// apps/host/src/router.tsx
import type { RouteComponent } from 'remote/Component'

{
  path: 'some-path/:id',
  async lazy() {
    const { default: Component } = (await import('remote/Component')) as {
      default: RouteComponent
    }
    return { Component, loader: Component.loader(queryClient) }
  },
}
```

## Host Integration — Modal Overlay as Nested Child Route

Modal overlays sitting on top of a parent page (e.g., `/movie/:id/photos/:index` over `/movie/:id`)
must be declared as **children of the parent route**, not as siblings. This way:
- React Router keeps the parent (Media) mounted in the background
- The child renders via `<Outlet />` in the parent
- `<dialog>` top-layer covers everything — no background location state needed

```typescript
// apps/host/src/router.tsx
{
  path: 'movie/:id',
  async lazy() { /* Media */ },
  children: [
    {
      path: 'photos/:index',   // inherits :id from parent
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
  async lazy() { /* Media */ },
  children: [
    {
      path: 'photos/:index',
      async lazy() { /* same Photos lazy */ },
    },
  ],
},
```

The parent (Media) must render `<Outlet />` — Photos' `<dialog>` is fullscreen top-layer so
placement is invisible to the user.

## Module Federation Config

**Remote** (`vite.config.ts`):
```typescript
{
  name: 'remote-name',
  exposes: {
    './Component': './src/components/Component',
    './routes': './src/routes',
  },
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
    'react-router-dom': { singleton: true },
    '@tanstack/react-query': { singleton: true },
  },
}
```

**Bootstrap pattern** (`main.tsx`):
```typescript
await import('./bootstrap')
```
Never put app logic directly in `main.tsx`.
