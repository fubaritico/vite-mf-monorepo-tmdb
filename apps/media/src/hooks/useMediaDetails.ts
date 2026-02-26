import {
  type MovieDetailsResponse,
  type TMDBError,
  type TvSeriesDetailsResponse,
} from '@vite-mf-monorepo/tmdb-client'

import { useMovieDetails } from './useMovieDetails.ts'
import { useTVDetails } from './useTVDetails.ts'

import type { UseQueryResult } from '@tanstack/react-query'

export type MediaType = 'movie' | 'tv'

export type MediaQueryResponse =
  | UseQueryResult<MovieDetailsResponse, TMDBError>
  | UseQueryResult<TvSeriesDetailsResponse, TMDBError>

export function useMediaDetails(
  mediaType: MediaType,
  contentId: number
): MediaQueryResponse {
  const query = mediaType === 'tv' ? useTVDetails : useMovieDetails

  return query(contentId)
}
