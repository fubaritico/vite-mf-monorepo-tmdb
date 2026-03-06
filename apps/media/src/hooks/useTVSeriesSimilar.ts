import { useQuery } from '@tanstack/react-query'
import { tvSeriesSimilarOptions } from '@vite-mf-monorepo/tmdb-client'

/**
 * Fetch similar TV series based on a series ID
 */
export const useTVSeriesSimilar = (seriesId: number) => {
  return useQuery({
    ...tvSeriesSimilarOptions({ path: { series_id: String(seriesId) } }),
    staleTime: 1000 * 60 * 5,
  })
}
