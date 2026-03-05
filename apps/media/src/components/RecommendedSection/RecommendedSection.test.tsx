import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithReactQuery } from '@vite-mf-monorepo/shared/test-utils'
import { useLocation, useParams } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import RecommendedSection from './RecommendedSection'

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return {
    ...actual,
    useParams: vi.fn(),
    useLocation: vi.fn(),
  }
})

vi.mock('./RecommendedMoviesCarousel', () => ({
  default: () => (
    <div data-testid="recommended-movies-carousel">Movies Carousel</div>
  ),
}))

vi.mock('./RecommendedTVCarousel', () => ({
  default: () => <div data-testid="recommended-tv-carousel">TV Carousel</div>,
}))

describe('RecommendedSection', () => {
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

  it('renders "Recommended for you" section heading', () => {
    renderWithReactQuery(<RecommendedSection />)

    expect(
      screen.getByRole('heading', { name: 'Recommended for you' })
    ).toBeInTheDocument()
  })

  it('renders tabs with Movies and Series TV options', () => {
    renderWithReactQuery(<RecommendedSection />)

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

    renderWithReactQuery(<RecommendedSection />)

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

    renderWithReactQuery(<RecommendedSection />)

    const tvTab = screen.getByRole('tab', { name: 'Series TV' })
    expect(tvTab).toHaveAttribute('aria-selected', 'true')
  })

  it('displays RecommendedMoviesCarousel when Movies tab is active', () => {
    renderWithReactQuery(<RecommendedSection />)

    expect(
      screen.getByTestId('recommended-movies-carousel')
    ).toBeInTheDocument()
  })

  it('displays RecommendedTVCarousel when Series TV tab is clicked', async () => {
    const user = userEvent.setup()

    renderWithReactQuery(<RecommendedSection />)

    const tvTab = screen.getByRole('tab', { name: 'Series TV' })
    await user.click(tvTab)

    await waitFor(() => {
      expect(screen.getByTestId('recommended-tv-carousel')).toBeInTheDocument()
    })
  })

  it('switches back to RecommendedMoviesCarousel when Movies tab is clicked', async () => {
    const user = userEvent.setup()

    renderWithReactQuery(<RecommendedSection />)

    const tvTab = screen.getByRole('tab', { name: 'Series TV' })
    const moviesTab = screen.getByRole('tab', { name: 'Movies' })

    await user.click(tvTab)
    await waitFor(() => {
      expect(screen.getByTestId('recommended-tv-carousel')).toBeInTheDocument()
    })

    await user.click(moviesTab)
    await waitFor(() => {
      expect(
        screen.getByTestId('recommended-movies-carousel')
      ).toBeInTheDocument()
    })
  })
})
