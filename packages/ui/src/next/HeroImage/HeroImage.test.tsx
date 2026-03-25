import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import HeroImage from './HeroImage'

import '@testing-library/jest-dom'

vi.mock('next/image', () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img {...props} />
  ),
}))

describe('HeroImage (next)', () => {
  beforeEach(() => {
    Object.defineProperty(HTMLImageElement.prototype, 'complete', {
      get() {
        return false
      },
      configurable: true,
    })
  })

  it('should render image with correct alt text', () => {
    render(<HeroImage backdropPath="/path/to/image.jpg" title="Test Movie" />)
    expect(screen.getByAltText('Test Movie')).toBeInTheDocument()
  })

  it('should render with unknown alt text when title is not provided', () => {
    render(<HeroImage backdropPath="/path/to/image.jpg" title={null} />)
    expect(screen.getByAltText('Unknown')).toBeInTheDocument()
  })

  it('should show skeleton in loading state', () => {
    render(<HeroImage backdropPath="/path/to/image.jpg" title="Test Movie" />)
    expect(screen.getByTestId('hero-image-skeleton')).toBeInTheDocument()
  })

  it('should hide skeleton after image loads', async () => {
    render(<HeroImage backdropPath="/path/to/image.jpg" title="Test Movie" />)
    expect(screen.getByTestId('hero-image-skeleton')).toBeInTheDocument()

    fireEvent.load(screen.getByAltText('Test Movie'))

    await waitFor(() => {
      expect(
        screen.queryByTestId('hero-image-skeleton')
      ).not.toBeInTheDocument()
    })
  })
})
