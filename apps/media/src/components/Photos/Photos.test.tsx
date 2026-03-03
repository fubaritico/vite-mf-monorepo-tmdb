import { screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { mockMovieImages } from '@vite-mf-monorepo/shared/mocks'
import { renderWithRouter } from '@vite-mf-monorepo/shared/test-utils'
import { useParams } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

import { useMovieImages } from '../../hooks/useMovieImages'

import Photos from './Photos'

import type { UseQueryResult } from '@tanstack/react-query'
import type {
  MovieImagesResponse,
  TMDBError,
} from '@vite-mf-monorepo/tmdb-client'

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return { ...actual, useParams: vi.fn(), useNavigate: vi.fn(() => vi.fn()) }
})

vi.mock('../../hooks/useMovieImages', () => ({
  useMovieImages: vi.fn(),
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

describe('Photos', () => {
  it('renders heading, photo buttons and CTA tile', () => {
    vi.mocked(useParams).mockReturnValue({ id: '278' })
    vi.mocked(useMovieImages).mockReturnValue(
      createMockQueryResult<MovieImagesResponse>({
        data: mockMovieImages,
        isLoading: false,
        isSuccess: true,
        status: 'success',
      })
    )

    renderWithRouter(<Photos />)

    expect(screen.getByRole('heading', { name: 'Photos' })).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'View photo 1' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /View all \d+ photos/i })
    ).toBeInTheDocument()
  })

  it('renders loading skeleton', () => {
    vi.mocked(useParams).mockReturnValue({ id: '278' })
    vi.mocked(useMovieImages).mockReturnValue(
      createMockQueryResult<MovieImagesResponse>({
        isLoading: true,
        isPending: true,
        status: 'pending',
      })
    )

    const { container } = renderWithRouter(<Photos />)

    expect(screen.getByRole('heading', { name: 'Photos' })).toBeInTheDocument()
    const skeletons = container.querySelectorAll('.ui-skeleton-shimmer')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('renders nothing on error', () => {
    vi.mocked(useParams).mockReturnValue({ id: '278' })
    vi.mocked(useMovieImages).mockReturnValue(
      createMockQueryResult<MovieImagesResponse>({
        error: {
          success: false,
          status_code: 500,
          status_message: 'Internal Server Error',
        },
        isError: true,
        status: 'error',
      })
    )

    const { container } = renderWithRouter(<Photos />)

    expect(container.firstChild).toBeNull()
  })

  it('renders nothing when backdrops are empty', () => {
    vi.mocked(useParams).mockReturnValue({ id: '278' })
    vi.mocked(useMovieImages).mockReturnValue(
      createMockQueryResult<MovieImagesResponse>({
        data: { id: 278, backdrops: [], logos: [], posters: [] },
        isSuccess: true,
        status: 'success',
      })
    )

    const { container } = renderWithRouter(<Photos />)

    expect(container.firstChild).toBeNull()
  })
})
