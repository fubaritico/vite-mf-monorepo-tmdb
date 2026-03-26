import {
  type MovieCreditsResponse,
  type TMDBError,
  type TvSeriesCreditsResponse,
} from '@fubar-it-co/tmdb-client'

import { useMovieCredits } from './useMovieCredits'
import { useTVCredits } from './useTVCredits'

import type { MediaType } from './useMediaDetails'
import type { UseQueryResult } from '@tanstack/react-query'

export type MediaCreditsResponse =
  | UseQueryResult<MovieCreditsResponse, TMDBError>
  | UseQueryResult<TvSeriesCreditsResponse, TMDBError>

export function useMediaCredits(
  mediaType: MediaType,
  contentId: number
): MediaCreditsResponse {
  const query = mediaType === 'tv' ? useTVCredits : useMovieCredits

  return query(contentId)
}
