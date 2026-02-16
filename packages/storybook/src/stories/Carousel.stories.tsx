import { Carousel, CarouselItem, MovieCard } from '@vite-mf-monorepo/ui'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['standard', 'hero'],
    },
    arrowPosition: {
      control: 'select',
      options: ['sides', 'bottom-right'],
    },
    showPagination: {
      control: 'boolean',
    },
    showArrows: {
      control: 'boolean',
    },
    gap: {
      control: { type: 'number', min: 0, max: 48 },
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
  {
    id: 5,
    title: 'Avengers: Endgame',
    posterUrl:
      'https://image.tmdb.org/t/p/w342/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
    voteAverage: 8.3,
    year: 2019,
  },
  {
    id: 6,
    title: 'Joker',
    posterUrl:
      'https://image.tmdb.org/t/p/w342/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg',
    voteAverage: 8.2,
    year: 2019,
  },
]

const heroSlides = [
  {
    id: 1,
    title: 'Dune: Part Two',
    backdrop:
      'https://image.tmdb.org/t/p/w1280/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg',
    overview:
      'Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen.',
  },
  {
    id: 2,
    title: 'Oppenheimer',
    backdrop:
      'https://image.tmdb.org/t/p/w1280/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg',
    overview:
      'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
  },
  {
    id: 3,
    title: 'The Batman',
    backdrop:
      'https://image.tmdb.org/t/p/w1280/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg',
    overview:
      "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption.",
  },
]

export const Standard: Story = {
  render: () => (
    <div style={{ maxWidth: 900 }}>
      <Carousel variant="standard" arrowPosition="sides" gap={16}>
        {sampleMovies.map((movie) => (
          <CarouselItem key={movie.id}>
            <div style={{ width: 150 }}>
              <MovieCard {...movie} />
            </div>
          </CarouselItem>
        ))}
      </Carousel>
    </div>
  ),
}

export const BottomRightArrows: Story = {
  render: () => (
    <div style={{ maxWidth: 900 }}>
      <Carousel variant="standard" arrowPosition="bottom-right" gap={16}>
        {sampleMovies.map((movie) => (
          <CarouselItem key={movie.id}>
            <div style={{ width: 150 }}>
              <MovieCard {...movie} />
            </div>
          </CarouselItem>
        ))}
      </Carousel>
    </div>
  ),
}

export const Hero: Story = {
  render: () => (
    <div style={{ maxWidth: 1200 }}>
      <Carousel
        variant="hero"
        arrowPosition="bottom-right"
        gap={0}
        className="overflow-hidden rounded-lg"
      >
        {heroSlides.map((slide) => (
          <CarouselItem key={slide.id} isHero>
            <div className="relative aspect-[21/9] w-full">
              <img
                src={slide.backdrop}
                alt={slide.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 max-w-lg text-white">
                <h2 className="mb-2 text-3xl font-bold">{slide.title}</h2>
                <p className="text-sm opacity-90">{slide.overview}</p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </Carousel>
    </div>
  ),
}

export const NoPagination: Story = {
  render: () => (
    <div style={{ maxWidth: 900 }}>
      <Carousel
        variant="standard"
        arrowPosition="sides"
        showPagination={false}
        gap={16}
      >
        {sampleMovies.slice(0, 4).map((movie) => (
          <CarouselItem key={movie.id}>
            <div style={{ width: 150 }}>
              <MovieCard {...movie} />
            </div>
          </CarouselItem>
        ))}
      </Carousel>
    </div>
  ),
}

export const NoArrows: Story = {
  render: () => (
    <div style={{ maxWidth: 900 }}>
      <Carousel variant="standard" showArrows={false} gap={16}>
        {sampleMovies.slice(0, 4).map((movie) => (
          <CarouselItem key={movie.id}>
            <div style={{ width: 150 }}>
              <MovieCard {...movie} />
            </div>
          </CarouselItem>
        ))}
      </Carousel>
    </div>
  ),
}
