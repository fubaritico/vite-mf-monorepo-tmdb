import { useQuery } from '@tanstack/react-query'
import { movieCreditsOptions } from '@vite-mf-monorepo/tmdb-client'

/**
 * Fetch movie cast and crew by movie ID
 */
export const useMovieCredits = (movieId: number) => {
  return useQuery({
    ...movieCreditsOptions({ path: { movie_id: movieId } }),
    staleTime: 1000 * 60 * 10,
  })
}
