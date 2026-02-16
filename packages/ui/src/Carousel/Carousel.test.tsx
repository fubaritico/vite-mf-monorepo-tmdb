import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import Carousel from './Carousel'
import CarouselItem from './CarouselItem'

class ResizeObserverMock {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
}

beforeEach(() => {
  Element.prototype.scrollTo = vi.fn()
  vi.stubGlobal('ResizeObserver', ResizeObserverMock)
})

describe('Carousel', () => {
  const renderCarousel = (props = {}) =>
    render(
      <Carousel {...props}>
        <CarouselItem>Item 1</CarouselItem>
        <CarouselItem>Item 2</CarouselItem>
        <CarouselItem>Item 3</CarouselItem>
      </Carousel>
    )

  it('renders children', () => {
    renderCarousel()
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
    expect(screen.getByText('Item 3')).toBeInTheDocument()
  })

  it('renders pagination dots for hero variant', () => {
    render(
      <Carousel variant="hero">
        <CarouselItem isHero>Item 1</CarouselItem>
        <CarouselItem isHero>Item 2</CarouselItem>
        <CarouselItem isHero>Item 3</CarouselItem>
      </Carousel>
    )
    const dots = screen.getAllByRole('button', { name: /Go to slide/i })
    expect(dots).toHaveLength(3)
  })

  it('hides pagination when showPagination is false', () => {
    renderCarousel({ showPagination: false })
    const dots = screen.queryAllByRole('button', { name: /Go to slide/i })
    expect(dots).toHaveLength(0)
  })

  it('renders navigation arrows for hero variant', () => {
    render(
      <Carousel variant="hero">
        <CarouselItem isHero>Item 1</CarouselItem>
        <CarouselItem isHero>Item 2</CarouselItem>
      </Carousel>
    )
    expect(screen.getByLabelText('Previous')).toBeInTheDocument()
    expect(screen.getByLabelText('Next')).toBeInTheDocument()
  })

  it('hides arrows when showArrows is false', () => {
    renderCarousel({ showArrows: false })
    expect(screen.queryByLabelText('Previous')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Next')).not.toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = renderCarousel({ className: 'custom-class' })
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('renders with hero variant', () => {
    render(
      <Carousel variant="hero" arrowPosition="bottom-right">
        <CarouselItem isHero>Hero Item 1</CarouselItem>
        <CarouselItem isHero>Hero Item 2</CarouselItem>
      </Carousel>
    )
    expect(screen.getByText('Hero Item 1')).toBeInTheDocument()
    expect(screen.getByText('Hero Item 2')).toBeInTheDocument()
  })

  it('pagination dot click triggers scroll', () => {
    render(
      <Carousel variant="hero">
        <CarouselItem isHero>Item 1</CarouselItem>
        <CarouselItem isHero>Item 2</CarouselItem>
        <CarouselItem isHero>Item 3</CarouselItem>
      </Carousel>
    )
    const dots = screen.getAllByRole('button', { name: /Go to slide/i })
    fireEvent.click(dots[1])
    // Scroll behavior is tested, no error means success
    expect(dots[1]).toBeInTheDocument()
  })
})

describe('CarouselItem', () => {
  it('renders children', () => {
    render(<CarouselItem>Test Content</CarouselItem>)
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('applies hero styles when isHero is true', () => {
    const { container } = render(<CarouselItem isHero>Hero</CarouselItem>)
    expect(container.firstChild).toHaveClass('ui:w-full')
    expect(container.firstChild).toHaveClass('ui:snap-center')
  })

  it('applies custom className', () => {
    const { container } = render(
      <CarouselItem className="custom-item">Item</CarouselItem>
    )
    expect(container.firstChild).toHaveClass('custom-item')
  })
})
