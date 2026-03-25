import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import HeroImage from './HeroImage'

import '@testing-library/jest-dom'

vi.mock('next/image', () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img {...props} />
  ),
}))

vi.mock('../../Icon', () => ({
  Icon: ({ name, ...props }: { name: string }) => (
    <span data-testid="icon" data-name={name} {...props} />
  ),
}))

describe('HeroImage (next)', () => {
  it('should render image with correct alt text', () => {
    render(<HeroImage backdropPath="/path/to/image.jpg" title="Test Movie" />)
    expect(screen.getByAltText('Test Movie')).toBeInTheDocument()
  })

  it('should render with unknown alt text when title is not provided', () => {
    render(<HeroImage backdropPath="/path/to/image.jpg" title={null} />)
    expect(screen.getByAltText('Unknown')).toBeInTheDocument()
  })

  it('should show skeleton when no backdrop path', () => {
    render(<HeroImage backdropPath={null} title="Test Movie" />)
    expect(screen.getByTestId('hero-image-skeleton')).toBeInTheDocument()
  })

  it('should render gradient overlay', () => {
    const { container } = render(
      <HeroImage backdropPath="/path/to/image.jpg" title="Test Movie" />
    )
    const overlay = container.querySelector('.ui\\:bg-gradient-to-t')
    expect(overlay).toBeInTheDocument()
  })

  it('should show fallback skeleton on image error', async () => {
    render(<HeroImage backdropPath="/path/to/image.jpg" title="Test Movie" />)
    fireEvent.error(screen.getByAltText('Test Movie'))

    await waitFor(() => {
      expect(screen.getByTestId('hero-image-skeleton')).toBeInTheDocument()
    })
  })

  it('should construct TMDB original URL', () => {
    render(<HeroImage backdropPath="/abc123.jpg" title="Test" />)
    expect(screen.getByAltText('Test')).toHaveAttribute(
      'src',
      'https://image.tmdb.org/t/p/original/abc123.jpg'
    )
  })
})
