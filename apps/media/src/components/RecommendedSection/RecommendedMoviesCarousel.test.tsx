import { screen } from '@testing-library/react'
import { mockMovieRecommendations } from '@vite-mf-monorepo/shared/mocks'
import { renderWithRouter } from '@vite-mf-monorepo/shared/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useMovieRecommendations } from '../../hooks'

import RecommendedMoviesCarousel from './RecommendedMoviesCarousel'

import type { UseQueryResult } from '@tanstack/react-query'
import type {
  MovieSimilarResponse,
  TMDBError,
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

describe('RecommendedMoviesCarousel', () => {
  beforeEach(() => {
    vi.mocked(useMovieRecommendations).mockReturnValue(
      createMockQueryResult<MovieSimilarResponse>({
        data: mockMovieRecommendations as MovieSimilarResponse,
        isLoading: false,
        isSuccess: true,
        status: 'success',
      })
    )
  })

  it('displays movie carousel items', () => {
    renderWithRouter(<RecommendedMoviesCarousel id={278} />)

    expect(screen.getByText('The Godfather Part II')).toBeInTheDocument()
    expect(screen.getByText('GoodFellas')).toBeInTheDocument()
    expect(screen.getByText('Dead Poets Society')).toBeInTheDocument()
  })

  it('renders loading skeleton when data is loading', () => {
    vi.mocked(useMovieRecommendations).mockReturnValue(
      createMockQueryResult<MovieSimilarResponse>({
        isLoading: true,
        isPending: true,
        status: 'pending',
      })
    )

    const { container } = renderWithRouter(
      <RecommendedMoviesCarousel id={278} />
    )

    const skeletons = container.querySelectorAll('.ui-skeleton-shimmer')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('renders error message on error', () => {
    vi.mocked(useMovieRecommendations).mockReturnValue(
      createMockQueryResult<MovieSimilarResponse>({
        error: {
          success: false,
          status_code: 500,
          status_message: 'Internal Server Error',
        },
        isError: true,
        status: 'error',
      })
    )

    renderWithRouter(<RecommendedMoviesCarousel id={278} />)

    expect(screen.getByText('Internal Server Error')).toBeInTheDocument()
  })

  it('creates correct link URLs for movies', () => {
    renderWithRouter(<RecommendedMoviesCarousel id={278} />)

    const godfatherLink = screen.getByRole('link', {
      name: /The Godfather Part II/i,
    })
    expect(godfatherLink).toHaveAttribute('href', '/movie/240')
  })

  it('limits carousel items to 20 results', () => {
    const largeResultSet: MovieSimilarResponse = {
      page: 1,
      total_pages: 1,
      total_results: 30,
      results: Array.from({ length: 30 }, (_, i) => ({
        id: 1000 + i,
        title: `Movie ${String(i + 1)}`,
        poster_path: '/poster.jpg',
        vote_average: 7.0,
        release_date: '2024-01-01',
      })),
    }

    vi.mocked(useMovieRecommendations).mockReturnValue(
      createMockQueryResult<MovieSimilarResponse>({
        data: largeResultSet,
        isLoading: false,
        isSuccess: true,
        status: 'success',
      })
    )

    renderWithRouter(<RecommendedMoviesCarousel id={278} />)

    expect(screen.getByText('Movie 1')).toBeInTheDocument()
    expect(screen.getByText('Movie 20')).toBeInTheDocument()
    expect(screen.queryByText('Movie 21')).not.toBeInTheDocument()
  })

  it('passes correct id to useMovieRecommendations hook', () => {
    renderWithRouter(<RecommendedMoviesCarousel id={1234} />)

    expect(useMovieRecommendations).toHaveBeenCalledWith(1234)
  })
})
