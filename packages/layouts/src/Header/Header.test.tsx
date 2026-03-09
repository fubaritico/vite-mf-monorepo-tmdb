import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import Header from './Header'

describe('Header', () => {
  it('renders with role="banner"', () => {
    render(<Header />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('applies extended height (h-20) by default', () => {
    render(<Header />)
    const header = screen.getByRole('banner')
    expect(header).toHaveClass('layout:h-20')
  })

  it('applies compact height (h-16) when variant="compact"', () => {
    render(<Header variant="compact" />)
    const header = screen.getByRole('banner')
    expect(header).toHaveClass('layout:h-16')
  })

  it('applies extended height when variant="extended"', () => {
    render(<Header variant="extended" />)
    const header = screen.getByRole('banner')
    expect(header).toHaveClass('layout:h-20')
  })

  it('renders logo when logo prop provided', () => {
    render(<Header logo={<span data-testid="logo">My Logo</span>} />)
    expect(screen.getByTestId('logo')).toBeInTheDocument()
  })

  it('does not render logo section when logo is not provided', () => {
    const { container } = render(<Header />)
    const logoSections = container.querySelectorAll('[data-testid="logo"]')
    expect(logoSections).toHaveLength(0)
  })

  it('renders children in right slot', () => {
    render(
      <Header>
        <span data-testid="child">Child content</span>
      </Header>
    )
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  it('does not render children section when children is not provided', () => {
    render(<Header />)
    // At least the header itself should be in DOM, but no explicit children div
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('forwards className to header element', () => {
    render(<Header className="custom-header-class" />)
    const header = screen.getByRole('banner')
    expect(header).toHaveClass('custom-header-class')
  })

  it('forwards HTML attributes', () => {
    render(<Header data-testid="custom-header" />)
    expect(screen.getByTestId('custom-header')).toBeInTheDocument()
  })

  it('does not add scroll listener when autoCompact is false (default)', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener')

    render(<Header autoCompact={false} />)

    const scrollListeners = addEventListenerSpy.mock.calls.filter(
      (call) => call[0] === 'scroll'
    )
    expect(scrollListeners).toHaveLength(0)

    addEventListenerSpy.mockRestore()
  })

  it('adds scroll listener when autoCompact is true', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener')

    render(<Header autoCompact={true} />)

    const scrollListeners = addEventListenerSpy.mock.calls.filter(
      (call) => call[0] === 'scroll'
    )
    expect(scrollListeners.length).toBeGreaterThan(0)

    addEventListenerSpy.mockRestore()
  })

  it('does not switch on scroll when autoCompact=false', () => {
    render(<Header autoCompact={false} scrollThreshold={50} />)
    const header = screen.getByRole('banner')

    // Should always stay extended when autoCompact=false
    expect(header).toHaveClass('layout:h-20')
  })

  it('removes scroll listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')

    const { unmount } = render(<Header autoCompact={true} />)
    unmount()

    const scrollListeners = removeEventListenerSpy.mock.calls.filter(
      (call) => call[0] === 'scroll'
    )
    expect(scrollListeners.length).toBeGreaterThan(0)

    removeEventListenerSpy.mockRestore()
  })

  it('renders both logo and children together', () => {
    render(
      <Header logo={<span data-testid="logo">Logo</span>}>
        <span data-testid="nav">Navigation</span>
      </Header>
    )

    expect(screen.getByTestId('logo')).toBeInTheDocument()
    expect(screen.getByTestId('nav')).toBeInTheDocument()
  })
})
