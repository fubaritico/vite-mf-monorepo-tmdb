import { screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import {
  createTestQueryClient,
  renderComponentWithRouter,
} from '@vite-mf-monorepo/shared'
import {
  mockMovieCredits,
  mockMovieDetails,
  mockTVSeriesDetails,
  movieCreditsHandlers,
  movieDetailsHandlers,
  tvSeriesDetailsHandlers,
} from '@vite-mf-monorepo/shared/mocks'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'

import MediaHero from './MediaHero'

const server = setupServer()

beforeAll(() => {
  server.listen()
})

afterEach(() => {
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})

describe('MediaHero - Movie', () => {
  it('should display movie title and metadata', async () => {
    server.use(movieDetailsHandlers.movieDetails)

    renderComponentWithRouter(<MediaHero />, '/movie/278')

    await waitFor(() => {
      expect(screen.getByText(mockMovieDetails.title)).toBeInTheDocument()
    })

    expect(screen.getByText('1994')).toBeInTheDocument()
    expect(screen.getByText('2h 22m')).toBeInTheDocument()
  })

  it('should display movie tagline', async () => {
    server.use(movieDetailsHandlers.movieDetails)

    renderComponentWithRouter(<MediaHero />, '/movie/278')

    await waitFor(() => {
      expect(screen.getByText(mockMovieDetails.tagline)).toBeInTheDocument()
    })
  })

  it('should display movie genres', async () => {
    server.use(movieDetailsHandlers.movieDetails)

    renderComponentWithRouter(<MediaHero />, '/movie/278')

    await waitFor(() => {
      expect(screen.getByText('Drama')).toBeInTheDocument()
      expect(screen.getByText('Crime')).toBeInTheDocument()
    })
  })
})

describe('MediaHero - TV Series', () => {
  it('should display TV series title and metadata', async () => {
    server.use(tvSeriesDetailsHandlers.tvSeriesDetails)

    renderComponentWithRouter(<MediaHero />, '/tv/549')

    await waitFor(() => {
      expect(screen.getByText(mockTVSeriesDetails.name)).toBeInTheDocument()
    })

    expect(screen.getByText('1990')).toBeInTheDocument()
    expect(screen.getByText('25 Seasons')).toBeInTheDocument()
    expect(screen.getByText('536 Episodes')).toBeInTheDocument()
  })

  it('should display TV series tagline', async () => {
    server.use(tvSeriesDetailsHandlers.tvSeriesDetails)

    renderComponentWithRouter(<MediaHero />, '/tv/549')

    await waitFor(() => {
      expect(screen.getByText(mockTVSeriesDetails.tagline)).toBeInTheDocument()
    })
  })

  it('should display TV series genres', async () => {
    server.use(tvSeriesDetailsHandlers.tvSeriesDetails)

    renderComponentWithRouter(<MediaHero />, '/tv/549')

    await waitFor(() => {
      expect(screen.getByText('Crime')).toBeInTheDocument()
      expect(screen.getByText('Drama')).toBeInTheDocument()
    })
  })
})

describe('MediaHero - Loading & Error States', () => {
  it('should show skeleton while loading', () => {
    server.use(movieDetailsHandlers.movieDetailsLoading)

    const queryClient = createTestQueryClient()

    renderComponentWithRouter(<MediaHero />, '/movie/278', queryClient)

    const skeleton = document.querySelector('.ui-skeleton-shimmer')
    expect(skeleton).toBeInTheDocument()
  })

  it('should display error message on API error', async () => {
    server.use(movieDetailsHandlers.movieDetailsError)

    renderComponentWithRouter(<MediaHero />, '/movie/278')

    await waitFor(() => {
      expect(
        screen.getByText('The resource you requested could not be found.')
      ).toBeInTheDocument()
    })
  })
})

describe('MediaHero - Crew', () => {
  it('should display director name and role', async () => {
    server.use(
      movieDetailsHandlers.movieDetails,
      movieCreditsHandlers.movieCredits
    )

    renderComponentWithRouter(<MediaHero />, '/movie/278')

    const director = mockMovieCredits.crew?.find((c) => c.job === 'Director')

    await waitFor(() => {
      expect(
        screen.getAllByText(director?.name ?? '').length
      ).toBeGreaterThanOrEqual(1)
      expect(screen.getByText('Director')).toBeInTheDocument()
    })
  })

  it('should display writer roles', async () => {
    server.use(
      movieDetailsHandlers.movieDetails,
      movieCreditsHandlers.movieCredits
    )

    renderComponentWithRouter(<MediaHero />, '/movie/278')

    const writers = mockMovieCredits.crew
      ?.filter((c) => c.department === 'Writing')
      .slice(0, 2)

    await waitFor(() => {
      for (const writer of writers ?? []) {
        expect(screen.getByText(writer.job ?? '')).toBeInTheDocument()
      }
    })
  })
})
