import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import {
  mockMovieSimilar,
  movieSimilarHandlers,
} from '@vite-mf-monorepo/shared/mocks'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'

import { useMovieSimilar } from './useMovieSimilar'

import type { ReactNode } from 'react'

const server = setupServer(movieSimilarHandlers.movieSimilar)

beforeAll(() => {
  server.listen()
})
afterEach(() => {
  server.resetHandlers()
})
afterAll(() => {
  server.close()
})

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

describe('useMovieSimilar', () => {
  it('returns loading state initially', () => {
    const { result } = renderHook(() => useMovieSimilar(278), {
      wrapper: createWrapper(),
    })
    expect(result.current.isLoading).toBe(true)
  })

  it('returns data on success', async () => {
    const { result } = renderHook(() => useMovieSimilar(278), {
      wrapper: createWrapper(),
    })
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })
    expect(result.current.data).toEqual(mockMovieSimilar)
  })

  it('returns pagination data', async () => {
    const { result } = renderHook(() => useMovieSimilar(278), {
      wrapper: createWrapper(),
    })
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })
    expect(result.current.data?.page).toBeDefined()
    expect(result.current.data?.results).toBeDefined()
    expect(result.current.data?.total_pages).toBeDefined()
  })

  it('returns first similar movie with title', async () => {
    const { result } = renderHook(() => useMovieSimilar(278), {
      wrapper: createWrapper(),
    })
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })
    expect(result.current.data?.results?.[0].title).toBeDefined()
    expect(result.current.data?.results?.[0].id).toBeDefined()
  })

  it('returns error state on failure', async () => {
    server.use(movieSimilarHandlers.movieSimilarError)
    const { result } = renderHook(() => useMovieSimilar(278), {
      wrapper: createWrapper(),
    })
    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })
    expect(result.current.error).toBeDefined()
  })
})
