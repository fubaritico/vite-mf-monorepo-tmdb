import { searchMultiOptions } from '@fubar-it-co/tmdb-client'
import { renderHook, waitFor } from '@testing-library/react'
import { ReactQueryWrapper } from '@vite-mf-monorepo/shared/test-utils'
import { HttpResponse, http } from 'msw'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'

import { useSearchMulti } from './useSearchMulti'

const mockResponse = {
  page: 1,
  results: [
    {
      id: 550,
      title: 'Fight Club',
      media_type: 'movie',
      release_date: '1999-10-15',
    },
    {
      id: 287,
      name: 'Brad Pitt',
      media_type: 'person',
      known_for_department: 'Acting',
    },
  ],
  total_pages: 1,
  total_results: 2,
}

const server = setupServer(
  http.get('*/3/search/multi', () => {
    return HttpResponse.json(mockResponse)
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

describe('useSearchMulti', () => {
  it('should not fetch when query is less than 2 characters', () => {
    const { result } = renderHook(() => useSearchMulti('a'), {
      wrapper: ReactQueryWrapper,
    })

    expect(result.current.data).toBeUndefined()
    expect(result.current.fetchStatus).toBe('idle')
  })

  it('should not fetch when query is empty', () => {
    const { result } = renderHook(() => useSearchMulti(''), {
      wrapper: ReactQueryWrapper,
    })

    expect(result.current.data).toBeUndefined()
    expect(result.current.fetchStatus).toBe('idle')
  })

  it('should fetch when query has 2 or more characters', async () => {
    const { result } = renderHook(() => useSearchMulti('brad'), {
      wrapper: ReactQueryWrapper,
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data?.results).toHaveLength(2)
    expect(result.current.data?.results?.[0]?.title).toBe('Fight Club')
  })

  it('should use searchMultiOptions query key', () => {
    const options = searchMultiOptions({ query: { query: 'test' } })

    expect(options.queryKey).toBeDefined()
  })

  it('should have staleTime of 5 minutes', async () => {
    const { result } = renderHook(() => useSearchMulti('brad'), {
      wrapper: ReactQueryWrapper,
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.isStale).toBe(false)
  })
})
