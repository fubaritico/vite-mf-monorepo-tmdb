import { useQuery } from '@tanstack/react-query'
import { discoverMovieOptions } from '@vite-mf-monorepo/tmdb-client'

import type { UseQueryResult } from '@tanstack/react-query'
import type { DiscoverMovieResponse } from '@vite-mf-monorepo/tmdb-client'

export const useFreeToWatch = (): UseQueryResult<DiscoverMovieResponse> => {
  return useQuery({
    ...discoverMovieOptions({
      query: {
        with_watch_monetization_types: 'free',
      },
    }),
    staleTime: 1000 * 60 * 10,
  })
}
