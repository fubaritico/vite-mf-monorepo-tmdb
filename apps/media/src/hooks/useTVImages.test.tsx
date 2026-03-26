import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import {
  mockTVSeriesImages,
  tvSeriesImagesHandlers,
} from '@vite-mf-monorepo/shared/mocks'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'

import { useTVImages } from './useTVImages'

import type { ReactNode } from 'react'

const server = setupServer(tvSeriesImagesHandlers.tvSeriesImages)

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

describe('useTVImages', () => {
  it('returns loading state initially', () => {
    const { result } = renderHook(() => useTVImages(1396), {
      wrapper: createWrapper(),
    })
    expect(result.current.isLoading).toBe(true)
  })

  it('returns data on success', async () => {
    const { result } = renderHook(() => useTVImages(1396), {
      wrapper: createWrapper(),
    })
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })
    expect(result.current.data).toEqual(mockTVSeriesImages)
  })

  it('returns backdrops with file paths', async () => {
    const { result } = renderHook(() => useTVImages(1396), {
      wrapper: createWrapper(),
    })
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })
    expect(result.current.data?.backdrops?.length).toBe(5)
    expect(result.current.data?.backdrops?.[0].file_path).toBeDefined()
  })

  it('returns error state on failure', async () => {
    server.use(tvSeriesImagesHandlers.tvSeriesImagesError)
    const { result } = renderHook(() => useTVImages(1396), {
      wrapper: createWrapper(),
    })
    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })
    expect(result.current.error).toBeDefined()
  })
})
