import { screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import {
  createTestQueryClient,
  renderComponentWithRouter,
} from '@vite-mf-monorepo/shared'
import {
  mockNowPlayingMovies,
  nowPlayingHandlers,
} from '@vite-mf-monorepo/shared/mocks'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'

import HeroSection from './HeroSection'

const server = setupServer(nowPlayingHandlers.nowPlayingMovies)

beforeAll(() => {
  server.listen()
})

afterEach(() => {
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})

describe('HeroSection', () => {
  it('should display hero carousel with now playing movies', async () => {
    renderComponentWithRouter(<HeroSection />)

    await waitFor(() => {
      expect(
        screen.getByText(mockNowPlayingMovies.results[0].title)
      ).toBeInTheDocument()
    })
  })

  it('should show skeleton while loading', () => {
    server.use(nowPlayingHandlers.nowPlayingMoviesLoading)

    const queryClient = createTestQueryClient()

    renderComponentWithRouter(<HeroSection />, '/', queryClient)

    const skeletons = document.querySelectorAll('.ui-skeleton-shimmer')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('should handle API error gracefully', async () => {
    server.use(nowPlayingHandlers.nowPlayingMoviesError)

    renderComponentWithRouter(<HeroSection />)

    await waitFor(() => {
      const skeletons = document.querySelectorAll('.ui-skeleton-shimmer')
      expect(skeletons.length).toBe(0)
    })
  })

  it('should display only first 6 now playing items', async () => {
    renderComponentWithRouter(<HeroSection />)

    await waitFor(() => {
      const images = document.querySelectorAll('img')
      expect(images.length).toBeLessThanOrEqual(6)
    })
  })
})
