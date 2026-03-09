import { movieCreditsOptions } from '@fubar-it-co/tmdb-client'
import { UseQueryResult, useQuery } from '@tanstack/react-query'

import type { MovieCreditsResponse, TMDBError } from '@fubar-it-co/tmdb-client'

/**
 * Fetch movie cast and crew by movie ID
 */
export const useMovieCredits = (movieId: number) => {
  return useQuery({
    ...movieCreditsOptions({ path: { movie_id: movieId } }),
    staleTime: 1000 * 60 * 10,
  }) as UseQueryResult<MovieCreditsResponse, TMDBError>
}
