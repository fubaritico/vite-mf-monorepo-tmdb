import {
  Badge,
  HeroImage,
  Rating,
  Skeleton,
  Typography,
} from '@vite-mf-monorepo/ui'
import clsx from 'clsx'
import { useLocation, useParams } from 'react-router-dom'

import { useMediaDetails } from '../../hooks'
import { formatRuntime, getMediaTypeFromPath, isMovie } from '../../utils'
import { isTvSeries } from '../../utils/typeGuards.ts'

import type { FC } from 'react'

const MediaHero: FC = () => {
  const location = useLocation()
  const { id } = useParams<{ id: string }>()
  const contentId = Number(id)

  const mediaType = getMediaTypeFromPath(location.pathname)

  const {
    data: media,
    isLoading,
    error,
  } = useMediaDetails(mediaType, contentId)

  if (isLoading) {
    return (
      <Skeleton
        variant="rectangle"
        className="hm:w-full hm:hero-height"
        aspectRatio="21/9"
        rounded={false}
      />
    )
  }

  if (error || !media) {
    return (
      <div className="mda:flex mda:h-[400px] mda:w-full mda:items-center mda:justify-center mda:bg-muted">
        <Typography variant="body" className="mda:text-destructive">
          {error?.status_message ?? 'Failed to load media details'}
        </Typography>
      </div>
    )
  }

  // Extract properties with Media/TV compatibility using type guard
  const title = isMovie(media) ? media.title : media.name
  const releaseDate = isMovie(media) ? media.release_date : media.first_air_date
  const runtime = isMovie(media) ? media.runtime : undefined
  const numberOfSeasons = isTvSeries(media)
    ? media.number_of_seasons
    : undefined
  const numberOfEpisodes = isTvSeries(media)
    ? media.number_of_episodes
    : undefined

  const releaseYear = releaseDate
    ? new Date(releaseDate).getFullYear().toString()
    : undefined
  const genreNames = media.genres?.map((g) => g.name ?? '') ?? []

  return (
    <div className="mda:relative mda:w-full">
      {/* Backdrop Image */}
      <div className="mda:relative mda:aspect-[21/9] mda:lg:max-h-[440px] mda:w-full mda:overflow-hidden">
        <HeroImage backdropPath={media.backdrop_path} />

        {/* Content Overlay */}
        <div
          className={clsx(
            'mda:absolute mda:left-1/2 mda:-translate-x-1/2 mda:z-2 mda:w-full mda:max-w-screen-xl',
            'mda:px-4 mda:sm:px-5 mda:md:px-5 mda:lg:px-5',
            'mda:bottom-4 mda:sm:bottom-5 mda:md:bottom-6 mda:lg:bottom-8',
            'mda:flex mda:justify-start mda:items-end'
          )}
        >
          <div className="mda:flex mda:flex-col mda:w-full">
            {/* Title */}
            <Typography
              variant="h1"
              className="mda:mb-1 mda:sm:mb-2 mda:text-white! mda:text-shadow-medium"
            >
              {title}
            </Typography>

            {/* Tagline */}
            {media.tagline && (
              <Typography
                variant="lead"
                className="mda:mb-2 mda:sm:mb-3 mda:md:mb-4 mda:italic mda:text-white! mda:opacity-90 mda:text-shadow-strong"
              >
                {media.tagline}
              </Typography>
            )}

            {/* Metadata */}
            <div className="mda:mb-2 mda:sm:mb-3 mda:md:mb-4 mda:flex mda:items-center mda:gap-2 mda:text-white!">
              {releaseYear && (
                <Typography
                  as="span"
                  variant="body"
                  className="mda:text-white! mda:text-shadow-strong"
                >
                  {releaseYear}
                </Typography>
              )}
              {runtime && (
                <>
                  <Typography
                    as="span"
                    variant="body"
                    className="mda:text-white! mda:text-shadow-strong"
                  >
                    •
                  </Typography>
                  <Typography
                    as="span"
                    variant="body"
                    className="mda:text-white! mda:text-shadow-strong"
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
                    className="mda:text-white! mda:text-shadow-strong"
                  >
                    •
                  </Typography>
                  <Typography
                    as="span"
                    variant="body"
                    className="mda:text-white! mda:text-shadow-strong"
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
                    className="mda:text-white! mda:text-shadow-strong"
                  >
                    •
                  </Typography>
                  <Typography
                    as="span"
                    variant="body"
                    className="mda:text-white! mda:text-shadow-strong"
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
                    className="mda:text-white! mda:text-shadow-strong"
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
              <div className="mda:flex mda:flex-wrap mda:gap-2">
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

export default MediaHero
