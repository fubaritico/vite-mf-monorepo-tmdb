import clsx from 'clsx'

import { Card } from '../Card'
import { Image } from '../Image'
import { Rating } from '../Rating'

import type { FC } from 'react'

export interface MovieCardProps {
  /** Movie ID for navigation */
  id: number
  /** Movie title */
  title: string
  /** Poster URL (full URL or TMDB path) */
  posterUrl: string
  /** Vote average (0-10) */
  voteAverage: number
  /** Release year */
  year?: number | null
  /** Additional class name */
  className?: string
  /** Click handler */
  onClick?: () => void
}

const MovieCard: FC<MovieCardProps> = ({
  id,
  title,
  posterUrl,
  voteAverage,
  year,
  className,
  onClick,
}) => {
  return (
    <Card
      variant="ghost"
      className={clsx(
        'ui:group ui:relative ui:flex ui:cursor-pointer ui:flex-col ui:overflow-hidden',
        'ui:transition-transform ui:duration-200 hover:ui:scale-[1.02]',
        className
      )}
      onClick={onClick}
      data-testid={`movie-card-${String(id)}`}
    >
      {/* Poster */}
      <div className="ui:relative ui:aspect-[2/3] ui:w-full ui:overflow-hidden ui:rounded-md ui:bg-gray-200">
        <Image
          src={posterUrl}
          alt={title}
          className="ui:h-full ui:w-full ui:object-cover"
        />
        {/* Rating badge */}
        <div className="ui:absolute ui:bottom-2 ui:right-2 ui:flex ui:items-center ui:justify-center ui:rounded-full ui:bg-white/80 ui:p-1">
          <Rating
            value={voteAverage}
            size="sm"
            variant="circle"
            trackClassName="ui:text-gray-200"
            className="ui:drop-shadow"
          />
        </div>
      </div>

      {/* Content */}
      <div className="ui:mt-2 ui:flex ui:flex-col ui:gap-0.5 ui:px-1">
        <h3
          className="ui:line-clamp-2 ui:text-sm ui:font-medium ui:text-foreground"
          title={title}
        >
          {title}
        </h3>
        {year && (
          <span className="ui:text-xs ui:text-muted-foreground">{year}</span>
        )}
      </div>
    </Card>
  )
}

export default MovieCard
