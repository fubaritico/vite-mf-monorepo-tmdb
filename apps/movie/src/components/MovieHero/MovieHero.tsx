import { Badge, Rating, Typography } from '@vite-mf-monorepo/ui'
import clsx from 'clsx'

import type { FC } from 'react'

export interface MovieHeroProps {
  /** Movie title */
  title: string
  /** Movie tagline */
  tagline?: string
  /** Backdrop image URL */
  backdropUrl: string
  /** Release date (formatted) */
  releaseDate?: string
  /** Runtime in minutes */
  runtime?: number
  /** Vote average (0-10) */
  voteAverage?: number
  /** Array of genre names */
  genres?: string[]
  /** Additional class name */
  className?: string
}

const MovieHero: FC<MovieHeroProps> = ({
  title,
  tagline,
  backdropUrl,
  releaseDate,
  runtime,
  voteAverage,
  genres = [],
  className,
}) => {
  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${String(hours)}h ${String(mins)}m`
  }

  return (
    <div className={`mv:relative mv:w-full ${className ?? ''}`}>
      {/* Backdrop Image */}
      <div className="mv:relative mv:hero-height mv:w-full mv:overflow-hidden">
        <img
          src={backdropUrl}
          alt={title}
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
              {title}
            </Typography>

            {/* Tagline */}
            {tagline && (
              <Typography
                variant="lead"
                className="mv:mb-2 mv:sm:mb-3 mv:md:mb-4 mv:italic mv:text-white! mv:opacity-90 mv:text-shadow-strong"
              >
                {tagline}
              </Typography>
            )}

            {/* Metadata */}
            <div className="mv:mb-2 mv:sm:mb-3 mv:md:mb-4 mv:flex mv:items-center mv:gap-2 mv:sm:gap-3 mv:md:gap-4 mv:text-white">
              {releaseDate && (
                <Typography
                  variant="body"
                  className="mv:text-white mv:text-shadow-strong"
                >
                  {releaseDate}
                </Typography>
              )}
              {runtime && (
                <>
                  <span className="mv:text-white">•</span>
                  <Typography
                    variant="body"
                    className="mv:text-white mv:text-shadow-strong"
                  >
                    {formatRuntime(runtime)}
                  </Typography>
                </>
              )}
              {voteAverage !== undefined && (
                <>
                  <span className="mv:text-white mv:text-shadow-strong">•</span>
                  <Rating value={voteAverage} size="sm" variant="circle" />
                </>
              )}
            </div>

            {/* Genres */}
            {genres.length > 0 && (
              <div className="mv:flex mv:flex-wrap mv:gap-2">
                {genres.map((genre) => (
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
