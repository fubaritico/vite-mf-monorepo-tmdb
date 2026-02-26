import { getImageUrl } from '@vite-mf-monorepo/shared'
import { Badge, Rating, Skeleton, Typography } from '@vite-mf-monorepo/ui'
import clsx from 'clsx'
import { useLocation, useParams } from 'react-router-dom'

import { useMediaDetails } from '../../hooks'
import { formatRuntime, getMediaTypeFromPath, isMovie } from '../../utils'

import type { FC } from 'react'

const MovieHero: FC = () => {
  const location = useLocation()
  const { id } = useParams<{ id: string }>()
  const contentId = Number(id)

  const mediaType = getMediaTypeFromPath(location.pathname)

  console.warn('[MovieHero] Media type detection:', {
    pathname: location.pathname,
    mediaType,
    contentId,
  })

  const {
    data: media,
    isLoading,
    error,
  } = useMediaDetails(mediaType, contentId)

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

  if (error || !media) {
    console.warn('[MovieHero] Error loading media:', {
      contentId,
      error,
      errorMessage: error?.status_message,
    })
    return (
      <div className="mv:flex mv:h-[400px] mv:w-full mv:items-center mv:justify-center mv:bg-muted">
        <Typography variant="body" className="mv:text-destructive">
          {error?.status_message ?? 'Failed to load media details'}
        </Typography>
      </div>
    )
  }

  // Extract properties with Movie/TV compatibility using type guard
  const title = isMovie(media) ? media.title : media.name
  const releaseDate = isMovie(media) ? media.release_date : media.first_air_date
  const runtime = isMovie(media) ? media.runtime : undefined
  const numberOfSeasons = !isMovie(media)
    ? (media as { number_of_seasons?: number }).number_of_seasons
    : undefined
  const numberOfEpisodes = !isMovie(media)
    ? (media as { number_of_episodes?: number }).number_of_episodes
    : undefined

  const backdropUrl = media.backdrop_path
    ? getImageUrl(media.backdrop_path, 'original')
    : ''

  const releaseYear = releaseDate
    ? new Date(releaseDate).getFullYear().toString()
    : undefined
  const genreNames = media.genres?.map((g) => g.name ?? '') ?? []

  return (
    <div className="mv:relative mv:w-full">
      {/* Backdrop Image */}
      <div className="mv:relative mv:hero-height mv:w-full mv:overflow-hidden">
        <img
          src={backdropUrl}
          alt={title ?? 'Movie'}
          className="mv:relative mv:h-full mv:w-full mv:object-cover mv:object-center mv:z-0"
          onError={(e) => {
            console.warn('[MovieHero] Image failed to load:', {
              src: backdropUrl,
              alt: title,
              error: e,
            })
          }}
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
            {media.tagline && (
              <Typography
                variant="lead"
                className="mv:mb-2 mv:sm:mb-3 mv:md:mb-4 mv:italic mv:text-white! mv:opacity-90 mv:text-shadow-strong"
              >
                {media.tagline}
              </Typography>
            )}

            {/* Metadata */}
            <div className="mv:mb-2 mv:sm:mb-3 mv:md:mb-4 mv:flex mv:items-center mv:gap-2 mv:text-white">
              {releaseYear && (
                <Typography
                  as="span"
                  variant="body"
                  className="mv:text-white mv:text-shadow-strong"
                >
                  {releaseYear}
                </Typography>
              )}
              {runtime && (
                <>
                  <Typography
                    as="span"
                    variant="body"
                    className="mv:text-white mv:text-shadow-strong"
                  >
                    •
                  </Typography>
                  <Typography
                    as="span"
                    variant="body"
                    className="mv:text-white mv:text-shadow-strong"
                  >
                    {formatRuntime(runtime)}
                  </Typography>
                </>
              )}
              {numberOfSeasons && (
                <>
                  <Typography
                    as="span"
                    variant="body"
                    className="mv:text-white mv:text-shadow-strong"
                  >
                    •
                  </Typography>
                  <Typography
                    as="span"
                    variant="body"
                    className="mv:text-white mv:text-shadow-strong"
                  >
                    {numberOfSeasons} Season{numberOfSeasons > 1 ? 's' : ''}
                  </Typography>
                </>
              )}
              {numberOfEpisodes && (
                <>
                  <Typography
                    as="span"
                    variant="body"
                    className="mv:text-white mv:text-shadow-strong"
                  >
                    •
                  </Typography>
                  <Typography
                    as="span"
                    variant="body"
                    className="mv:text-white mv:text-shadow-strong"
                  >
                    {numberOfEpisodes} Episode{numberOfEpisodes > 1 ? 's' : ''}
                  </Typography>
                </>
              )}
              {media.vote_average !== undefined && (
                <>
                  <Typography
                    as="span"
                    variant="body"
                    className="mv:text-white mv:text-shadow-strong"
                  >
                    •
                  </Typography>
                  <Rating
                    value={media.vote_average}
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
