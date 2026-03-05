import { screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { userEvent } from '@testing-library/user-event'
import { renderWithReactQuery } from '@vite-mf-monorepo/shared/test-utils'
import { useLocation, useParams } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import SimilarSection from './SimilarSection'

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return {
    ...actual,
    useParams: vi.fn(),
    useLocation: vi.fn(),
  }
})

vi.mock('./SimilarMoviesCarousel', () => ({
  default: () => (
    <div data-testid="similar-movies-carousel">Movies Carousel</div>
  ),
}))

vi.mock('./SimilarTVCarousel', () => ({
  default: () => <div data-testid="similar-tv-carousel">TV Carousel</div>,
}))

describe('SimilarSection', () => {
  beforeEach(() => {
    vi.mocked(useParams).mockReturnValue({ id: '278' })
    vi.mocked(useLocation).mockReturnValue({
      pathname: '/movie/278',
      search: '',
      hash: '',
      state: null,
      key: 'default',
    })
  })

  it('renders "You may also like" section heading', () => {
    renderWithReactQuery(<SimilarSection />)

    expect(
      screen.getByRole('heading', { name: 'You may also like' })
    ).toBeInTheDocument()
  })

  it('renders tabs with Movies and Series TV options', () => {
    renderWithReactQuery(<SimilarSection />)

    expect(screen.getByRole('tab', { name: 'Movies' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Series TV' })).toBeInTheDocument()
  })

  it('defaults to Movies tab on /movie/:id page', () => {
    vi.mocked(useLocation).mockReturnValue({
      pathname: '/movie/278',
      search: '',
      hash: '',
      state: null,
      key: 'default',
    })

    renderWithReactQuery(<SimilarSection />)

    const moviesTab = screen.getByRole('tab', { name: 'Movies' })
    expect(moviesTab).toHaveAttribute('aria-selected', 'true')
  })

  it('defaults to Series TV tab on /tv/:id page', () => {
    vi.mocked(useLocation).mockReturnValue({
      pathname: '/tv/1399',
      search: '',
      hash: '',
      state: null,
      key: 'default',
    })

    renderWithReactQuery(<SimilarSection />)

    const tvTab = screen.getByRole('tab', { name: 'Series TV' })
    expect(tvTab).toHaveAttribute('aria-selected', 'true')
  })

  it('displays SimilarMoviesCarousel when Movies tab is active', () => {
    renderWithReactQuery(<SimilarSection />)

    expect(screen.getByTestId('similar-movies-carousel')).toBeInTheDocument()
  })

  it('displays SimilarTVCarousel when Series TV tab is clicked', async () => {
    const user = userEvent.setup()

    renderWithReactQuery(<SimilarSection />)

    const tvTab = screen.getByRole('tab', { name: 'Series TV' })
    await user.click(tvTab)

    await waitFor(() => {
      expect(screen.getByTestId('similar-tv-carousel')).toBeInTheDocument()
    })
  })

  it('switches back to SimilarMoviesCarousel when Movies tab is clicked', async () => {
    const user = userEvent.setup()

    renderWithReactQuery(<SimilarSection />)

    const tvTab = screen.getByRole('tab', { name: 'Series TV' })
    const moviesTab = screen.getByRole('tab', { name: 'Movies' })

    await user.click(tvTab)
    await waitFor(() => {
      expect(screen.getByTestId('similar-tv-carousel')).toBeInTheDocument()
    })

    await user.click(moviesTab)
    await waitFor(() => {
      expect(screen.getByTestId('similar-movies-carousel')).toBeInTheDocument()
    })
  })
})
