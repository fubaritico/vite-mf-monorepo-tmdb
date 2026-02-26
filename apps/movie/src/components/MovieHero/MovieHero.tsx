import { useQuery } from '@tanstack/react-query'
import { getImageUrl } from '@vite-mf-monorepo/shared'
import { movieDetailsOptions } from '@vite-mf-monorepo/tmdb-client'
import { Badge, Rating, Skeleton, Typography } from '@vite-mf-monorepo/ui'
import clsx from 'clsx'
import { useParams } from 'react-router-dom'

import type { UseQueryResult } from '@tanstack/react-query'
import type {
  MovieDetailsResponse,
  TMDBError,
} from '@vite-mf-monorepo/tmdb-client'
import type { FC } from 'react'

const MovieHero: FC = () => {
  const { id } = useParams<{ id: string }>()
  const movieId = Number(id)

  const {
    data: movie,
    isLoading,
    error,
  } = useQuery({
    ...movieDetailsOptions({ path: { movie_id: movieId } }),
  }) as UseQueryResult<MovieDetailsResponse, TMDBError>

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${String(hours)}h ${String(mins)}m`
  }

  if (isLoading) {
    return (
      <Skeleton
        variant="rectangle"
        width="mv:w-full"
        className="mv:hero-height"
        rounded={false}
      />
    )
  }

  if (error || !movie) {
    return (
      <div className="mv:flex mv:h-[400px] mv:w-full mv:items-center mv:justify-center mv:bg-muted">
        <Typography variant="body" className="mv:text-destructive">
          {error?.status_message ?? 'Failed to load movie details'}
        </Typography>
      </div>
    )
  }

  const backdropUrl = movie.backdrop_path
    ? getImageUrl(movie.backdrop_path, 'original')
    : ''
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear().toString()
    : undefined
  const genreNames = movie.genres?.map((g) => g.name ?? '') ?? []

  return (
    <div className="mv:relative mv:w-full">
      {/* Backdrop Image */}
      <div className="mv:relative mv:hero-height mv:w-full mv:overflow-hidden">
        <img
          src={backdropUrl}
          alt={movie.title ?? 'Movie'}
          className="mv:relative mv:h-full mv:w-full mv:object-cover mv:object-center mv:z-0"
        />
        {/* Gradient Overlay */}
        <div className="mv:absolute mv:inset-0 mv:bg-gradient-to-t mv:from-black/80 mv:via-black/40 mv:to-transparent mv:z-1 mv:top-0 mv:left-0 mv:right-0 mv:bottom-0" />

        {/* Content Overlay */}
        <div
          className={clsx(
            'mv:absolute mv:left-1/2 mv:-translate-x-1/2 mv:z-2 mv:w-full mv:max-w-screen-xl',
            'mv:px-4 mv:sm:px-5 mv:md:px-6 mv:lg:px-8',
            'mv:bottom-4 mv:sm:bottom-5 mv:md:bottom-6 mv:lg:bottom-8',
            'mv:flex mv:justify-start mv:items-end'
          )}
        >
          <div className="mv:flex mv:flex-col mv:w-full">
            {/* Title */}
            <Typography
              variant="h1"
              className="mv:mb-1 mv:sm:mb-2 mv:text-white! mv:text-shadow-medium"
            >
              {movie.title}
            </Typography>

            {/* Tagline */}
            {movie.tagline && (
              <Typography
                variant="lead"
                className="mv:mb-2 mv:sm:mb-3 mv:md:mb-4 mv:italic mv:text-white! mv:opacity-90 mv:text-shadow-strong"
              >
                {movie.tagline}
              </Typography>
            )}

            {/* Metadata */}
            <div className="mv:mb-2 mv:sm:mb-3 mv:md:mb-4 mv:flex mv:items-center mv:gap-2 mv:sm:gap-3 mv:md:gap-4 mv:text-white">
              {releaseYear && (
                <Typography
                  variant="body"
                  className="mv:text-white mv:text-shadow-strong"
                >
                  {releaseYear}
                </Typography>
              )}
              {movie.runtime && (
                <>
                  <span className="mv:text-white">•</span>
                  <Typography
                    variant="body"
                    className="mv:text-white mv:text-shadow-strong"
                  >
                    {formatRuntime(movie.runtime)}
                  </Typography>
                </>
              )}
              {movie.vote_average !== undefined && (
                <>
                  <span className="mv:text-white mv:text-shadow-strong">•</span>
                  <Rating
                    value={movie.vote_average}
                    size="sm"
                    variant="circle"
                  />
                </>
              )}
            </div>

            {/* Genres */}
            {genreNames.length > 0 && (
              <div className="mv:flex mv:flex-wrap mv:gap-2">
                {genreNames.map((genre) => (
                  <Badge key={genre} variant="secondary" size="sm">
                    {genre}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieHero
