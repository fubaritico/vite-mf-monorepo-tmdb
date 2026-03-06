import { getOptimizedImageUrl } from '@vite-mf-monorepo/shared'
import {
  Carousel,
  CarouselItem,
  CarouselLoading,
  MovieCard,
  Typography,
} from '@vite-mf-monorepo/ui'

import { useTVSeriesRecommendations } from '../../hooks'

import type { UseQueryResult } from '@tanstack/react-query'
import type {
  TMDBError,
  TvSeriesSimilarResponse,
} from '@vite-mf-monorepo/tmdb-client'
import type { FC } from 'react'

interface RecommendedTVCarouselProps {
  id: number
}

const RecommendedTVCarousel: FC<RecommendedTVCarouselProps> = ({ id }) => {
  // Note: Using TvSeriesSimilarResponse as type because recommendations and similar
  // have identical response structures from TMDB API
  const { data, isLoading, error } = useTVSeriesRecommendations(
    id
  ) as UseQueryResult<TvSeriesSimilarResponse, TMDBError>

  if (isLoading) {
    return <CarouselLoading count={6} />
  }

  if (error || !data) {
    const errorMsg =
      error?.status_message ?? (!data ? 'No data' : 'Failed to load')
    return <Carousel errorMessage={errorMsg} />
  }

  if (!data.results?.length) {
    return (
      <Carousel>
        <Typography variant="body" className="mda:text-muted-foreground">
          No TV series recommendations
        </Typography>
      </Carousel>
    )
  }

  return (
    <Carousel rounded={false}>
      {data.results.slice(0, 20).map((item) => {
        const posterUrl = item.poster_path
          ? getOptimizedImageUrl(item.poster_path, 'w92', 60)
          : ''
        const year = item.first_air_date
          ? new Date(item.first_air_date).getFullYear()
          : null

        return (
          <CarouselItem key={item.id}>
            <div style={{ width: 150 }}>
              <MovieCard
                as="link"
                to={`/tv/${String(item.id)}`}
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

export default RecommendedTVCarousel
