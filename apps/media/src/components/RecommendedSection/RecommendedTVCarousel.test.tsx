import { screen } from '@testing-library/react'
import { mockTVSeriesRecommendations } from '@vite-mf-monorepo/shared/mocks'
import { renderWithRouter } from '@vite-mf-monorepo/shared/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useTVSeriesRecommendations } from '../../hooks'

import RecommendedTVCarousel from './RecommendedTVCarousel'

import type { UseQueryResult } from '@tanstack/react-query'
import type {
  TMDBError,
  TvSeriesRecommendationsResponse,
} from '@vite-mf-monorepo/tmdb-client'

vi.mock('../../hooks', () => ({
  useMovieRecommendations: vi.fn(),
  useTVSeriesRecommendations: vi.fn(),
}))

const createMockQueryResult = <T,>(
  overrides: Partial<UseQueryResult<T, TMDBError>>
): UseQueryResult<T, TMDBError> => {
  return {
    data: undefined,
    error: null,
    isError: false,
    isLoading: false,
    isLoadingError: false,
    isPending: false,
    isRefetchError: false,
    isSuccess: false,
    status: 'pending',
    dataUpdatedAt: 0,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    failureCount: 0,
    failureReason: null,
    fetchStatus: 'idle',
    isInitialLoading: false,
    isPaused: false,
    isPlaceholderData: false,
    isRefetching: false,
    isStale: false,
    refetch: vi.fn(),
    ...overrides,
  } as UseQueryResult<T, TMDBError>
}

describe('RecommendedTVCarousel', () => {
  beforeEach(() => {
    vi.mocked(useTVSeriesRecommendations).mockReturnValue(
      createMockQueryResult<TvSeriesRecommendationsResponse>({
        data: mockTVSeriesRecommendations,
        isLoading: false,
        isSuccess: true,
        status: 'success',
      })
    )
  })

  it('displays TV show carousel items', () => {
    renderWithRouter(<RecommendedTVCarousel id={1396} />)

    expect(screen.getByText('Better Call Saul')).toBeInTheDocument()
    expect(screen.getByText('Game of Thrones')).toBeInTheDocument()
    expect(screen.getByText('Arcane')).toBeInTheDocument()
  })

  it('renders loading skeleton when data is loading', () => {
    vi.mocked(useTVSeriesRecommendations).mockReturnValue(
      createMockQueryResult<TvSeriesRecommendationsResponse>({
        isLoading: true,
        isPending: true,
        status: 'pending',
      })
    )

    const { container } = renderWithRouter(<RecommendedTVCarousel id={1396} />)

    const skeletons = container.querySelectorAll('.ui-skeleton-shimmer')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('renders error message on error', () => {
    vi.mocked(useTVSeriesRecommendations).mockReturnValue(
      createMockQueryResult<TvSeriesRecommendationsResponse>({
        error: {
          success: false,
          status_code: 500,
          status_message: 'Internal Server Error',
        },
        isError: true,
        status: 'error',
      })
    )

    renderWithRouter(<RecommendedTVCarousel id={1396} />)

    expect(screen.getByText('Internal Server Error')).toBeInTheDocument()
  })

  it('creates correct link URLs for TV shows', () => {
    renderWithRouter(<RecommendedTVCarousel id={1396} />)

    const betterCallSaulLink = screen.getByRole('link', {
      name: /Better Call Saul/i,
    })
    expect(betterCallSaulLink).toHaveAttribute('href', '/tv/60059')
  })

  it('limits carousel items to 20 results', () => {
    const largeResultSet: TvSeriesRecommendationsResponse = {
      page: 1,
      total_pages: 1,
      total_results: 30,
      results: Array.from({ length: 30 }, (_, i) => ({
        id: 1000 + i,
        name: `Series ${String(i + 1)}`,
        poster_path: '/poster.jpg',
        vote_average: 7.0,
        first_air_date: '2024-01-01',
      })),
    }

    vi.mocked(useTVSeriesRecommendations).mockReturnValue(
      createMockQueryResult<TvSeriesRecommendationsResponse>({
        data: largeResultSet,
        isLoading: false,
        isSuccess: true,
        status: 'success',
      })
    )

    renderWithRouter(<RecommendedTVCarousel id={1396} />)

    expect(screen.getByText('Series 1')).toBeInTheDocument()
    expect(screen.getByText('Series 20')).toBeInTheDocument()
    expect(screen.queryByText('Series 21')).not.toBeInTheDocument()
  })

  it('passes correct id to useTVSeriesRecommendations hook', () => {
    renderWithRouter(<RecommendedTVCarousel id={5678} />)

    expect(useTVSeriesRecommendations).toHaveBeenCalledWith(5678)
  })
})
