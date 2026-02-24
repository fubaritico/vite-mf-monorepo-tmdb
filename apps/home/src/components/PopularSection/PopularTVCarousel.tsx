import {
  Carousel,
  CarouselItem,
  CarouselLoading,
  MovieCard,
} from '@vite-mf-monorepo/ui'

import { usePopularTV } from '../../hooks/usePopularTV'

import type { UseQueryResult } from '@tanstack/react-query'
import type {
  TMDBError,
  TvSeriesPopularListResponse,
} from '@vite-mf-monorepo/tmdb-client'
import type { FC } from 'react'

const PopularTVCarousel: FC = () => {
  const { data, isLoading, error } = usePopularTV() as UseQueryResult<
    TvSeriesPopularListResponse,
    TMDBError
  >

  if (isLoading) {
    return <CarouselLoading count={6} />
  }

  if (error || !data) {
    // TMDB API returns { status_message: string } on error
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
        const year = item.first_air_date
          ? new Date(item.first_air_date).getFullYear()
          : null

        return (
          <CarouselItem key={item.id}>
            <div style={{ width: 150 }}>
              <MovieCard
                id={item.id ?? 0}
                title={item.name ?? 'Unknown'}
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

export default PopularTVCarousel
