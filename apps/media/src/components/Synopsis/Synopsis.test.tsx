import { render, screen } from '@testing-library/react'
import {
  mockMovieDetails,
  mockTVSeriesDetails,
} from '@vite-mf-monorepo/shared/mocks'
import { useLocation, useParams } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

import { useMediaDetails } from '../../hooks'

import Synopsis from './Synopsis'

import type { UseQueryResult } from '@tanstack/react-query'
import type {
  MovieDetailsResponse,
  TMDBError,
} from '@vite-mf-monorepo/tmdb-client'
import type { Location } from 'react-router-dom'

vi.mock('react-router-dom', () => ({
  useParams: vi.fn(),
  useLocation: vi.fn(),
}))

vi.mock('../../hooks/useMediaDetails', () => ({
  useMediaDetails: vi.fn(),
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

describe('Synopsis', () => {
  it('renders movie synopsis', () => {
    vi.mocked(useParams).mockReturnValue({ id: '278' })
    vi.mocked(useLocation).mockReturnValue({
      pathname: '/movie/278',
    } as Location)
    vi.mocked(useMediaDetails).mockReturnValue(
      createMockQueryResult<MovieDetailsResponse>({
        data: mockMovieDetails,
        isLoading: false,
        isSuccess: true,
        status: 'success',
      })
    )

    render(<Synopsis />)

    expect(
      screen.getByText(/Framed in the 1940s for the double murder/)
    ).toBeInTheDocument()
  })

  it('renders TV series synopsis', () => {
    vi.mocked(useParams).mockReturnValue({ id: '549' })
    vi.mocked(useLocation).mockReturnValue({ pathname: '/tv/549' } as Location)
    vi.mocked(useMediaDetails).mockReturnValue(
      createMockQueryResult({
        data: mockTVSeriesDetails,
        isLoading: false,
        isSuccess: true,
        status: 'success',
      })
    )

    render(<Synopsis />)

    expect(
      screen.getByText(/In cases ripped from the headlines/)
    ).toBeInTheDocument()
  })

  it('renders loading skeleton', () => {
    vi.mocked(useParams).mockReturnValue({ id: '278' })
    vi.mocked(useLocation).mockReturnValue({
      pathname: '/movie/278',
    } as Location)
    vi.mocked(useMediaDetails).mockReturnValue(
      createMockQueryResult({
        isLoading: true,
        isPending: true,
        status: 'pending',
      })
    )

    const { container } = render(<Synopsis />)

    const skeletons = container.querySelectorAll('.ui-skeleton-shimmer')
    expect(skeletons).toHaveLength(3)
    expect(
      screen.getByRole('heading', { name: 'Synopsis' })
    ).toBeInTheDocument()
  })

  it('renders error message', () => {
    vi.mocked(useParams).mockReturnValue({ id: '278' })
    vi.mocked(useLocation).mockReturnValue({
      pathname: '/movie/278',
    } as Location)
    vi.mocked(useMediaDetails).mockReturnValue(
      createMockQueryResult({
        error: {
          success: false,
          status_code: 500,
          status_message: 'Network error',
        },
        isError: true,
        status: 'error',
      })
    )

    render(<Synopsis />)

    expect(screen.getByText(/Unable to load synopsis/)).toBeInTheDocument()
  })

  it('renders nothing when overview is empty', () => {
    vi.mocked(useParams).mockReturnValue({ id: '278' })
    vi.mocked(useLocation).mockReturnValue({
      pathname: '/movie/278',
    } as Location)
    vi.mocked(useMediaDetails).mockReturnValue(
      createMockQueryResult<MovieDetailsResponse>({
        data: { ...mockMovieDetails, overview: '' },
        isSuccess: true,
        status: 'success',
      })
    )

    const { container } = render(<Synopsis />)

    expect(container.firstChild).toBeNull()
  })
})
