import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { trendingAllOptions } from '@vite-mf-monorepo/tmdb-client'
import { describe, expect, it, vi } from 'vitest'

import { useTrending } from './useTrending'

import type { ReactNode } from 'react'

vi.mock('@vite-mf-monorepo/tmdb-client', () => ({
  trendingAllOptions: vi.fn(),
}))

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

describe('useTrending', () => {
  it('should fetch trending data successfully', async () => {
    const mockData = {
      page: 1,
      results: [
        {
          id: 1,
          title: 'Test Media',
          media_type: 'movie',
        },
      ],
      total_pages: 1,
      total_results: 1,
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    vi.mocked(trendingAllOptions).mockReturnValue({
      queryKey: ['trendingAll', { path: { time_window: 'day' } }],
      queryFn: () => mockData,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any)

    const { result } = renderHook(() => useTrending('day'), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data).toEqual(mockData)
    expect(trendingAllOptions).toHaveBeenCalledWith({
      path: { time_window: 'day' },
    })
  })

  it('should handle error state', async () => {
    const mockError = new Error('API Error')
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    vi.mocked(trendingAllOptions).mockReturnValue({
      queryKey: ['trendingAll', { path: { time_window: 'week' } }],
      queryFn: () => {
        throw mockError
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any)

    const { result } = renderHook(() => useTrending('week'), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })

    expect(result.current.error).toEqual(mockError)
  })

  it('should use correct query key for different time windows', async () => {
    const mockData = { page: 1, results: [], total_pages: 1, total_results: 0 }

    /* eslint-disable */
    vi.mocked(trendingAllOptions).mockImplementation(
      (options) =>
        ({
          queryKey: ['trendingAll', options],
          queryFn: () => mockData,
        }) as any
    )
    /* eslint-enable */

    const { result: resultDay } = renderHook(() => useTrending('day'), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(resultDay.current.isSuccess).toBe(true)
    })

    const { result: resultWeek } = renderHook(() => useTrending('week'), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(resultWeek.current.isSuccess).toBe(true)
    })

    expect(trendingAllOptions).toHaveBeenCalledWith({
      path: { time_window: 'day' },
    })
    expect(trendingAllOptions).toHaveBeenCalledWith({
      path: { time_window: 'week' },
    })
  })
})
