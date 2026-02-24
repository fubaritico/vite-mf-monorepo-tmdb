import { useQuery } from '@tanstack/react-query'
import { movieNowPlayingListOptions } from '@vite-mf-monorepo/tmdb-client'

export const useNowPlayingMovies = () => {
  return useQuery({
    ...movieNowPlayingListOptions(),
    staleTime: 1000 * 60 * 5,
  })
}
