import { useQuery } from '@tanstack/react-query'
import { tvSeriesRecommendationsOptions } from '@vite-mf-monorepo/tmdb-client'

/**
 * Fetch recommended TV series based on a series ID
 */
export const useTVSeriesRecommendations = (seriesId: number) => {
  return useQuery({
    ...tvSeriesRecommendationsOptions({ path: { series_id: seriesId } }),
    staleTime: 1000 * 60 * 5,
  })
}
