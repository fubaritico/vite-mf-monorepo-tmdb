import { screen } from '@testing-library/react'
import '@testing-library/jest-dom'
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

  it('displays SimilarMoviesCarousel on /movie/:id page', () => {
    vi.mocked(useLocation).mockReturnValue({
      pathname: '/movie/278',
      search: '',
      hash: '',
      state: null,
      key: 'default',
    })

    renderWithReactQuery(<SimilarSection />)

    expect(screen.getByTestId('similar-movies-carousel')).toBeInTheDocument()
  })

  it('displays SimilarTVCarousel on /tv/:id page', () => {
    vi.mocked(useLocation).mockReturnValue({
      pathname: '/tv/1399',
      search: '',
      hash: '',
      state: null,
      key: 'default',
    })

    renderWithReactQuery(<SimilarSection />)

    expect(screen.getByTestId('similar-tv-carousel')).toBeInTheDocument()
  })
})
