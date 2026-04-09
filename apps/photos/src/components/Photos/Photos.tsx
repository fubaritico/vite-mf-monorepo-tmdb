import {
  type MovieImagesResponse,
  TMDBError,
  movieImagesOptions,
} from '@fubar-it-co/tmdb-client'
import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { Spinner } from '@vite-mf-monorepo/ui'
import { useNavigate, useParams } from 'react-router-dom'

import PhotosModal from './PhotosModal.tsx'

import '../../remote.css'

import type { FC } from 'react'

/**
 * TMDB backdrop enriched with a deterministic URL-safe id derived from file_path.
 * Format: file_path without leading slash and extension (e.g. "/abc123.jpg" → "abc123").
 */
type BackdropWithId = NonNullable<MovieImagesResponse['backdrops']>[number] & {
  id: string
}

/** Full-screen photo lightbox — nested route under /movie/:id and /tv/:id. */
const Photos: FC = () => {
  const { id, index } = useParams<{ id: string; index: string }>()
  const navigate = useNavigate()

  const { data, isLoading, error } = useQuery({
    ...movieImagesOptions({ path: { movie_id: Number(id) } }),
  }) as UseQueryResult<MovieImagesResponse, TMDBError>

  /** Navigates two levels up: /movie/:id/photos/:index → /movie/:id (works for /tv/:id too) */
  const handleClose = () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    navigate('../..', { relative: 'path' })
  }

  if (error)
    return (
      <div
        data-testid="mf-error-photos"
        className="ph:fixed ph:inset-0 ph:z-50 ph:flex ph:items-center ph:justify-center ph:bg-black/80"
      >
        <span className="ph:text-white">
          <span className="ph:font-bold">{error.status_code}</span> |{' '}
          {error.status_message}
        </span>
      </div>
    )

  if (isLoading) {
    return (
      <div
        data-testid="mf-loading-photos"
        className="ph:fixed ph:inset-0 ph:z-50 ph:flex ph:items-center ph:justify-center ph:bg-black/80"
      >
        <Spinner />
      </div>
    )
  }

  if (!data) {
    return (
      <div className="ph:fixed ph:inset-0 ph:z-50 ph:flex ph:items-center ph:justify-center ph:bg-black/80">
        No data found for movie ID {id}
      </div>
    )
  }

  /** Enrich backdrops with a deterministic URL-safe id (see BackdropWithId) */
  const backdrops: BackdropWithId[] = (data.backdrops ?? []).map((b) => ({
    ...b,
    id: b.file_path?.replace(/^\//, '').replace(/\.[^/.]+$/, '') ?? '',
  }))

  /** Resolve current position from URL param — fallback to 0 if id not found */
  const currentIndex = backdrops.findIndex((b) => b.id === index)
  const safeIndex = currentIndex === -1 ? 0 : currentIndex

  /** undefined when at first image — disables prev arrow in Carousel */
  const handlePrev =
    safeIndex > 0
      ? () => {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          navigate(`../${backdrops[safeIndex - 1].id}`, { relative: 'path' })
        }
      : undefined

  /** undefined when at last image — disables next arrow in Carousel */
  const handleNext =
    safeIndex < backdrops.length - 1
      ? () => {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          navigate(`../${backdrops[safeIndex + 1].id}`, { relative: 'path' })
        }
      : undefined

  return (
    <div data-testid="mf-ready-photos">
      <PhotosModal
        images={backdrops}
        initialIndex={safeIndex}
        onClose={handleClose}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  )
}

export default Photos
