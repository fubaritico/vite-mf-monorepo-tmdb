import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import {
  mockMovieDetails,
  movieDetailsHandlers,
} from '@vite-mf-monorepo/shared/mocks'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'

import { useMovieDetails } from './useMovieDetails'

import type { ReactNode } from 'react'

const server = setupServer(movieDetailsHandlers.movieDetails)

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

describe('useMovieDetails', () => {
  it('returns loading state initially', () => {
    const { result } = renderHook(() => useMovieDetails(278), {
      wrapper: createWrapper(),
    })
    expect(result.current.isLoading).toBe(true)
    expect(result.current.data).toBeUndefined()
  })

  it('returns data on success', async () => {
    const { result } = renderHook(() => useMovieDetails(278), {
      wrapper: createWrapper(),
    })
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })
    expect(result.current.data).toEqual(mockMovieDetails)
  })

  it('returns correct movie title', async () => {
    const { result } = renderHook(() => useMovieDetails(278), {
      wrapper: createWrapper(),
    })
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })
    expect(result.current.data?.title).toBe('The Shawshank Redemption')
  })

  it('returns correct movie id', async () => {
    const { result } = renderHook(() => useMovieDetails(278), {
      wrapper: createWrapper(),
    })
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })
    expect(result.current.data?.id).toBe(278)
  })

  it('returns error state on failure', async () => {
    server.use(movieDetailsHandlers.movieDetailsError)
    const { result } = renderHook(() => useMovieDetails(278), {
      wrapper: createWrapper(),
    })
    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })
    expect(result.current.error).toBeDefined()
  })
})
