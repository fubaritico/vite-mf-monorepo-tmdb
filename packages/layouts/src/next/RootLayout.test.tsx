import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import RootLayout from './RootLayout'

vi.mock('@vite-mf-monorepo/shared/assets', () => ({
  LogoT: () => <span data-testid="logo-t" />,
}))

vi.mock('next/link', () => ({
  default: ({
    children,
    ...props
  }: React.PropsWithChildren<{ href: string; className?: string }>) => (
    <a data-next-link {...props}>
      {children}
    </a>
  ),
}))

describe('RootLayout (next) — crossZoneHome', () => {
  it('renders logo as next/link by default', () => {
    render(<RootLayout>content</RootLayout>)
    const logo = screen.getByRole('link', { name: /tmdb/i })
    expect(logo).toHaveAttribute('href', '/')
    expect(logo).toHaveAttribute('data-next-link')
  })

  it('renders logo as plain <a> when crossZoneHome is true', () => {
    render(<RootLayout crossZoneHome>content</RootLayout>)
    const logo = screen.getByRole('link', { name: /tmdb/i })
    expect(logo).toHaveAttribute('href', '/')
    expect(logo).not.toHaveAttribute('data-next-link')
  })

  it('renders children', () => {
    render(<RootLayout>Page content</RootLayout>)
    expect(screen.getByText('Page content')).toBeInTheDocument()
  })
})
