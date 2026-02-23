import { useQuery } from '@tanstack/react-query'
import { moviePopularListOptions } from '@vite-mf-monorepo/tmdb-client'

export const usePopularMovies = () => {
  return useQuery({
    ...moviePopularListOptions(),
    staleTime: 1000 * 60 * 10,
  })
}
