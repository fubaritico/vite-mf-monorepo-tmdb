import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import {
  freeToWatchHandlers,
  mockFreeToWatchMovies,
  mockFreeToWatchTV,
} from '@vite-mf-monorepo/shared/mocks'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'

import FreeToWatchSection from './FreeToWatchSection'

const server = setupServer(
  freeToWatchHandlers.freeToWatchMovies,
  freeToWatchHandlers.freeToWatchTV
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

describe('FreeToWatchSection', () => {
  it('should render section title and tabs', () => {
    renderWithQueryClient(<FreeToWatchSection />)
    expect(screen.getByText('Free To Watch')).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /movies/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /tv shows/i })).toBeInTheDocument()
  })

  it('should display free movies by default (useFreeToWatchMovies hook)', async () => {
    renderWithQueryClient(<FreeToWatchSection />)

    await waitFor(() => {
      expect(
        screen.getByText(mockFreeToWatchMovies.results[0].title)
      ).toBeInTheDocument()
      expect(
        screen.getByText(mockFreeToWatchMovies.results[1].title)
      ).toBeInTheDocument()
    })
  })

  it('should switch to TV shows when clicking TV Shows tab (useFreeToWatchTV hook)', async () => {
    const user = userEvent.setup()
    renderWithQueryClient(<FreeToWatchSection />)

    // Wait for movies to load (default view)
    await waitFor(() => {
      expect(
        screen.getByText(mockFreeToWatchMovies.results[0].title)
      ).toBeInTheDocument()
    })

    // Click TV Shows tab to trigger hook switch
    const tvTab = screen.getByRole('tab', { name: /tv shows/i })
    await user.click(tvTab)

    // Verify TV shows are displayed (different hook called)
    await waitFor(() => {
      expect(
        screen.getByText(mockFreeToWatchTV.results[0].name)
      ).toBeInTheDocument()
      expect(
        screen.getByText(mockFreeToWatchTV.results[1].name)
      ).toBeInTheDocument()
    })

    // Verify movies are no longer displayed
    expect(
      screen.queryByText(mockFreeToWatchMovies.results[0].title)
    ).not.toBeInTheDocument()
  })

  it('should show skeleton while loading movies', () => {
    server.use(freeToWatchHandlers.freeToWatchMoviesLoading)

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    })

    render(
      <QueryClientProvider client={queryClient}>
        <FreeToWatchSection />
      </QueryClientProvider>
    )

    const skeletons = document.querySelectorAll('.ui-skeleton-shimmer')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('should handle API error gracefully', async () => {
    server.use(freeToWatchHandlers.freeToWatchMoviesError)

    renderWithQueryClient(<FreeToWatchSection />)

    await waitFor(() => {
      const skeletons = document.querySelectorAll('.ui-skeleton-shimmer')
      expect(skeletons.length).toBe(0)
    })
  })
})
