import { tvSeriesImagesOptions } from '@fubar-it-co/tmdb-client'
import { UseQueryResult, useQuery } from '@tanstack/react-query'

import type {
  TMDBError,
  TvSeriesImagesResponse,
} from '@fubar-it-co/tmdb-client'

/**
 * Fetch TV series images by series ID
 */
export const useTVImages = (seriesId: number) => {
  return useQuery({
    ...tvSeriesImagesOptions({ path: { series_id: seriesId } }),
    staleTime: 1000 * 60 * 10,
  }) as UseQueryResult<TvSeriesImagesResponse, TMDBError>
}
