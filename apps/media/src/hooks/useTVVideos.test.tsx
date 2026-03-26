import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { tvSeriesVideosHandlers } from '@vite-mf-monorepo/shared/mocks'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'

import { useTVVideos } from './useTVVideos'

import type { ReactNode } from 'react'

const server = setupServer(tvSeriesVideosHandlers.tvSeriesVideos)

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

describe('useTVVideos', () => {
  it('returns loading state initially', () => {
    const { result } = renderHook(() => useTVVideos(1396), {
      wrapper: createWrapper(),
    })
    expect(result.current.isLoading).toBe(true)
  })

  it('returns tv series id on success', async () => {
    const { result } = renderHook(() => useTVVideos(1396), {
      wrapper: createWrapper(),
    })
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })
    expect(result.current.data?.id).toBe(1396)
  })

  it('filters for official YouTube Trailers only', async () => {
    const { result } = renderHook(() => useTVVideos(1396), {
      wrapper: createWrapper(),
    })
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })
    expect(result.current.data?.results).toBeDefined()
    result.current.data?.results?.forEach((video) => {
      expect(video.type).toBe('Trailer')
      expect(video.site).toBe('YouTube')
      expect(video.official).toBe(true)
    })
  })

  it('limits to maximum 3 trailers', async () => {
    const { result } = renderHook(() => useTVVideos(1396), {
      wrapper: createWrapper(),
    })
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })
    expect(result.current.data?.results?.length).toBeLessThanOrEqual(3)
  })

  it('returns error state on failure', async () => {
    server.use(tvSeriesVideosHandlers.tvSeriesVideosError)
    const { result } = renderHook(() => useTVVideos(1396), {
      wrapper: createWrapper(),
    })
    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })
    expect(result.current.error).toBeDefined()
  })
})
