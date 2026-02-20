import { MovieCard } from '@vite-mf-monorepo/ui'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof MovieCard> = {
  title: 'Design System/MovieCard',
  component: MovieCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    voteAverage: {
      control: { type: 'range', min: 0, max: 10, step: 0.1 },
    },
    year: {
      control: { type: 'number', min: 1900, max: 2030 },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const sampleMovies = [
  {
    id: 1,
    title: 'Dune: Part Two',
    posterUrl:
      'https://image.tmdb.org/t/p/w342/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg',
    voteAverage: 8.3,
    year: 2024,
  },
  {
    id: 2,
    title: 'Oppenheimer',
    posterUrl:
      'https://image.tmdb.org/t/p/w342/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    voteAverage: 8.1,
    year: 2023,
  },
  {
    id: 3,
    title: 'The Batman',
    posterUrl:
      'https://image.tmdb.org/t/p/w342/74xTEgt7R36Fpooo50r9T25onhq.jpg',
    voteAverage: 7.7,
    year: 2022,
  },
  {
    id: 4,
    title: 'Spider-Man: No Way Home',
    posterUrl:
      'https://image.tmdb.org/t/p/w342/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
    voteAverage: 8.0,
    year: 2021,
  },
]

export const Playground: Story = {
  args: {
    id: 1,
    title: 'Dune: Part Two',
    posterUrl:
      'https://image.tmdb.org/t/p/w342/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg',
    voteAverage: 8.3,
    year: 2024,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 180 }}>
        <Story />
      </div>
    ),
  ],
}

export const Showcase: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div className="flex flex-col gap-8">
      {/* Grid of cards */}
      <section>
        <h3 className="mb-4 text-sm font-semibold text-gray-500">Movie Grid</h3>
        <div className="grid grid-cols-4 gap-4" style={{ width: 800 }}>
          {sampleMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              {...movie}
              onClick={() => {
                console.warn(`Clicked: ${movie.title}`)
              }}
            />
          ))}
        </div>
      </section>

      {/* Different ratings */}
      <section>
        <h3 className="mb-4 text-sm font-semibold text-gray-500">
          Rating Colors
        </h3>
        <div className="flex gap-4" style={{ width: 600 }}>
          <div style={{ width: 150 }}>
            <MovieCard
              id={10}
              title="High Rating (Green)"
              posterUrl="https://image.tmdb.org/t/p/w342/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg"
              voteAverage={8.5}
              year={2024}
            />
          </div>
          <div style={{ width: 150 }}>
            <MovieCard
              id={11}
              title="Medium Rating (Yellow)"
              posterUrl="https://image.tmdb.org/t/p/w342/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg"
              voteAverage={5.5}
              year={2024}
            />
          </div>
          <div style={{ width: 150 }}>
            <MovieCard
              id={12}
              title="Low Rating (Red)"
              posterUrl="https://image.tmdb.org/t/p/w342/74xTEgt7R36Fpooo50r9T25onhq.jpg"
              voteAverage={3.0}
              year={2024}
            />
          </div>
        </div>
      </section>

      {/* Without year */}
      <section>
        <h3 className="mb-4 text-sm font-semibold text-gray-500">
          Without Year
        </h3>
        <div style={{ width: 150 }}>
          <MovieCard
            id={20}
            title="Movie Without Year"
            posterUrl="https://image.tmdb.org/t/p/w342/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg"
            voteAverage={7.5}
          />
        </div>
      </section>
    </div>
  ),
}
