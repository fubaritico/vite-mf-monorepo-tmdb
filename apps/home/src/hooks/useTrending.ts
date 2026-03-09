import { trendingAllOptions } from '@fubar-it-co/tmdb-client'
import { useQuery } from '@tanstack/react-query'

export const useTrending = (timeWindow: 'day' | 'week' = 'day') => {
  return useQuery({
    ...trendingAllOptions({ path: { time_window: timeWindow } }),
    staleTime: 1000 * 60 * 5,
  })
}
