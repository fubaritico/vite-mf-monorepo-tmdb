import { screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { renderComponentWithRouter } from '@vite-mf-monorepo/shared'
import { HttpResponse, http } from 'msw'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'

import TrendingSection from './TrendingSection'

const mockTrendingDay = {
  page: 1,
  results: [
    {
      id: 1,
      title: 'Test Media 1',
      poster_path: '/test1.jpg',
      vote_average: 7.5,
      release_date: '2025-01-15',
    },
    {
      id: 2,
      title: 'Test Media 2',
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
      title: 'Test Media 3',
      poster_path: '/test3.jpg',
      vote_average: 6.8,
      release_date: '2025-01-10',
    },
    {
      id: 4,
      title: 'Test Media 4',
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

  it('should show skeleton while loading', () => {
    renderComponentWithRouter(<TrendingSection />)
    const dayPanel = screen.getByRole('tabpanel', { name: 'Today' })
    const skeletons = dayPanel.querySelectorAll('[class*="bg-muted"]')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('should display trending movies for today by default', async () => {
    renderComponentWithRouter(<TrendingSection />)
    const dayPanel = screen.getByRole('tabpanel', { name: 'Today' })

    await waitFor(() => {
      const titleInPanel = dayPanel.querySelector('[title="Test Media 1"]')
      expect(titleInPanel).toBeInTheDocument()
    })

    const allTitles = dayPanel.querySelectorAll('[title*="Test Media"]')
    expect(allTitles.length).toBeGreaterThanOrEqual(2)
  })

  it('should switch to week data when clicking This Week tab', async () => {
    renderComponentWithRouter(<TrendingSection />)
    const user = userEvent.setup()

    const dayPanel = screen.getByRole('tabpanel', { name: 'Today' })
    await waitFor(() => {
      expect(
        dayPanel.querySelector('[title="Test Media 1"]')
      ).toBeInTheDocument()
    })

    const weekTab = screen.getByRole('tab', { name: /this week/i })
    await user.click(weekTab)

    const weekPanel = screen.getByRole('tabpanel', { name: 'This Week' })
    await waitFor(() => {
      expect(
        weekPanel.querySelector('[title="Test Media 3"]')
      ).toBeInTheDocument()
      expect(
        weekPanel.querySelector('[title="Test Media 4"]')
      ).toBeInTheDocument()
    })

    expect(
      weekPanel.querySelector('[title="Test Media 1"]')
    ).not.toBeInTheDocument()
  })

  it('should display movie cards with correct data', async () => {
    renderComponentWithRouter(<TrendingSection />)
    const dayPanel = screen.getByRole('tabpanel', { name: 'Today' })

    await waitFor(() => {
      expect(
        dayPanel.querySelector('[title="Test Media 1"]')
      ).toBeInTheDocument()
    })

    const linksInPanel = dayPanel.querySelectorAll('a[href^="/movie/"]')
    expect(linksInPanel.length).toBeGreaterThanOrEqual(2)

    expect(linksInPanel[0]).toHaveAttribute('href', '/movie/1')
    expect(linksInPanel[1]).toHaveAttribute('href', '/movie/2')
  })
})
