import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderReactQueryWithRouter } from '@vite-mf-monorepo/shared/test-utils'
import { describe, expect, it, vi } from 'vitest'

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
    expect(screen.getByText('2 results for movies')).toBeInTheDocument()
  })

  it('should render with TV shows title', () => {
    renderReactQueryWithRouter(
      <SearchMedia items={mockMovies} title="TV shows" />,
      '/',
      '/'
    )
    expect(screen.getByText('2 results for TV shows')).toBeInTheDocument()
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

  it('should render "More results" button when hasMore is true', () => {
    renderReactQueryWithRouter(
      <SearchMedia
        items={mockMovies}
        title="movies"
        hasMore
        onLoadMore={vi.fn()}
      />,
      '/',
      '/'
    )
    expect(screen.getByText('More results')).toBeInTheDocument()
  })

  it('should not render "More results" button when hasMore is false', () => {
    renderReactQueryWithRouter(
      <SearchMedia items={mockMovies} title="movies" />,
      '/',
      '/'
    )
    expect(screen.queryByText('More results')).not.toBeInTheDocument()
  })

  it('should call onLoadMore when "More results" is clicked', async () => {
    const onLoadMore = vi.fn()
    const user = userEvent.setup()

    renderReactQueryWithRouter(
      <SearchMedia
        items={mockMovies}
        title="movies"
        hasMore
        onLoadMore={onLoadMore}
      />,
      '/',
      '/'
    )

    await user.click(screen.getByText('More results'))
    expect(onLoadMore).toHaveBeenCalledOnce()
  })

  it('should show "Loading..." when isLoadingMore is true', () => {
    renderReactQueryWithRouter(
      <SearchMedia
        items={mockMovies}
        title="movies"
        hasMore
        onLoadMore={vi.fn()}
        isLoadingMore
      />,
      '/',
      '/'
    )
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })
})
