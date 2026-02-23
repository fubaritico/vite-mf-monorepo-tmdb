import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import {
  mockPopularMovies,
  popularHandlers,
} from '@vite-mf-monorepo/shared/mocks'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'

import { usePopularMovies } from './usePopularMovies'

import type { ReactNode } from 'react'

const server = setupServer(popularHandlers.popularMovies)

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
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
  return Wrapper
}

describe('usePopularMovies', () => {
  it('should fetch popular movies', async () => {
    const { result } = renderHook(() => usePopularMovies(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data).toEqual(mockPopularMovies)
  })

  it('should handle loading state', () => {
    const { result } = renderHook(() => usePopularMovies(), {
      wrapper: createWrapper(),
    })

    expect(result.current.isLoading).toBe(true)
  })
})
