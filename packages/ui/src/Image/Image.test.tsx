import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import Image from './Image'

describe('Image', () => {
  const defaultProps = {
    src: 'https://example.com/image.jpg',
    alt: 'Test image',
  }

  it('renders with correct src and alt', () => {
    render(<Image {...defaultProps} />)
    const img = screen.getByRole('img', { name: 'Test image' })
    expect(img).toHaveAttribute('src', defaultProps.src)
    expect(img).toHaveAttribute('alt', defaultProps.alt)
  })

  it('applies default aspect ratio 2/3', () => {
    render(<Image {...defaultProps} />)
    const container = screen.getByRole('img').parentElement
    expect(container).toHaveStyle({ aspectRatio: '2/3' })
  })

  it('applies custom aspect ratio', () => {
    render(<Image {...defaultProps} aspectRatio="16/9" />)
    const container = screen.getByRole('img').parentElement
    expect(container).toHaveStyle({ aspectRatio: '16/9' })
  })

  it('starts in loading state', () => {
    render(<Image {...defaultProps} />)
    const container = screen.getByRole('img').parentElement
    expect(container).toHaveAttribute('data-state', 'loading')
  })

  it('transitions to loaded state on image load', () => {
    render(<Image {...defaultProps} />)
    const img = screen.getByRole('img', { name: 'Test image' })
    fireEvent.load(img)
    const container = img.parentElement
    expect(container).toHaveAttribute('data-state', 'loaded')
  })

  it('transitions to error state on image error', () => {
    const { container } = render(<Image {...defaultProps} />)
    const img = screen.getByRole('img', { name: 'Test image' })
    fireEvent.error(img)
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveAttribute('data-state', 'error')
  })

  it('shows default fallback on error', () => {
    render(<Image {...defaultProps} />)
    const img = screen.getByRole('img', { name: 'Test image' })
    fireEvent.error(img)
    const svg = document.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('shows custom fallback on error', () => {
    render(<Image {...defaultProps} fallback={<span>Custom fallback</span>} />)
    const img = screen.getByRole('img', { name: 'Test image' })
    fireEvent.error(img)
    expect(screen.getByText('Custom fallback')).toBeInTheDocument()
  })

  it('calls onLoad callback when image loads', () => {
    const onLoad = vi.fn()
    render(<Image {...defaultProps} onLoad={onLoad} />)
    const img = screen.getByRole('img', { name: 'Test image' })
    fireEvent.load(img)
    expect(onLoad).toHaveBeenCalledTimes(1)
  })

  it('calls onError callback when image fails', () => {
    const onError = vi.fn()
    render(<Image {...defaultProps} onError={onError} />)
    const img = screen.getByRole('img', { name: 'Test image' })
    fireEvent.error(img)
    expect(onError).toHaveBeenCalledTimes(1)
  })

  it('renders blur placeholder when blurDataUrl is provided', () => {
    const { container } = render(
      <Image
        {...defaultProps}
        blurDataUrl="data:image/jpeg;base64,/9j/4AAQSkZJRg=="
      />
    )
    const images = container.querySelectorAll('img')
    expect(images).toHaveLength(2)
    expect(images[0]).toHaveAttribute(
      'src',
      'data:image/jpeg;base64,/9j/4AAQSkZJRg=='
    )
  })

  it('hides blur placeholder after image loads', () => {
    const { container } = render(
      <Image
        {...defaultProps}
        blurDataUrl="data:image/jpeg;base64,/9j/4AAQSkZJRg=="
      />
    )
    const mainImg = screen.getByRole('img', { name: 'Test image' })
    fireEvent.load(mainImg)
    const images = container.querySelectorAll('img')
    expect(images).toHaveLength(1)
  })

  it('applies custom className', () => {
    render(<Image {...defaultProps} className="custom-class" />)
    const container = screen.getByRole('img').parentElement
    expect(container).toHaveClass('custom-class')
  })

  it('passes additional props to img element', () => {
    render(<Image {...defaultProps} data-testid="custom-image" />)
    expect(screen.getByTestId('custom-image')).toBeInTheDocument()
  })
})
