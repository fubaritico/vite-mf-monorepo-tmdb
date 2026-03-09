import { screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { mockMovieSimilar } from '@vite-mf-monorepo/shared/mocks'
import { renderWithRouter } from '@vite-mf-monorepo/shared/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useMovieSimilar } from '../../hooks'

import SimilarMoviesCarousel from './SimilarMoviesCarousel'

import type { MovieSimilarResponse, TMDBError } from '@fubar-it-co/tmdb-client'
import type { UseQueryResult } from '@tanstack/react-query'

vi.mock('../../hooks', () => ({
  useMovieSimilar: vi.fn(),
  useTVSeriesSimilar: vi.fn(),
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

describe('SimilarMoviesCarousel', () => {
  beforeEach(() => {
    vi.mocked(useMovieSimilar).mockReturnValue(
      createMockQueryResult<MovieSimilarResponse>({
        data: mockMovieSimilar,
        isLoading: false,
        isSuccess: true,
        status: 'success',
      })
    )
  })

  it('displays movie carousel items', () => {
    renderWithRouter(<SimilarMoviesCarousel id={278} />)

    expect(screen.getByText('Mysterious Skin')).toBeInTheDocument()
    expect(screen.getByText('Pelle the Conqueror')).toBeInTheDocument()
    expect(screen.getByText('See No Evil, Hear No Evil')).toBeInTheDocument()
  })

  it('renders loading skeleton when data is loading', () => {
    vi.mocked(useMovieSimilar).mockReturnValue(
      createMockQueryResult<MovieSimilarResponse>({
        isLoading: true,
        isPending: true,
        status: 'pending',
      })
    )

    const { container } = renderWithRouter(<SimilarMoviesCarousel id={278} />)

    const skeletons = container.querySelectorAll('.ui-skeleton-shimmer')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('renders error message on error', () => {
    vi.mocked(useMovieSimilar).mockReturnValue(
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

    renderWithRouter(<SimilarMoviesCarousel id={278} />)

    expect(screen.getByText('Internal Server Error')).toBeInTheDocument()
  })

  it('creates correct link URLs for movies', () => {
    renderWithRouter(<SimilarMoviesCarousel id={278} />)

    const mysterousSkinLink = screen.getByRole('link', {
      name: /Mysterious Skin/i,
    })
    expect(mysterousSkinLink).toHaveAttribute('href', '/movie/11171')
  })

  it('limits carousel items to 20 results', () => {
    const largeResultSet = {
      ...mockMovieSimilar,
      results: Array.from({ length: 30 }, (_, i) => ({
        ...mockMovieSimilar.results[0],
        id: 1000 + i,
        title: `Movie ${String(i + 1)}`,
      })),
    }

    vi.mocked(useMovieSimilar).mockReturnValue(
      createMockQueryResult<MovieSimilarResponse>({
        data: largeResultSet,
        isLoading: false,
        isSuccess: true,
        status: 'success',
      })
    )

    renderWithRouter(<SimilarMoviesCarousel id={278} />)

    expect(screen.getByText('Movie 1')).toBeInTheDocument()
    expect(screen.getByText('Movie 20')).toBeInTheDocument()
    expect(screen.queryByText('Movie 21')).not.toBeInTheDocument()
  })

  it('passes correct id to useMovieSimilar hook', () => {
    renderWithRouter(<SimilarMoviesCarousel id={1234} />)

    expect(useMovieSimilar).toHaveBeenCalledWith(1234)
  })
})
