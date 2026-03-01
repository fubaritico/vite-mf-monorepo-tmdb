import { screen } from '@testing-library/react'
import { mockMovieCredits } from '@vite-mf-monorepo/shared/mocks'
import { renderWithRouter } from '@vite-mf-monorepo/shared/test-utils'
import { useParams } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

import { useMovieCredits } from '../../hooks/useMovieCredits'

import Cast from './Cast'

import type { UseQueryResult } from '@tanstack/react-query'
import type {
  MovieCreditsResponse,
  TMDBError,
} from '@vite-mf-monorepo/tmdb-client'

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return { ...actual, useParams: vi.fn() }
})

vi.mock('../../hooks/useMovieCredits', () => ({
  useMovieCredits: vi.fn(),
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

describe('Cast', () => {
  it('renders top 10 cast members', () => {
    vi.mocked(useParams).mockReturnValue({ id: '278' })
    vi.mocked(useMovieCredits).mockReturnValue(
      createMockQueryResult<MovieCreditsResponse>({
        data: mockMovieCredits,
        isLoading: false,
        isSuccess: true,
        status: 'success',
      })
    )

    renderWithRouter(<Cast />)

    expect(screen.getByRole('heading', { name: 'Cast' })).toBeInTheDocument()
    expect(screen.getByText('Tim Robbins')).toBeInTheDocument()
    expect(screen.getByText('Andy Dufresne')).toBeInTheDocument()
    expect(screen.getByText('Morgan Freeman')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Whole cast' })).toBeInTheDocument()
  })

  it('renders loading skeleton', () => {
    vi.mocked(useParams).mockReturnValue({ id: '278' })
    vi.mocked(useMovieCredits).mockReturnValue(
      createMockQueryResult<MovieCreditsResponse>({
        isLoading: true,
        isPending: true,
        status: 'pending',
      })
    )

    const { container } = renderWithRouter(<Cast />)

    expect(screen.getByRole('heading', { name: 'Cast' })).toBeInTheDocument()
    const skeletons = container.querySelectorAll('.ui-skeleton-shimmer')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('renders nothing on error', () => {
    vi.mocked(useParams).mockReturnValue({ id: '278' })
    vi.mocked(useMovieCredits).mockReturnValue(
      createMockQueryResult<MovieCreditsResponse>({
        error: {
          success: false,
          status_code: 500,
          status_message: 'Internal Server Error',
        },
        isError: true,
        status: 'error',
      })
    )

    const { container } = renderWithRouter(<Cast />)

    expect(container.firstChild).toBeNull()
  })

  it('renders nothing when cast is empty', () => {
    vi.mocked(useParams).mockReturnValue({ id: '278' })
    vi.mocked(useMovieCredits).mockReturnValue(
      createMockQueryResult<MovieCreditsResponse>({
        data: { id: 278, cast: [], crew: [] },
        isSuccess: true,
        status: 'success',
      })
    )

    const { container } = renderWithRouter(<Cast />)

    expect(container.firstChild).toBeNull()
  })
})
