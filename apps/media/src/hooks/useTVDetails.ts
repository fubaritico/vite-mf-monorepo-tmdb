import {
  TMDBError,
  TvSeriesDetailsResponse,
  tvSeriesDetailsOptions,
} from '@fubar-it-co/tmdb-client'
import { UseQueryResult, useQuery } from '@tanstack/react-query'

export const useTVDetails = (seriesId: number) => {
  return useQuery({
    ...tvSeriesDetailsOptions({ path: { series_id: seriesId } }),
  }) as UseQueryResult<TvSeriesDetailsResponse, TMDBError>
}
