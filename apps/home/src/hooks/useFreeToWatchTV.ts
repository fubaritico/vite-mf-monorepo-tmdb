import { discoverTvOptions } from '@fubar-it-co/tmdb-client'
import { useQuery } from '@tanstack/react-query'

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
