import { movieSimilarOptions } from '@fubar-it-co/tmdb-client'
import { useQuery } from '@tanstack/react-query'

/**
 * Fetch similar movies based on a movie ID
 */
export const useMovieSimilar = (movieId: number) => {
  return useQuery({
    ...movieSimilarOptions({ path: { movie_id: movieId } }),
    staleTime: 1000 * 60 * 5,
  })
}
