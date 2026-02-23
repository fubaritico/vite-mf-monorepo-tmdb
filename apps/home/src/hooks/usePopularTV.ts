import { useQuery } from '@tanstack/react-query'
import { tvSeriesPopularListOptions } from '@vite-mf-monorepo/tmdb-client'

export const usePopularTV = () => {
  return useQuery({
    ...tvSeriesPopularListOptions(),
    staleTime: 1000 * 60 * 10,
  })
}
