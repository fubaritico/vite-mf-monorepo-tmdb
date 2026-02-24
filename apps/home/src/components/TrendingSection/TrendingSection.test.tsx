import { screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import {
  createTestQueryClient,
  renderComponentWithRouter,
} from '@vite-mf-monorepo/shared'
import { HttpResponse, http } from 'msw'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'

import TrendingSection from './TrendingSection'

const mockTrendingDay = {
  page: 1,
  results: [
    {
      id: 1,
      title: 'Test Movie 1',
      poster_path: '/test1.jpg',
      vote_average: 7.5,
      release_date: '2025-01-15',
    },
    {
      id: 2,
      title: 'Test Movie 2',
      poster_path: '/test2.jpg',
      vote_average: 8.2,
      release_date: '2025-02-01',
    },
  ],
  total_pages: 1,
  total_results: 2,
}

const mockTrendingWeek = {
  page: 1,
  results: [
    {
      id: 3,
      title: 'Test Movie 3',
      poster_path: '/test3.jpg',
      vote_average: 6.8,
      release_date: '2025-01-10',
    },
    {
      id: 4,
      title: 'Test Movie 4',
      poster_path: '/test4.jpg',
      vote_average: 7.9,
      release_date: '2025-01-20',
    },
  ],
  total_pages: 1,
  total_results: 2,
}

const server = setupServer(
  http.get('https://api.themoviedb.org/3/trending/all/day', () => {
    return HttpResponse.json(mockTrendingDay)
  }),
  http.get('https://api.themoviedb.org/3/trending/all/week', () => {
    return HttpResponse.json(mockTrendingWeek)
  })
)

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' })
})
afterEach(() => {
  server.resetHandlers()
})
afterAll(() => {
  server.close()
})

describe('TrendingSection', () => {
  it('should render section title', () => {
    renderComponentWithRouter(<TrendingSection />)
    expect(screen.getByText('Trending')).toBeInTheDocument()
  })

  it('should render tabs for Today and This Week', () => {
    renderComponentWithRouter(<TrendingSection />)
    expect(screen.getByRole('tab', { name: /today/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /this week/i })).toBeInTheDocument()
  })

  it('should show skeleton while loading', async () => {
    server.use(
      http.get('https://api.themoviedb.org/3/trending/movie/day', async () => {
        await new Promise((resolve) => setTimeout(resolve, 100))
        return HttpResponse.json(mockTrendingDay)
      })
    )

    const queryClient = createTestQueryClient()

    renderComponentWithRouter(<TrendingSection />, '/', queryClient)

    const skeletons = document.querySelectorAll('.ui-skeleton-shimmer')
    expect(skeletons.length).toBeGreaterThan(0)

    await waitFor(() => {
      expect(screen.getByText('Test Movie 1')).toBeInTheDocument()
    })
  })

  it('should display trending movies for today by default', async () => {
    renderComponentWithRouter(<TrendingSection />)

    await waitFor(() => {
      expect(screen.getByText('Test Movie 1')).toBeInTheDocument()
      expect(screen.getByText('Test Movie 2')).toBeInTheDocument()
    })
  })

  it('should switch to week data when clicking This Week tab', async () => {
    const user = userEvent.setup()
    renderComponentWithRouter(<TrendingSection />)

    // Wait for initial data to load
    await waitFor(() => {
      expect(screen.getByText('Test Movie 1')).toBeInTheDocument()
    })

    // Click on This Week tab
    const weekTab = screen.getByRole('tab', { name: /this week/i })
    await user.click(weekTab)

    // Wait for week data to load
    await waitFor(() => {
      expect(screen.getByText('Test Movie 3')).toBeInTheDocument()
      expect(screen.getByText('Test Movie 4')).toBeInTheDocument()
    })

    // Day data should not be visible
    expect(screen.queryByText('Test Movie 1')).not.toBeInTheDocument()
  })

  it('should handle API error gracefully', async () => {
    server.use(
      http.get('https://api.themoviedb.org/3/trending/all/day', () => {
        return HttpResponse.json(
          { error: 'Internal Server Error' },
          { status: 500 }
        )
      })
    )

    renderComponentWithRouter(<TrendingSection />)

    // Should not crash and skeleton should disappear
    await waitFor(() => {
      const skeletons = document.querySelectorAll('.ui-skeleton')
      expect(skeletons.length).toBe(0)
    })
  })

  it('should display movie cards with correct data', async () => {
    renderComponentWithRouter(<TrendingSection />)

    await waitFor(() => {
      const movieCard = screen.getByTestId('movie-card-1')
      expect(movieCard).toBeInTheDocument()
    })
  })
})
