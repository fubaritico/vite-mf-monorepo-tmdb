import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { movieVideosHandlers } from '@vite-mf-monorepo/shared/mocks'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'

import { useMovieVideos } from './useMovieVideos'

import type { ReactNode } from 'react'

const server = setupServer(movieVideosHandlers.movieVideos)

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

describe('useMovieVideos', () => {
  it('returns loading state initially', () => {
    const { result } = renderHook(() => useMovieVideos(278), {
      wrapper: createWrapper(),
    })
    expect(result.current.isLoading).toBe(true)
  })

  it('returns movie id on success', async () => {
    const { result } = renderHook(() => useMovieVideos(278), {
      wrapper: createWrapper(),
    })
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })
    expect(result.current.data?.id).toBe(278)
  })

  it('filters for official YouTube Trailers only', async () => {
    const { result } = renderHook(() => useMovieVideos(278), {
      wrapper: createWrapper(),
    })
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })
    expect(result.current.data?.results).toBeDefined()
    expect(result.current.data?.results?.length).toBeGreaterThan(0)
    result.current.data?.results?.forEach((video) => {
      expect(video.type).toBe('Trailer')
      expect(video.site).toBe('YouTube')
      expect(video.official).toBe(true)
    })
  })

  it('excludes non-Trailer types', async () => {
    const { result } = renderHook(() => useMovieVideos(278), {
      wrapper: createWrapper(),
    })
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })
    const hasNonTrailer = result.current.data?.results?.some(
      (v) => v.type !== 'Trailer'
    )
    expect(hasNonTrailer).toBe(false)
  })

  it('limits to maximum 3 trailers', async () => {
    const { result } = renderHook(() => useMovieVideos(278), {
      wrapper: createWrapper(),
    })
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })
    expect(result.current.data?.results?.length).toBeLessThanOrEqual(3)
  })

  it('returns correct trailer key and name', async () => {
    const { result } = renderHook(() => useMovieVideos(278), {
      wrapper: createWrapper(),
    })
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })
    expect(result.current.data?.results?.[0].key).toBeDefined()
    expect(result.current.data?.results?.[0].name).toBeDefined()
  })

  it('returns error state on failure', async () => {
    server.use(movieVideosHandlers.movieVideosError)
    const { result } = renderHook(() => useMovieVideos(278), {
      wrapper: createWrapper(),
    })
    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })
    expect(result.current.error).toBeDefined()
  })
})
