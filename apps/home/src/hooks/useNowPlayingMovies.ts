import { movieNowPlayingListOptions } from '@fubar-it-co/tmdb-client'
import { useQuery } from '@tanstack/react-query'

export const useNowPlayingMovies = () => {
  return useQuery({
    ...movieNowPlayingListOptions(),
    staleTime: 1000 * 60 * 5,
  })
}
