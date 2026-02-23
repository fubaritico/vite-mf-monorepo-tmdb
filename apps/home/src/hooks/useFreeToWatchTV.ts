import { useQuery } from '@tanstack/react-query'
import { discoverTvOptions } from '@vite-mf-monorepo/tmdb-client'

export const useFreeToWatchTV = () => {
  return useQuery({
    ...discoverTvOptions({
      query: {
        with_watch_monetization_types: 'free',
      },
    }),
    staleTime: 1000 * 60 * 5,
  })
}
