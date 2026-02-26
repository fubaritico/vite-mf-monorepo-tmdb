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
                  className="hm:relative hm:h-full hm:w-full hm:object-cover hm:object-center hm:z-0"
                />
                {/* Gradient Overlay */}
                <div className="hm:absolute hm:inset-0 hm:bg-gradient-to-t hm:from-black/80 hm:via-black/40 hm:to-transparent hm:z-1 hm:top-0 hm:left-0 hm:right-0 hm:bottom-0" />

                {/* Content Overlay */}
                <div className="hm:absolute hm:left-1/2 hm:-translate-x-1/2 hm:z-2 hm:w-full hm:max-w-screen-xl hm:px-4 hm:sm:px-5 hm:md:px-6 hm:lg:px-8 hm:bottom-4 hm:sm:bottom-5 hm:md:bottom-6 hm:lg:bottom-8 hm:flex hm:justify-start hm:items-end">
                  <div className="hm:flex hm:flex-col hm:w-full hm:max-w-lg">
                    <Typography
                      variant="h2"
                      className="hm:mb-2 hm:text-white! hm:text-shadow-medium"
                    >
                      {item.title ?? 'Unknown'}
                    </Typography>
                    <Typography
                      variant="body-sm"
                      className="hm:text-white! hm:text-shadow-strong"
                    >
                      {item.overview ?? ''}
                    </Typography>
                  </div>
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
