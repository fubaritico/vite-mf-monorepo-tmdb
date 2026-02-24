import {
  Carousel,
  CarouselItem,
  Skeleton,
  Typography,
} from '@vite-mf-monorepo/ui'
import { Link } from 'react-router-dom'

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
        width="hm:w-full"
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
            <Link
              to={`/movie/${String(item.id)}`}
              className="hm:block hm:no-underline"
            >
              <div className="hm:relative hm:hero-height hm:w-full hm:overflow-hidden">
                <img
                  src={backdropUrl}
                  alt={item.title ?? 'Unknown'}
                  className="hm:h-full hm:w-full hm:object-cover hm:object-center"
                />
                <div className="hm:absolute hm:bottom-8 hm:left-8 hm:max-w-lg">
                  <Typography
                    variant="h2"
                    className="hm:mb-2 hm:text-white hm:text-shadow-medium"
                  >
                    {item.title ?? 'Unknown'}
                  </Typography>
                  <Typography
                    variant="body-sm"
                    className="hm:text-white hm:text-shadow-strong"
                  >
                    {item.overview ?? ''}
                  </Typography>
                </div>
              </div>
            </Link>
          </CarouselItem>
        )
      })}
    </Carousel>
  )
}

export default HeroSection
