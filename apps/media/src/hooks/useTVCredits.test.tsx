import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import {
  mockTVSeriesCredits,
  tvSeriesCreditsHandlers,
} from '@vite-mf-monorepo/shared/mocks'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'

import { useTVCredits } from './useTVCredits'

import type { ReactNode } from 'react'

const server = setupServer(tvSeriesCreditsHandlers.tvSeriesCredits)

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

describe('useTVCredits', () => {
  it('returns loading state initially', () => {
    const { result } = renderHook(() => useTVCredits(1396), {
      wrapper: createWrapper(),
    })
    expect(result.current.isLoading).toBe(true)
  })

  it('returns data on success', async () => {
    const { result } = renderHook(() => useTVCredits(1396), {
      wrapper: createWrapper(),
    })
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })
    expect(result.current.data).toEqual(mockTVSeriesCredits)
  })

  it('returns cast with character information', async () => {
    const { result } = renderHook(() => useTVCredits(1396), {
      wrapper: createWrapper(),
    })
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })
    expect(result.current.data?.cast?.[0].character).toBe('Walter White')
  })

  it('returns error state on failure', async () => {
    server.use(tvSeriesCreditsHandlers.tvSeriesCreditsError)
    const { result } = renderHook(() => useTVCredits(1396), {
      wrapper: createWrapper(),
    })
    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })
    expect(result.current.error).toBeDefined()
  })
})
