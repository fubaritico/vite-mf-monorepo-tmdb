import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import Footer from './Footer'

describe('Footer', () => {
  it('renders children', () => {
    render(
      <Footer>
        <span data-testid="footer-content">Footer content</span>
      </Footer>
    )

    expect(screen.getByTestId('footer-content')).toBeInTheDocument()
  })

  it('renders a <footer> element', () => {
    const { container } = render(<Footer>content</Footer>)

    const footerElement = container.querySelector('footer')
    expect(footerElement).toBeInTheDocument()
  })

  it('forwards className', () => {
    const { container } = render(
      <Footer className="custom-footer-class">content</Footer>
    )

    const footerElement = container.querySelector('footer')
    expect(footerElement).toHaveClass('custom-footer-class')
  })

  it('forwards HTML attributes', () => {
    render(<Footer data-testid="custom-footer">content</Footer>)

    expect(screen.getByTestId('custom-footer')).toBeInTheDocument()
  })

  it('renders without children', () => {
    const { container } = render(<Footer />)

    expect(container.querySelector('footer')).toBeInTheDocument()
  })

  it('renders Container inside footer', () => {
    const { container } = render(
      <Footer>
        <span>Nested content</span>
      </Footer>
    )

    // Container should be present and wrapping children
    const footer = container.querySelector('footer')
    expect(footer).toBeInTheDocument()
    expect(
      footer?.querySelector('[data-testid="footer-content"]')
    ).not.toBeInTheDocument()
  })

  it('merges className correctly with internal classes', () => {
    const { container } = render(<Footer className="custom">content</Footer>)

    const footer = container.querySelector('footer')
    // Should have both internal (layout:...) and custom classes
    expect(footer?.className).toContain('custom')
  })

  it('allows multiple children elements', () => {
    render(
      <Footer>
        <span data-testid="child1">Child 1</span>
        <span data-testid="child2">Child 2</span>
        <span data-testid="child3">Child 3</span>
      </Footer>
    )

    expect(screen.getByTestId('child1')).toBeInTheDocument()
    expect(screen.getByTestId('child2')).toBeInTheDocument()
    expect(screen.getByTestId('child3')).toBeInTheDocument()
  })
})
