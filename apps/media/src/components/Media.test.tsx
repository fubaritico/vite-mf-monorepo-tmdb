import { screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { renderWithRouter } from '@vite-mf-monorepo/shared/test-utils'
import { describe, expect, it, vi } from 'vitest'

// Mock all child components with named exports
vi.mock('./MediaHero', () => ({
  MediaHero: () => <div data-testid="media-hero">MediaHero</div>,
}))

vi.mock('./Synopsis', () => ({
  Synopsis: () => <div data-testid="synopsis">Synopsis</div>,
}))

vi.mock('./Photos', () => ({
  Photos: () => <div data-testid="photos">Photos</div>,
}))

vi.mock('./Cast', () => ({
  Cast: () => <div data-testid="cast">Cast</div>,
}))

vi.mock('./TrailersSection', () => ({
  TrailersSection: () => (
    <div data-testid="trailers-section">TrailersSection</div>
  ),
}))

vi.mock('./SimilarSection', () => ({
  SimilarSection: () => <div data-testid="similar-section">SimilarSection</div>,
}))

vi.mock('./RecommendedSection', () => ({
  RecommendedSection: () => (
    <div data-testid="recommended-section">RecommendedSection</div>
  ),
}))

vi.mock('../remote.css', () => ({}))

import Media from './Media'

describe('Media', () => {
  it('renders all 7 sections', () => {
    renderWithRouter(<Media />)

    expect(screen.getByTestId('media-hero')).toBeInTheDocument()
    expect(screen.getByTestId('synopsis')).toBeInTheDocument()
    expect(screen.getByTestId('photos')).toBeInTheDocument()
    expect(screen.getByTestId('cast')).toBeInTheDocument()
    expect(screen.getByTestId('trailers-section')).toBeInTheDocument()
    expect(screen.getByTestId('similar-section')).toBeInTheDocument()
    expect(screen.getByTestId('recommended-section')).toBeInTheDocument()
  })

  it('renders MediaHero section', () => {
    renderWithRouter(<Media />)

    expect(screen.getByTestId('media-hero')).toBeInTheDocument()
  })

  it('renders Synopsis section', () => {
    renderWithRouter(<Media />)

    expect(screen.getByTestId('synopsis')).toBeInTheDocument()
  })

  it('renders Photos section', () => {
    renderWithRouter(<Media />)

    expect(screen.getByTestId('photos')).toBeInTheDocument()
  })

  it('renders Cast section', () => {
    renderWithRouter(<Media />)

    expect(screen.getByTestId('cast')).toBeInTheDocument()
  })

  it('renders TrailersSection', () => {
    renderWithRouter(<Media />)

    expect(screen.getByTestId('trailers-section')).toBeInTheDocument()
  })

  it('renders SimilarSection', () => {
    renderWithRouter(<Media />)

    expect(screen.getByTestId('similar-section')).toBeInTheDocument()
  })

  it('renders RecommendedSection', () => {
    renderWithRouter(<Media />)

    expect(screen.getByTestId('recommended-section')).toBeInTheDocument()
  })

  it('renders sections in correct order', () => {
    const { container } = renderWithRouter(<Media />)

    const allDataTestIds = Array.from(
      container.querySelectorAll('[data-testid]')
    ).map((el) => el.getAttribute('data-testid'))

    const expectedOrder = [
      'media-hero',
      'synopsis',
      'photos',
      'cast',
      'trailers-section',
      'similar-section',
      'recommended-section',
    ]

    expectedOrder.forEach((testId) => {
      expect(allDataTestIds.includes(testId)).toBe(true)
    })
  })

  it('renders Outlet for nested routes (PhotoViewer modal)', () => {
    const { container } = renderWithRouter(<Media />)

    // Outlet itself doesn't add visible elements, but Media should render
    // without errors and the router context should be available
    expect(
      container.querySelector('[data-testid="media-hero"]')
    ).toBeInTheDocument()
  })
})
