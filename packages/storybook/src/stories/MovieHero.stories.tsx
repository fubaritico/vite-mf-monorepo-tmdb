import { MovieHero } from '@vite-mf-monorepo/movie'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Movie/MovieHero',
  component: MovieHero,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof MovieHero>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'The Shawshank Redemption',
    tagline: 'Fear can hold you prisoner. Hope can set you free.',
    backdropUrl:
      'https://image.tmdb.org/t/p/original/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg',
    releaseDate: 'September 23, 1994',
    runtime: 142,
    voteAverage: 8.7,
    genres: ['Drama', 'Crime'],
  },
}

export const WithoutTagline: Story = {
  args: {
    title: 'Inception',
    backdropUrl:
      'https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg',
    releaseDate: 'July 16, 2010',
    runtime: 148,
    voteAverage: 8.4,
    genres: ['Action', 'Science Fiction', 'Adventure'],
  },
}

export const WithManyGenres: Story = {
  args: {
    title: 'The Dark Knight',
    tagline: 'Why So Serious?',
    backdropUrl:
      'https://image.tmdb.org/t/p/original/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg',
    releaseDate: 'July 18, 2008',
    runtime: 152,
    voteAverage: 9.0,
    genres: ['Drama', 'Action', 'Crime', 'Thriller'],
  },
}

export const MinimalData: Story = {
  args: {
    title: 'Unknown Movie',
    backdropUrl:
      'https://image.tmdb.org/t/p/original/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg',
  },
}
