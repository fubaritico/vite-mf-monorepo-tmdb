import { useQuery } from '@tanstack/react-query'
import { tvSeriesPopularListOptions } from '@vite-mf-monorepo/tmdb-client'

import type { UseQueryResult } from '@tanstack/react-query'
import type { TvSeriesPopularListResponse } from '@vite-mf-monorepo/tmdb-client'

export const usePopularTV = (): UseQueryResult<TvSeriesPopularListResponse> => {
  return useQuery({
    ...tvSeriesPopularListOptions(),
    staleTime: 1000 * 60 * 10,
  })
}
