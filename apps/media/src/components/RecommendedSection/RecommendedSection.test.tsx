import { screen } from '@testing-library/react'
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

  it('displays RecommendedMoviesCarousel on /movie/:id page', () => {
    vi.mocked(useLocation).mockReturnValue({
      pathname: '/movie/278',
      search: '',
      hash: '',
      state: null,
      key: 'default',
    })

    renderWithReactQuery(<RecommendedSection />)

    expect(
      screen.getByTestId('recommended-movies-carousel')
    ).toBeInTheDocument()
  })

  it('displays RecommendedTVCarousel on /tv/:id page', () => {
    vi.mocked(useLocation).mockReturnValue({
      pathname: '/tv/1399',
      search: '',
      hash: '',
      state: null,
      key: 'default',
    })

    renderWithReactQuery(<RecommendedSection />)

    expect(screen.getByTestId('recommended-tv-carousel')).toBeInTheDocument()
  })
})
