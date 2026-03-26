import { tvSeriesVideosOptions } from '@fubar-it-co/tmdb-client'
import { UseQueryResult, useQuery } from '@tanstack/react-query'

import type {
  TMDBError,
  TvSeriesVideosResponse,
} from '@fubar-it-co/tmdb-client'

/**
 * Fetch TV series videos (trailers, clips, teasers) by series ID
 * Filters for official YouTube trailers and limits to top 3
 */
export const useTVVideos = (seriesId: number) => {
  return useQuery({
    ...tvSeriesVideosOptions({ path: { series_id: seriesId } }),
    staleTime: 1000 * 60 * 10,
    select: (data) => ({
      ...data,
      results: data.results
        ?.filter(
          (video) =>
            video.type === 'Trailer' &&
            video.site === 'YouTube' &&
            video.official === true
        )
        .slice(0, 3),
    }),
  }) as UseQueryResult<TvSeriesVideosResponse, TMDBError>
}
