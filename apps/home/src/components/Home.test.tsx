import { cleanup, screen, waitFor, within } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import moviesData from '../mocks/data/popular'
import { renderReactQueryWithRouter } from '../mocks/react-router'

import Home from './Home'

vi.mock('@vite-mf-monorepo/tmdb-client', async (importOriginal) => {
  const original =
    await importOriginal<typeof import('@vite-mf-monorepo/tmdb-client')>()
  // Import mock data inside the factory
  const { default: mockData } = await import('../mocks/data/popular')
  return {
    ...original,
    // Mock moviePopularListOptions to return mock data directly
    moviePopularListOptions: () => ({
      queryKey: ['moviePopularList'],
      queryFn: () => Promise.resolve(mockData),
    }),
  }
})

/**
 * Helper function to flush promises, so that any pending promises are resolved
 * and the component is properly rendered before the next assertion.
 */
function flushPromises() {
  return new Promise((resolve) => {
    setTimeout(resolve, 0)
  })
}

describe('Home', () => {
  // cleanup after each test, vitest doesn't perform any automatic DOM cleanup
  afterEach(() => {
    cleanup()
  })

  it('should render the list of movies', async () => {
    const { container } = renderReactQueryWithRouter(Home)

    // testing any rendered element to be sure that the component is mounted and rendered
    const element = await waitFor(() => screen.getByText('Havoc'))

    expect(element).toBeTruthy()
    expect(container).toMatchSnapshot()

    await flushPromises()
  })

  it('should display the right amount of cards in the movie grid', async () => {
    renderReactQueryWithRouter(Home)

    await waitFor(() => {
      expect(screen.getAllByTestId('movie-grid-card').length).toEqual(
        moviesData.results.length
      )
    })

    await flushPromises()
  })

  it.each([
    ...moviesData.results.map(({ title, poster_path }, i) => [
      title,
      'https://image.tmdb.org/t/p/w500' + poster_path,
      i,
    ]),
  ])(
    'should display a card with a title "%s" and a poster with src equals to "%s"',
    async (title, poster_path, index) => {
      renderReactQueryWithRouter(Home)

      await waitFor(() => {
        expect(
          screen.getAllByTestId('movie-grid-card')[index as number]
        ).toBeTruthy()
      })

      const card = screen.getAllByTestId('movie-grid-card')[index as number]

      expect(within(card).getByText(title)).toBeTruthy()
      expect(within(card).getByRole('img').getAttribute('src')).toBe(
        poster_path
      )

      await flushPromises()
    }
  )
})
