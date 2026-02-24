import { cleanup } from '@testing-library/react'
import { renderReactQueryWithRouter } from '@vite-mf-monorepo/shared'
import { afterEach, describe, expect, it } from 'vitest'

import Home from './Home'

describe('Home', () => {
  afterEach(() => {
    cleanup()
  })

  it('should render the Home page without crashing', () => {
    const { container } = renderReactQueryWithRouter(<Home />)

    // Verify the component renders
    expect(container).toBeTruthy()

    // Verify main structure is present (Section components)
    const sections = container.querySelectorAll('section')
    expect(sections.length).toBeGreaterThan(0)
  })

  // TODO: Add test to verify HeroSection is rendered
  // TODO: Add test to verify TrendingSection is rendered with title "Trending"
  // TODO: Add test to verify PopularSection is rendered with title "What's Popular"
  // TODO: Add test to verify FreeToWatchSection is rendered with title "Free to Watch"
  // TODO: Add test to verify all sections have correct background colors (alternating white/gray)
  // TODO: Add test to verify Container max-width is applied correctly
  // TODO: Add test to verify responsive padding is applied to sections
  // TODO: Add integration test with mocked API data to verify full page render with content
  // TODO: Add snapshot test once snapshot configuration is fixed
})
