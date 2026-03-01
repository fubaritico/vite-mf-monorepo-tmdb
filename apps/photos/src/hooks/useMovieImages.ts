import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { movieImagesOptions } from '@vite-mf-monorepo/tmdb-client'

import type {
  MovieImagesResponse,
  TMDBError,
} from '@vite-mf-monorepo/tmdb-client'

/**
 * Fetch movie backdrops by movie ID
 */
export const useMovieImages = (movieId: number) => {
  return useQuery({
    ...movieImagesOptions({ path: { movie_id: movieId } }),
    staleTime: 1000 * 60 * 10,
  }) as UseQueryResult<MovieImagesResponse, TMDBError>
}
