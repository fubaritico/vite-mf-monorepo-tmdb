import { render, screen } from '@testing-library/react'
import { mockMovieCredits } from '@vite-mf-monorepo/shared/mocks'
import { useLocation, useParams } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

import { useMovieCredits } from '../../hooks/useMovieCredits'

import Crew from './Crew'

import type { UseQueryResult } from '@tanstack/react-query'
import type {
  MovieCreditsResponse,
  TMDBError,
} from '@vite-mf-monorepo/tmdb-client'
import type { Location } from 'react-router-dom'

vi.mock('react-router-dom', () => ({
  useParams: vi.fn(),
  useLocation: vi.fn(),
}))

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

describe('Crew', () => {
  it('renders director and writers', () => {
    vi.mocked(useParams).mockReturnValue({ id: '278' })
    vi.mocked(useLocation).mockReturnValue({
      pathname: '/movie/278',
    } as Location)

    const mockResult = createMockQueryResult<MovieCreditsResponse>({
      data: mockMovieCredits,
      isLoading: false,
      isSuccess: true,
      status: 'success',
    })

    vi.mocked(useMovieCredits).mockReturnValue(mockResult)

    render(<Crew />)

    expect(screen.getByRole('heading', { name: 'Crew' })).toBeInTheDocument()

    const frankDarabont = screen.getAllByText('Frank Darabont')
    expect(frankDarabont).toHaveLength(2)

    expect(screen.getByText('Director')).toBeInTheDocument()
    expect(screen.getByText('Screenplay')).toBeInTheDocument()
    expect(screen.getByText('Stephen King')).toBeInTheDocument()
    expect(screen.getByText('Novel')).toBeInTheDocument()
  })

  it('renders loading skeleton', () => {
    vi.mocked(useParams).mockReturnValue({ id: '278' })
    vi.mocked(useLocation).mockReturnValue({
      pathname: '/movie/278',
    } as Location)
    vi.mocked(useMovieCredits).mockReturnValue(
      createMockQueryResult<MovieCreditsResponse>({
        isLoading: true,
        isPending: true,
        status: 'pending',
      })
    )

    const { container } = render(<Crew />)

    const skeletons = container.querySelectorAll('.ui-skeleton-shimmer')
    expect(skeletons.length).toBeGreaterThan(0)
    expect(screen.getByRole('heading', { name: 'Crew' })).toBeInTheDocument()
  })

  it('renders error message', () => {
    vi.mocked(useParams).mockReturnValue({ id: '278' })
    vi.mocked(useLocation).mockReturnValue({
      pathname: '/movie/278',
    } as Location)
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

    render(<Crew />)

    expect(
      screen.getByText(/Unable to load crew information/)
    ).toBeInTheDocument()
  })

  it('renders nothing when no director and no writers', () => {
    vi.mocked(useParams).mockReturnValue({ id: '278' })
    vi.mocked(useLocation).mockReturnValue({
      pathname: '/movie/278',
    } as Location)
    vi.mocked(useMovieCredits).mockReturnValue(
      createMockQueryResult<MovieCreditsResponse>({
        data: {
          id: 278,
          cast: [],
          crew: [],
        },
        isSuccess: true,
        status: 'success',
      })
    )

    const { container } = render(<Crew />)

    expect(container.firstChild).toBeNull()
  })
})
