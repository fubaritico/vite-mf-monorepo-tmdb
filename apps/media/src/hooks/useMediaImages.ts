import {
  type MovieImagesResponse,
  type TMDBError,
  type TvSeriesImagesResponse,
} from '@fubar-it-co/tmdb-client'

import { useMovieImages } from './useMovieImages'
import { useTVImages } from './useTVImages'

import type { MediaType } from './useMediaDetails'
import type { UseQueryResult } from '@tanstack/react-query'

export type MediaImagesResponse =
  | UseQueryResult<MovieImagesResponse, TMDBError>
  | UseQueryResult<TvSeriesImagesResponse, TMDBError>

export function useMediaImages(
  mediaType: MediaType,
  contentId: number
): MediaImagesResponse {
  const query = mediaType === 'tv' ? useTVImages : useMovieImages

  return query(contentId)
}
