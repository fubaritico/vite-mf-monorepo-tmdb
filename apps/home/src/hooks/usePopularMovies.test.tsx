import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { HttpResponse, http } from 'msw'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'

import { usePopularMovies } from './usePopularMovies'

import type { ReactNode } from 'react'

const mockMovies = {
  page: 1,
  results: [{ id: 1, title: 'Test Movie' }],
  total_pages: 1,
  total_results: 1,
}

const server = setupServer(
  http.get('https://api.themoviedb.org/3/movie/popular', () => {
    return HttpResponse.json(mockMovies)
  })
)

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

    expect(result.current.data).toEqual(mockMovies)
  })

  it('should handle loading state', () => {
    const { result } = renderHook(() => usePopularMovies(), {
      wrapper: createWrapper(),
    })

    expect(result.current.isLoading).toBe(true)
  })
})
