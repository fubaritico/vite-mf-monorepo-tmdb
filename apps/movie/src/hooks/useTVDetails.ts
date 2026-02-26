import { UseQueryResult, useQuery } from '@tanstack/react-query'
import {
  TMDBError,
  TvSeriesDetailsResponse,
  tvSeriesDetailsOptions,
} from '@vite-mf-monorepo/tmdb-client'

export const useTVDetails = (seriesId: number) => {
  return useQuery({
    ...tvSeriesDetailsOptions({ path: { series_id: seriesId } }),
  }) as UseQueryResult<TvSeriesDetailsResponse, TMDBError>
}
