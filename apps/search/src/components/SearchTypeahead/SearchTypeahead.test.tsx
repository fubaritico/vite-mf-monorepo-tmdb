import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderReactQueryWithRouter } from '@vite-mf-monorepo/shared/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { useSearchMulti } from '../../hooks/useSearchMulti'

import SearchTypeahead from './SearchTypeahead'

import type { SearchMultiResponse } from '@fubar-it-co/tmdb-client'
import type { UseQueryResult } from '@tanstack/react-query'

vi.mock('../../hooks/useSearchMulti', () => ({
  useSearchMulti: vi.fn(),
}))

vi.mock('../../remote.css', () => ({}))

vi.mock('@vite-mf-monorepo/shared', () => ({
  useIsMobile: vi.fn(() => false),
}))

const mockResults: NonNullable<SearchMultiResponse['results']> = [
  {
    id: 550,
    title: 'Fight Club',
    media_type: 'movie',
    release_date: '1999-10-15',
  },
  {
    id: 1396,
    name: 'Breaking Bad',
    media_type: 'tv',
  },
  {
    id: 287,
    name: 'Brad Pitt',
    media_type: 'person',
  },
]

const mockData: SearchMultiResponse = {
  results: mockResults,
  page: 1,
  total_pages: 1,
  total_results: 3,
}

const mockQueryResult = (
  overrides: Partial<UseQueryResult<SearchMultiResponse>> = {}
): UseQueryResult<SearchMultiResponse> =>
  ({
    data: undefined,
    error: null,
    isError: false,
    isLoading: false,
    isPending: false,
    isSuccess: false,
    status: 'pending',
    fetchStatus: 'idle',
    refetch: vi.fn(),
    ...overrides,
  }) as unknown as UseQueryResult<SearchMultiResponse>

const withData = (data: SearchMultiResponse = mockData) =>
  mockQueryResult({
    data,
    isSuccess: true,
    status: 'success',
  })

const renderAndType = async (query = 'test') => {
  const user = userEvent.setup()
  renderReactQueryWithRouter(<SearchTypeahead />, '/', '/')
  const input = screen.getByPlaceholderText('Search...')
  await user.type(input, query)
  return { user, input }
}

describe('SearchTypeahead', () => {
  it('should render the search input', () => {
    vi.mocked(useSearchMulti).mockReturnValue(mockQueryResult())

    renderReactQueryWithRouter(<SearchTypeahead />, '/', '/')

    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
  })

  it('should display movie results', async () => {
    vi.mocked(useSearchMulti).mockReturnValue(withData())

    await renderAndType()

    expect(screen.getByText('Movies')).toBeInTheDocument()
    expect(screen.getByText('Fight Club')).toBeInTheDocument()
  })

  it('should display TV show results', async () => {
    vi.mocked(useSearchMulti).mockReturnValue(withData())

    await renderAndType()

    expect(screen.getByText('TV Shows')).toBeInTheDocument()
    expect(screen.getByText('Breaking Bad')).toBeInTheDocument()
  })

  it('should display person results', async () => {
    vi.mocked(useSearchMulti).mockReturnValue(withData())

    await renderAndType()

    expect(screen.getByText('People')).toBeInTheDocument()
    expect(screen.getByText('Brad Pitt')).toBeInTheDocument()
  })

  it('should display person department', async () => {
    const resultsWithDept = [
      {
        id: 287,
        name: 'Brad Pitt',
        media_type: 'person' as const,
        known_for_department: 'Acting',
      },
    ]

    vi.mocked(useSearchMulti).mockReturnValue(
      withData({
        results: resultsWithDept as SearchMultiResponse['results'],
        page: 1,
        total_pages: 1,
        total_results: 1,
      })
    )

    await renderAndType()

    expect(screen.getByText('— Acting')).toBeInTheDocument()
  })

  it('should display release year for movies', async () => {
    vi.mocked(useSearchMulti).mockReturnValue(withData())

    await renderAndType()

    expect(screen.getByText('1999')).toBeInTheDocument()
  })

  it('should not display sections when no results', async () => {
    vi.mocked(useSearchMulti).mockReturnValue(
      withData({
        results: [],
        page: 1,
        total_pages: 0,
        total_results: 0,
      })
    )

    await renderAndType()

    expect(screen.queryByText('Movies')).not.toBeInTheDocument()
    expect(screen.queryByText('TV Shows')).not.toBeInTheDocument()
    expect(screen.queryByText('People')).not.toBeInTheDocument()
  })

  it('should limit results to 4 per category', async () => {
    const manyMovies = Array.from({ length: 8 }, (_, i) => ({
      id: i + 1,
      title: `Movie ${String(i + 1)}`,
      media_type: 'movie' as const,
    }))

    vi.mocked(useSearchMulti).mockReturnValue(
      withData({
        results: manyMovies as SearchMultiResponse['results'],
        page: 1,
        total_pages: 1,
        total_results: 8,
      })
    )

    await renderAndType()

    expect(screen.getByText('Movie 1')).toBeInTheDocument()
    expect(screen.getByText('Movie 4')).toBeInTheDocument()
    expect(screen.queryByText('Movie 5')).not.toBeInTheDocument()
  })

  it('should navigate on Enter key', async () => {
    vi.mocked(useSearchMulti).mockReturnValue(mockQueryResult())

    await renderAndType('test{Enter}')
  })

  it('should render movies with links to /movie/:id', async () => {
    vi.mocked(useSearchMulti).mockReturnValue(withData())

    await renderAndType()

    const link = screen
      .getAllByRole('link')
      .find((el) => el.getAttribute('href') === '/movie/550')
    expect(link).toBeInTheDocument()
  })

  it('should render tv shows with links to /tv/:id', async () => {
    vi.mocked(useSearchMulti).mockReturnValue(withData())

    await renderAndType()

    const link = screen
      .getAllByRole('link')
      .find((el) => el.getAttribute('href') === '/tv/1396')
    expect(link).toBeInTheDocument()
  })
})
