import { SearchMedia } from '@vite-mf-monorepo/search'

import { withRouter } from '../../.storybook/decorators/withRouter'

import type { Meta, StoryObj } from '@storybook/react'
import type { SearchResult } from '@vite-mf-monorepo/search/components/SearchTypeahead/searchTypeahead.utils'

const mockMovies: SearchResult[] = [
  {
    id: 550,
    title: 'Fight Club',
    media_type: 'movie',
    release_date: '1999-10-15',
    vote_average: 8.4,
    poster_path: '/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
  },
  {
    id: 680,
    title: 'Pulp Fiction',
    media_type: 'movie',
    release_date: '1994-09-10',
    vote_average: 8.5,
    poster_path: '/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
  },
  {
    id: 278,
    title: 'The Shawshank Redemption',
    media_type: 'movie',
    release_date: '1994-09-23',
    vote_average: 8.7,
    poster_path: '/9O7gLzmreU0nGkIB6K3BsJbzvNv.jpg',
  },
  {
    id: 238,
    title: 'The Godfather',
    media_type: 'movie',
    release_date: '1972-03-14',
    vote_average: 8.7,
    poster_path: '/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
  },
  {
    id: 155,
    title: 'The Dark Knight',
    media_type: 'movie',
    release_date: '2008-07-16',
    vote_average: 8.5,
    poster_path: '/qJ2tW6WMUDux911BTUgMe1F608y.jpg',
  },
] as SearchResult[]

const mockManyMovies: SearchResult[] = Array.from({ length: 15 }, (_, i) => ({
  id: 100 + i,
  title: `Movie ${String(i + 1)}`,
  media_type: 'movie',
  release_date: `${String(2010 + i)}-06-15`,
  vote_average: 6.0 + i * 0.2,
  poster_path: null,
})) as SearchResult[]

const mockTvShows: SearchResult[] = [
  {
    id: 1396,
    name: 'Breaking Bad',
    media_type: 'tv',
    first_air_date: '2008-01-20',
    vote_average: 8.9,
    poster_path: '/ztkUQFLlC19CCMYHW73UJ9YoVMj.jpg',
  },
  {
    id: 1399,
    name: 'Game of Thrones',
    media_type: 'tv',
    first_air_date: '2011-04-17',
    vote_average: 8.4,
    poster_path: '/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg',
  },
  {
    id: 66732,
    name: 'Stranger Things',
    media_type: 'tv',
    first_air_date: '2016-07-15',
    vote_average: 8.6,
    poster_path: '/49WJfeN0moxb9IPfGn8AIqMGskD.jpg',
  },
] as SearchResult[]

const meta = {
  title: 'Search/SearchMedia',
  component: SearchMedia,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [withRouter()],
} satisfies Meta<typeof SearchMedia>

export default meta
type Story = StoryObj<typeof meta>

/** Movies list with posters, years and star ratings */
export const Movies: Story = {
  args: {
    items: mockMovies,
    title: 'Movies',
  },
}

/** TV shows list */
export const TVShows: Story = {
  args: {
    items: mockTvShows,
    title: 'TV Shows',
  },
}

/** More than 10 items — "Show more" button visible */
export const WithShowMore: Story = {
  args: {
    items: mockManyMovies,
    title: 'Movies',
  },
}

/** Empty state — renders nothing */
export const Empty: Story = {
  args: {
    items: [],
    title: 'Movies',
  },
}

/** Loading more results from API */
export const LoadingMore: Story = {
  args: {
    items: mockMovies,
    title: 'Movies',
    hasMore: true,
    isLoadingMore: true,
  },
}
