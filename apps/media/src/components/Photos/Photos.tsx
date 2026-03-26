import { Container, Section } from '@vite-mf-monorepo/layouts'
import { getImageUrl } from '@vite-mf-monorepo/shared'
import { Icon, Skeleton, Typography } from '@vite-mf-monorepo/ui'
import { Link, useLocation, useParams } from 'react-router-dom'

import { useMediaImages } from '../../hooks'
import { getMediaTypeFromPath } from '../../utils'

import type { FC } from 'react'

const PHOTOS_IN_GRID = 4

const Photos: FC = () => {
  const location = useLocation()
  const { id } = useParams<{ id: string }>()
  const contentId = Number(id)
  const mediaType = getMediaTypeFromPath(location.pathname)

  const { data, isLoading, error } = useMediaImages(mediaType, contentId)

  if (isLoading) {
    return (
      <Container variant="default">
        <Section maxWidth="xl" spacing="md">
          <Typography variant="h2" className="mda:mb-6">
            Photos
          </Typography>
          <div className="mda:grid mda:grid-cols-2 mda:md:grid-cols-4 mda:md:grid-rows-2 mda:md:h-72 mda:gap-2">
            <Skeleton
              variant="rectangle"
              width="100%"
              height="100%"
              className="mda:col-span-2 mda:aspect-video mda:md:aspect-auto mda:md:row-span-2 mda:rounded-md"
            />
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton
                key={i}
                variant="rectangle"
                width="100%"
                height="100%"
                className="mda:aspect-video mda:md:aspect-auto mda:rounded-md"
              />
            ))}
            <div className="mda:aspect-video mda:md:aspect-auto mda:rounded-md mda:bg-muted" />
          </div>
        </Section>
      </Container>
    )
  }

  if (error || !data?.backdrops?.length) {
    return null
  }

  const backdrops = (data.backdrops ?? []).map((b) => ({
    ...b,
    id: b.file_path?.replace(/^\//, '').replace(/\.[^/.]+$/, '') ?? '',
  }))
  const photos = backdrops.slice(0, PHOTOS_IN_GRID)
  const total = backdrops.length

  return (
    <Container variant="default">
      <Section maxWidth="xl" spacing="md">
        <Typography variant="h2" className="mda:mb-6">
          Photos
        </Typography>
        <div className="mda:grid mda:grid-cols-2 mda:md:grid-cols-4 mda:md:grid-rows-2 mda:md:h-72 mda:gap-2">
          {/* Large photo — col-span-2 row-span-2 on desktop */}
          <Link
            to={`photos/${photos[0]?.id ?? ''}`}
            className="mda:col-span-2 mda:md:row-span-2 mda:aspect-video mda:md:aspect-auto mda:overflow-hidden mda:rounded-md mda:focus-visible:outline-none mda:focus-visible:ring-2 mda:focus-visible:ring-ring"
            aria-label="View photo 1"
          >
            <img
              src={getImageUrl(photos[0]?.file_path, 'w780')}
              alt="Photo 1"
              className="mda:w-full mda:h-full mda:object-cover mda:transition-transform mda:duration-200 hover:mda:scale-105"
            />
          </Link>

          {/* Small photos 2–4 */}
          {photos.slice(1).map((photo, i) => (
            <Link
              key={photo.file_path}
              to={`photos/${photo.id}`}
              className="mda:aspect-video mda:md:aspect-auto mda:overflow-hidden mda:rounded-md mda:focus-visible:outline-none mda:focus-visible:ring-2 mda:focus-visible:ring-ring"
              aria-label={`View photo ${String(i + 2)}`}
            >
              <img
                src={getImageUrl(photo.file_path, 'w300')}
                alt={`Photo ${String(i + 2)}`}
                className="mda:w-full mda:h-full mda:object-cover mda:transition-transform mda:duration-200 hover:mda:scale-105"
              />
            </Link>
          ))}

          {/* CTA tile — "X photos" */}
          <Link
            to={`photos/${photos[0]?.id ?? ''}`}
            className="mda:aspect-video mda:md:aspect-auto mda:flex mda:flex-col mda:items-center mda:justify-center mda:gap-2 mda:rounded-md mda:bg-muted mda:transition-colors hover:mda:bg-muted/70 mda:focus-visible:outline-none mda:focus-visible:ring-2 mda:focus-visible:ring-ring"
            aria-label={`View all ${String(total)} photos`}
          >
            <Icon
              name="Photo"
              size={24}
              className="mda:text-badge-foreground"
            />
            <Typography
              variant="body"
              className="mda:text-badge-foreground mda:font-semibold"
            >
              {total} photos
            </Typography>
          </Link>
        </div>
      </Section>
    </Container>
  )
}

export default Photos
