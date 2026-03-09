import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import {
  mockMovieCredits,
  movieCreditsHandlers,
} from '@vite-mf-monorepo/shared/mocks'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'

import { useMovieCredits } from './useMovieCredits'

import type { ReactNode } from 'react'

const server = setupServer(movieCreditsHandlers.movieCredits)

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

describe('useMovieCredits', () => {
  it('returns loading state initially', () => {
    const { result } = renderHook(() => useMovieCredits(278), {
      wrapper: createWrapper(),
    })
    expect(result.current.isLoading).toBe(true)
  })

  it('returns data on success', async () => {
    const { result } = renderHook(() => useMovieCredits(278), {
      wrapper: createWrapper(),
    })
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })
    expect(result.current.data).toEqual(mockMovieCredits)
  })

  it('returns cast with character information', async () => {
    const { result } = renderHook(() => useMovieCredits(278), {
      wrapper: createWrapper(),
    })
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })
    expect(result.current.data?.cast?.[0].character).toBe('Andy Dufresne')
  })

  it('returns crew with director', async () => {
    const { result } = renderHook(() => useMovieCredits(278), {
      wrapper: createWrapper(),
    })
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })
    const director = result.current.data?.crew?.find(
      (c) => c.job === 'Director'
    )
    expect(director).toBeDefined()
    expect(director?.name).toBe('Frank Darabont')
  })

  it('returns error state on failure', async () => {
    server.use(movieCreditsHandlers.movieCreditsError)
    const { result } = renderHook(() => useMovieCredits(278), {
      wrapper: createWrapper(),
    })
    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })
    expect(result.current.error).toBeDefined()
  })
})
