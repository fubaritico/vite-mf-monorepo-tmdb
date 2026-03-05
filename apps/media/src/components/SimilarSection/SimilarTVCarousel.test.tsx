import { screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { mockTVSeriesSimilar } from '@vite-mf-monorepo/shared/mocks'
import { renderWithRouter } from '@vite-mf-monorepo/shared/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useTVSeriesSimilar } from '../../hooks'

import SimilarTVCarousel from './SimilarTVCarousel'

import type { UseQueryResult } from '@tanstack/react-query'
import type {
  TMDBError,
  TvSeriesSimilarResponse,
} from '@vite-mf-monorepo/tmdb-client'

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

describe('SimilarTVCarousel', () => {
  beforeEach(() => {
    vi.mocked(useTVSeriesSimilar).mockReturnValue(
      createMockQueryResult<TvSeriesSimilarResponse>({
        data: mockTVSeriesSimilar,
        isLoading: false,
        isSuccess: true,
        status: 'success',
      })
    )
  })

  it('displays TV show carousel items', () => {
    renderWithRouter(<SimilarTVCarousel id={278} />)

    expect(screen.getByText('365: Repeat the Year')).toBeInTheDocument()
    expect(screen.getByText('Królowie')).toBeInTheDocument()
    expect(
      screen.getByText('Without Breast There Is No Paradise')
    ).toBeInTheDocument()
  })

  it('renders loading skeleton when data is loading', () => {
    vi.mocked(useTVSeriesSimilar).mockReturnValue(
      createMockQueryResult<TvSeriesSimilarResponse>({
        isLoading: true,
        isPending: true,
        status: 'pending',
      })
    )

    const { container } = renderWithRouter(<SimilarTVCarousel id={278} />)

    const skeletons = container.querySelectorAll('.ui-skeleton-shimmer')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('renders error message on error', () => {
    vi.mocked(useTVSeriesSimilar).mockReturnValue(
      createMockQueryResult<TvSeriesSimilarResponse>({
        error: {
          success: false,
          status_code: 500,
          status_message: 'Internal Server Error',
        },
        isError: true,
        status: 'error',
      })
    )

    renderWithRouter(<SimilarTVCarousel id={278} />)

    expect(screen.getByText('Internal Server Error')).toBeInTheDocument()
  })

  it('creates correct link URLs for TV shows', () => {
    renderWithRouter(<SimilarTVCarousel id={278} />)

    const repeatLink = screen.getByRole('link', {
      name: /365: Repeat the Year/i,
    })
    expect(repeatLink).toHaveAttribute('href', '/tv/99479')
  })

  it('limits carousel items to 20 results', () => {
    const largeResultSet = {
      ...mockTVSeriesSimilar,
      results: Array.from({ length: 30 }, (_, i) => ({
        ...mockTVSeriesSimilar.results[0],
        id: 1000 + i,
        name: `Series ${String(i + 1)}`,
      })),
    }

    vi.mocked(useTVSeriesSimilar).mockReturnValue(
      createMockQueryResult<TvSeriesSimilarResponse>({
        data: largeResultSet,
        isLoading: false,
        isSuccess: true,
        status: 'success',
      })
    )

    renderWithRouter(<SimilarTVCarousel id={278} />)

    expect(screen.getByText('Series 1')).toBeInTheDocument()
    expect(screen.getByText('Series 20')).toBeInTheDocument()
    expect(screen.queryByText('Series 21')).not.toBeInTheDocument()
  })

  it('passes correct id to useTVSeriesSimilar hook', () => {
    renderWithRouter(<SimilarTVCarousel id={5678} />)

    expect(useTVSeriesSimilar).toHaveBeenCalledWith(5678)
  })
})
