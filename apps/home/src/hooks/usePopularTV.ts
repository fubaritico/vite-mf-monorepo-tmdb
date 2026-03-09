import { tvSeriesPopularListOptions } from '@fubar-it-co/tmdb-client'
import { useQuery } from '@tanstack/react-query'

export const usePopularTV = () => {
  return useQuery({
    ...tvSeriesPopularListOptions(),
    staleTime: 1000 * 60 * 10,
  })
}
