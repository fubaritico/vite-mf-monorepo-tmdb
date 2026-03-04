import { screen } from '@testing-library/react'
import { renderWithReactQuery } from '@vite-mf-monorepo/shared/test-utils'
import { describe, expect, it } from 'vitest'

import HeroImage from './HeroImage'

import '@testing-library/jest-dom'

describe('HeroImage', () => {
  it('should render image with correct alt text', () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    renderWithReactQuery(
      <HeroImage backdropPath="/path/to/image.jpg" title="Test Movie" />
    )

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(screen.getByAltText('Test Movie')).toBeInTheDocument()
  })

  it('should render with unknown alt text when title is not provided', () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    renderWithReactQuery(
      <HeroImage backdropPath="/path/to/image.jpg" title={null} />
    )

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(screen.getByAltText('Unknown')).toBeInTheDocument()
  })

  it('should render with correct media queries for responsive sizes', () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const { container } = renderWithReactQuery(
      <HeroImage backdropPath="/path/to/image.jpg" title="Test Movie" />
    )

    const sources = container.querySelectorAll('source')
    expect(sources).toHaveLength(4)
    expect(sources[0]).toHaveAttribute('media', '(max-width: 639px)')
    expect(sources[1]).toHaveAttribute('media', '(max-width: 1023px)')
    expect(sources[2]).toHaveAttribute('media', '(max-width: 1535px)')
    expect(sources[3]).toHaveAttribute('media', '(min-width: 1536px)')
  })
})
