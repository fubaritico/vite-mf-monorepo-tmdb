import { moviePopularListOptions } from '@fubar-it-co/tmdb-client'
import { useQuery } from '@tanstack/react-query'

export const usePopularMovies = () => {
  return useQuery({
    ...moviePopularListOptions(),
    staleTime: 1000 * 60 * 10,
  })
}
