import { getOptimizedImageUrl } from '@vite-mf-monorepo/shared'
import {
  Carousel,
  CarouselItem,
  CarouselLoading,
  MovieCard,
  Typography,
} from '@vite-mf-monorepo/ui'

import { useMovieSimilar } from '../../hooks'

import type { MovieSimilarResponse, TMDBError } from '@fubar-it-co/tmdb-client'
import type { UseQueryResult } from '@tanstack/react-query'
import type { FC } from 'react'

interface SimilarMoviesCarouselProps {
  id: number
}

const SimilarMoviesCarousel: FC<SimilarMoviesCarouselProps> = ({ id }) => {
  const { data, isLoading, error } = useMovieSimilar(id) as UseQueryResult<
    MovieSimilarResponse,
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

  if (!data.results?.length) {
    return (
      <Carousel>
        <Typography variant="body" className="mda:text-muted-foreground">
          No similar movies
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

export default SimilarMoviesCarousel
