import { useQuery } from '@tanstack/react-query'
import { movieDetailsOptions } from '@vite-mf-monorepo/tmdb-client'

/**
 * Fetch movie details by ID (title, overview, release date, runtime, genres, etc.)
 */
export const useMovieDetails = (movieId: number) => {
  return useQuery({
    ...movieDetailsOptions({ path: { movie_id: movieId } }),
    staleTime: 1000 * 60 * 10,
  })
}
