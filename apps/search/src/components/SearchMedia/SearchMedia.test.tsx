import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderReactQueryWithRouter } from '@vite-mf-monorepo/shared/test-utils'
import { describe, expect, it } from 'vitest'

import SearchMedia from './SearchMedia'

import type { SearchResult } from '../SearchTypeahead/searchTypeahead.utils'

const mockMovies: SearchResult[] = [
  {
    id: 550,
    title: 'Fight Club',
    media_type: 'movie',
    release_date: '1999-10-15',
    vote_average: 8.4,
    poster_path: '/poster1.jpg',
  } as SearchResult,
  {
    id: 680,
    title: 'Pulp Fiction',
    media_type: 'movie',
    release_date: '1994-09-10',
    vote_average: 8.5,
    poster_path: '/poster2.jpg',
  } as SearchResult,
]

const mockManyMovies: SearchResult[] = Array.from({ length: 15 }, (_, i) => ({
  id: 100 + i,
  title: `Movie ${String(i + 1)}`,
  media_type: 'movie',
  release_date: '2020-01-01',
  vote_average: 7.0,
  poster_path: `/poster${String(i)}.jpg`,
})) as SearchResult[]

describe('SearchMedia', () => {
  it('should render nothing when items is empty', () => {
    const { container } = renderReactQueryWithRouter(
      <SearchMedia items={[]} title="movies" />,
      '/',
      '/'
    )
    expect(container.innerHTML).toBe('')
  })

  it('should render movie titles', () => {
    renderReactQueryWithRouter(
      <SearchMedia items={mockMovies} title="movies" />,
      '/',
      '/'
    )
    expect(screen.getByText('Fight Club')).toBeInTheDocument()
    expect(screen.getByText('Pulp Fiction')).toBeInTheDocument()
  })

  it('should render the results count header with title', () => {
    renderReactQueryWithRouter(
      <SearchMedia items={mockMovies} title="movies" />,
      '/',
      '/'
    )
    expect(screen.getByText('movies')).toBeInTheDocument()
  })

  it('should render with TV shows title', () => {
    renderReactQueryWithRouter(
      <SearchMedia items={mockMovies} title="TV shows" />,
      '/',
      '/'
    )
    expect(screen.getByText('TV shows')).toBeInTheDocument()
  })

  it('should render release years', () => {
    renderReactQueryWithRouter(
      <SearchMedia items={mockMovies} title="movies" />,
      '/',
      '/'
    )
    expect(screen.getByText('1999')).toBeInTheDocument()
    expect(screen.getByText('1994')).toBeInTheDocument()
  })

  it('should render links to movie pages', () => {
    renderReactQueryWithRouter(
      <SearchMedia items={mockMovies} title="movies" />,
      '/',
      '/'
    )
    const links = screen.getAllByRole('link')
    expect(links.some((l) => l.getAttribute('href') === '/movie/550')).toBe(
      true
    )
    expect(links.some((l) => l.getAttribute('href') === '/movie/680')).toBe(
      true
    )
  })

  it('should render "Show more" button when more than 10 items', () => {
    renderReactQueryWithRouter(
      <SearchMedia items={mockManyMovies} title="movies" />,
      '/',
      '/'
    )
    expect(screen.getByText('Show more')).toBeInTheDocument()
    expect(screen.getAllByRole('link')).toHaveLength(10)
  })

  it('should not render "Show more" button when 10 or fewer items', () => {
    renderReactQueryWithRouter(
      <SearchMedia items={mockMovies} title="movies" />,
      '/',
      '/'
    )
    expect(screen.queryByText('Show more')).not.toBeInTheDocument()
  })

  it('should reveal next items when "Show more" is clicked', async () => {
    const user = userEvent.setup()

    renderReactQueryWithRouter(
      <SearchMedia items={mockManyMovies} title="movies" />,
      '/',
      '/'
    )

    expect(screen.getAllByRole('link')).toHaveLength(10)
    await user.click(screen.getByText('Show more'))
    expect(screen.getAllByRole('link')).toHaveLength(15)
    expect(screen.queryByText('Show more')).not.toBeInTheDocument()
  })

  it('should render correct count in header with many items', () => {
    renderReactQueryWithRouter(
      <SearchMedia items={mockManyMovies} title="movies" />,
      '/',
      '/'
    )
    expect(screen.getByText('movies')).toBeInTheDocument()
  })
})
