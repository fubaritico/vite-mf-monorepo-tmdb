import { screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { mockMovieVideos } from '@vite-mf-monorepo/shared/mocks'
import { renderWithReactQuery } from '@vite-mf-monorepo/shared/test-utils'
import { useLocation, useParams } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useMediaVideos } from '../../hooks'

import TrailersSection from './TrailersSection'

import type { MovieVideosResponse, TMDBError } from '@fubar-it-co/tmdb-client'
import type { UseQueryResult } from '@tanstack/react-query'

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return { ...actual, useParams: vi.fn(), useLocation: vi.fn() }
})

vi.mock('../../hooks', () => ({
  useMediaVideos: vi.fn(),
}))

const createMockQueryResult = <T,>(
  overrides: Partial<UseQueryResult<T, TMDBError>> = {}
): UseQueryResult<T, TMDBError> => {
  return {
    data: undefined as T | undefined,
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
    refetch: vi.fn(),
    ...overrides,
  } as UseQueryResult<T, TMDBError>
}

describe('TrailersSection', () => {
  beforeEach(() => {
    HTMLDialogElement.prototype.show = vi.fn()
    HTMLDialogElement.prototype.showModal = vi.fn()
    HTMLDialogElement.prototype.close = vi.fn()
    vi.mocked(useParams).mockReturnValue({ id: '278' })
    vi.mocked(useLocation).mockReturnValue({
      pathname: '/movie/278',
      search: '',
      hash: '',
      state: null,
      key: 'default',
    })
  })

  it('should render loading state', () => {
    vi.mocked(useMediaVideos).mockReturnValue(
      createMockQueryResult<MovieVideosResponse>({
        isLoading: true,
        isPending: true,
        status: 'pending',
      })
    )

    renderWithReactQuery(<TrailersSection />)

    // Section title should be visible during loading
    expect(screen.getByText('Trailers & Clips')).toBeInTheDocument()
  })

  // TODO: find a way to call dialog.close, no way to run the line in Modal the calls that method
  // @see: https://github.com/jsdom/jsdom/issues/3294
  it.skip('should render trailers when data is loaded', () => {
    vi.mocked(useMediaVideos).mockReturnValue(
      createMockQueryResult<MovieVideosResponse>({
        data: mockMovieVideos,
        isLoading: false,
        isSuccess: true,
        status: 'success',
      })
    )

    renderWithReactQuery(<TrailersSection />)

    expect(screen.getByText('Trailers & Clips')).toBeInTheDocument()
    expect(
      screen.getByText('The Shawshank Redemption - Official Trailer')
    ).toBeInTheDocument()
    expect(
      screen.getByText('The Shawshank Redemption - Clip')
    ).toBeInTheDocument()
  })

  it('should render nothing when no trailers are available', () => {
    vi.mocked(useMediaVideos).mockReturnValue(
      createMockQueryResult<MovieVideosResponse>({
        data: { id: 278, results: [] },
        isLoading: false,
        isSuccess: true,
        status: 'success',
      })
    )

    const { container } = renderWithReactQuery(<TrailersSection />)

    expect(container.firstChild).toBeNull()
  })

  it('should render nothing on error', () => {
    vi.mocked(useMediaVideos).mockReturnValue(
      createMockQueryResult<MovieVideosResponse>({
        isLoading: false,
        isError: true,
        error: {
          status_message: 'API Error',
          status_code: 500,
          success: false,
        },
        status: 'error',
      })
    )

    const { container } = renderWithReactQuery(<TrailersSection />)

    expect(container.firstChild).toBeNull()
  })
})
