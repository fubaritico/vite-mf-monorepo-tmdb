import { UseQueryResult, useQuery } from '@tanstack/react-query'
import {
  type MovieImagesResponse,
  TMDBError,
  movieImagesOptions,
} from '@vite-mf-monorepo/tmdb-client'
import { Spinner } from '@vite-mf-monorepo/ui'
import { useNavigate, useParams } from 'react-router-dom'

import PhotosModal from './PhotosModal.tsx'

import '../../remote.css'

import type { FC } from 'react'

const Photos: FC = () => {
  const { id, index } = useParams<{ id: string; index: string }>()
  const navigate = useNavigate()

  const { data, isLoading, error } = useQuery({
    ...movieImagesOptions({ path: { movie_id: Number(id) } }),
  }) as UseQueryResult<MovieImagesResponse, TMDBError>

  const handleClose = () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    navigate(-1)
  }

  if (error)
    return (
      <div className="ph:fixed ph:inset-0 ph:z-50 ph:flex ph:items-center ph:justify-center ph:bg-black/80">
        <span className="ph:text-white">
          <span className="ph:font-bold">{error.status_code}</span> |{' '}
          {error.status_message}
        </span>
      </div>
    )

  if (isLoading) {
    return (
      <div className="ph:fixed ph:inset-0 ph:z-50 ph:flex ph:items-center ph:justify-center ph:bg-black/80">
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

  const backdrops = data.backdrops ?? []
  const currentIndex = Number(index ?? 0)

  const handlePrev =
    currentIndex > 0
      ? () => {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          navigate(`../${String(currentIndex - 1)}`, { relative: 'path' })
        }
      : undefined
  const handleNext =
    currentIndex < backdrops.length - 1
      ? () => {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          navigate(`../${String(currentIndex + 1)}`, { relative: 'path' })
        }
      : undefined

  return (
    <PhotosModal
      images={backdrops}
      initialIndex={currentIndex}
      onClose={handleClose}
      onPrev={handlePrev}
      onNext={handleNext}
    />
  )
}

export default Photos
