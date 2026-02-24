import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { HttpResponse, http } from 'msw'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'

import PopularSection from './PopularSection'

const mockPopularMovies = {
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

const mockPopularTV = {
  page: 1,
  results: [
    {
      id: 3,
      name: 'Test TV Show 1',
      poster_path: '/test3.jpg',
      vote_average: 6.8,
      first_air_date: '2025-01-10',
    },
    {
      id: 4,
      name: 'Test TV Show 2',
      poster_path: '/test4.jpg',
      vote_average: 7.9,
      first_air_date: '2025-01-20',
    },
  ],
  total_pages: 1,
  total_results: 2,
}

const server = setupServer(
  http.get('https://api.themoviedb.org/3/movie/popular', () => {
    return HttpResponse.json(mockPopularMovies)
  }),
  http.get('https://api.themoviedb.org/3/tv/popular', () => {
    return HttpResponse.json(mockPopularTV)
  })
)

beforeAll(() => {
  server.listen()
})

afterEach(() => {
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})

const renderWithQueryClient = (ui: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  )
}

describe('PopularSection', () => {
  it('should render section title and tabs', () => {
    renderWithQueryClient(<PopularSection />)
    expect(screen.getByText("What's Popular")).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /movies/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /tv shows/i })).toBeInTheDocument()
  })

  it('should display popular movies by default (usePopularMovie hook)', async () => {
    renderWithQueryClient(<PopularSection />)

    await waitFor(() => {
      expect(screen.getByText('Test Movie 1')).toBeInTheDocument()
      expect(screen.getByText('Test Movie 2')).toBeInTheDocument()
    })
  })

  it('should switch to TV shows when clicking TV Shows tab (usePopularTV hook)', async () => {
    const user = userEvent.setup()
    renderWithQueryClient(<PopularSection />)

    // Wait for movies to load (default view)
    await waitFor(() => {
      expect(screen.getByText('Test Movie 1')).toBeInTheDocument()
    })

    // Click TV Shows tab to trigger hook switch
    const tvTab = screen.getByRole('tab', { name: /tv shows/i })
    await user.click(tvTab)

    // Verify TV shows are displayed (different hook called)
    await waitFor(() => {
      expect(screen.getByText('Test TV Show 1')).toBeInTheDocument()
      expect(screen.getByText('Test TV Show 2')).toBeInTheDocument()
    })

    // Verify movies are no longer displayed
    expect(screen.queryByText('Test Movie 1')).not.toBeInTheDocument()
  })

  it('should show skeleton while loading movies', async () => {
    server.use(
      http.get('https://api.themoviedb.org/3/movie/popular', async () => {
        await new Promise((resolve) => setTimeout(resolve, 100))
        return HttpResponse.json(mockPopularMovies)
      })
    )

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    })

    render(
      <QueryClientProvider client={queryClient}>
        <PopularSection />
      </QueryClientProvider>
    )

    const skeletons = document.querySelectorAll('.ui-skeleton-shimmer')
    expect(skeletons.length).toBeGreaterThan(0)

    await waitFor(() => {
      expect(screen.getByText('Test Movie 1')).toBeInTheDocument()
    })
  })

  it('should handle API error gracefully', async () => {
    server.use(
      http.get('https://api.themoviedb.org/3/movie/popular', () => {
        return HttpResponse.json({ error: 'Failed to fetch' }, { status: 500 })
      })
    )

    renderWithQueryClient(<PopularSection />)

    await waitFor(() => {
      const skeletons = document.querySelectorAll('.ui-skeleton-shimmer')
      expect(skeletons.length).toBe(0)
    })
  })
})
