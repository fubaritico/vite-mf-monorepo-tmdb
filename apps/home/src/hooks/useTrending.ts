import { useQuery } from '@tanstack/react-query'
import { trendingAllOptions } from '@vite-mf-monorepo/tmdb-client'

import type { UseQueryResult } from '@tanstack/react-query'
import type { TrendingAllResponse } from '@vite-mf-monorepo/tmdb-client'

export const useTrending = (
  timeWindow: 'day' | 'week' = 'day'
): UseQueryResult<TrendingAllResponse> => {
  return useQuery({
    ...trendingAllOptions({ path: { time_window: timeWindow } }),
    staleTime: 1000 * 60 * 5,
  })
}
