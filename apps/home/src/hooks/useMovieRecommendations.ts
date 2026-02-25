import { useQuery } from '@tanstack/react-query'
import { movieRecommendationsOptions } from '@vite-mf-monorepo/tmdb-client'

/**
 * Fetch recommended movies based on a movie ID
 */
export const useMovieRecommendations = (movieId: number) => {
  return useQuery({
    ...movieRecommendationsOptions({ path: { movie_id: movieId } }),
    staleTime: 1000 * 60 * 5,
  })
}
