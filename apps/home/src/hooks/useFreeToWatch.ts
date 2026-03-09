import { discoverMovieOptions } from '@fubar-it-co/tmdb-client'
import { useQuery } from '@tanstack/react-query'

export const useFreeToWatchMovies = () => {
  return useQuery({
    ...discoverMovieOptions({
      query: {
        with_watch_monetization_types: 'free',
      },
    }),
    staleTime: 1000 * 60 * 5,
  })
}
