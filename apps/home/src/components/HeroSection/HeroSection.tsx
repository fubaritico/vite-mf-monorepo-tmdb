import { Carousel, CarouselItem, Skeleton } from '@vite-mf-monorepo/ui'

import { useNowPlayingMovies } from '../../hooks/useNowPlayingMovies'

import type { UseQueryResult } from '@tanstack/react-query'
import type {
  MovieNowPlayingListResponse,
  TMDBError,
} from '@vite-mf-monorepo/tmdb-client'
import type { FC } from 'react'

const HeroSection: FC = () => {
  const { data, isLoading, error } = useNowPlayingMovies() as UseQueryResult<
    MovieNowPlayingListResponse,
    TMDBError
  >

  if (isLoading) {
    return (
      <Skeleton
        variant="rectangle"
        width="w-full"
        aspectRatio="21/9"
        rounded={false}
      />
    )
  }

  if (error || !data) {
    const errorMsg =
      error?.status_message ?? (!data ? 'No data' : 'Failed to load')
    return <Carousel variant="hero" rounded={false} errorMessage={errorMsg} />
  }

  return (
    <Carousel variant="hero" rounded={false} gap={0}>
      {data.results?.slice(0, 6).map((item) => {
        const backdropUrl = item.backdrop_path
          ? `https://image.tmdb.org/t/p/original${item.backdrop_path}`
          : ''

        return (
          <CarouselItem key={item.id} isHero>
            <div className="relative aspect-[21/9] w-full">
              <img
                src={backdropUrl}
                alt={item.title ?? 'Unknown'}
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-8 left-8 max-w-lg text-white">
                <h2 className="mb-2 text-3xl font-bold text-shadow-medium">
                  {item.title ?? 'Unknown'}
                </h2>
                <p className="text-sm text-shadow-strong">{item.overview}</p>
              </div>
            </div>
          </CarouselItem>
        )
      })}
    </Carousel>
  )
}

export default HeroSection
