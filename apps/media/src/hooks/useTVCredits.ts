import { tvSeriesCreditsOptions } from '@fubar-it-co/tmdb-client'
import { UseQueryResult, useQuery } from '@tanstack/react-query'

import type {
  TMDBError,
  TvSeriesCreditsResponse,
} from '@fubar-it-co/tmdb-client'

/**
 * Fetch TV series cast and crew by series ID
 */
export const useTVCredits = (seriesId: number) => {
  return useQuery({
    ...tvSeriesCreditsOptions({ path: { series_id: seriesId } }),
    staleTime: 1000 * 60 * 10,
  }) as UseQueryResult<TvSeriesCreditsResponse, TMDBError>
}
