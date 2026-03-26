import {
  type MovieVideosResponse,
  type TMDBError,
  type TvSeriesVideosResponse,
} from '@fubar-it-co/tmdb-client'

import { useMovieVideos } from './useMovieVideos'
import { useTVVideos } from './useTVVideos'

import type { MediaType } from './useMediaDetails'
import type { UseQueryResult } from '@tanstack/react-query'

export type MediaVideosResponse =
  | UseQueryResult<MovieVideosResponse, TMDBError>
  | UseQueryResult<TvSeriesVideosResponse, TMDBError>

export function useMediaVideos(
  mediaType: MediaType,
  contentId: number
): MediaVideosResponse {
  const query = mediaType === 'tv' ? useTVVideos : useMovieVideos

  return query(contentId)
}
