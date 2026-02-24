import {
  Carousel,
  CarouselItem,
  CarouselLoading,
  MovieCard,
} from '@vite-mf-monorepo/ui'

import { useFreeToWatchMovies } from '../../hooks/useFreeToWatch'

import type { UseQueryResult } from '@tanstack/react-query'
import type {
  DiscoverMovieResponse,
  TMDBError,
} from '@vite-mf-monorepo/tmdb-client'
import type { FC } from 'react'

const FreeToWatchMoviesCarousel: FC = () => {
  const { data, isLoading, error } = useFreeToWatchMovies() as UseQueryResult<
    DiscoverMovieResponse,
    TMDBError
  >

  if (isLoading) {
    return <CarouselLoading count={6} />
  }

  if (error || !data) {
    const errorMsg =
      error?.status_message ?? (!data ? 'No data' : 'Failed to load')
    return <Carousel errorMessage={errorMsg} />
  }

  return (
    <Carousel rounded={false}>
      {data.results?.map((item) => {
        const posterUrl = item.poster_path
          ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
          : ''
        const year = item.release_date
          ? new Date(item.release_date).getFullYear()
          : null

        return (
          <CarouselItem key={item.id}>
            <div style={{ width: 150 }}>
              <MovieCard
                as="link"
                to={`/movie/${String(item.id)}`}
                id={item.id ?? 0}
                title={item.title ?? 'Unknown'}
                posterUrl={posterUrl}
                voteAverage={item.vote_average ?? 0}
                year={year}
              />
            </div>
          </CarouselItem>
        )
      })}
    </Carousel>
  )
}

export default FreeToWatchMoviesCarousel
