import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import {
  mockMovieImages,
  movieImagesHandlers,
} from '@vite-mf-monorepo/shared/mocks'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'

import { useMovieImages } from './useMovieImages'

import type { ReactNode } from 'react'

const server = setupServer(movieImagesHandlers.movieImages)

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

describe('useMovieImages', () => {
  it('returns loading state initially', () => {
    const { result } = renderHook(() => useMovieImages(278), {
      wrapper: createWrapper(),
    })
    expect(result.current.isLoading).toBe(true)
  })

  it('returns data on success', async () => {
    const { result } = renderHook(() => useMovieImages(278), {
      wrapper: createWrapper(),
    })
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })
    expect(result.current.data).toEqual(mockMovieImages)
  })

  it('returns correct movie id', async () => {
    const { result } = renderHook(() => useMovieImages(278), {
      wrapper: createWrapper(),
    })
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })
    expect(result.current.data?.id).toBe(278)
  })

  it('returns backdrops', async () => {
    const { result } = renderHook(() => useMovieImages(278), {
      wrapper: createWrapper(),
    })
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })
    expect(result.current.data?.backdrops).toBeDefined()
    expect(result.current.data?.backdrops.length).toBeGreaterThan(0)
  })

  it('returns first backdrop with file path and dimensions', async () => {
    const { result } = renderHook(() => useMovieImages(278), {
      wrapper: createWrapper(),
    })
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })
    const backdrop = result.current.data?.backdrops[0]
    expect(backdrop?.file_path).toBeDefined()
    expect(backdrop?.width).toBeDefined()
    expect(backdrop?.height).toBeDefined()
  })

  it('returns error state on failure', async () => {
    server.use(movieImagesHandlers.movieImagesError)
    const { result } = renderHook(() => useMovieImages(278), {
      wrapper: createWrapper(),
    })
    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })
    expect(result.current.error).toBeDefined()
  })
})
