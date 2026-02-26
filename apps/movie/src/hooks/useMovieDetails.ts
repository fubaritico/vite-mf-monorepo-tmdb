import { UseQueryResult, useQuery } from '@tanstack/react-query'
import {
  MovieDetailsResponse,
  TMDBError,
  movieDetailsOptions,
} from '@vite-mf-monorepo/tmdb-client'

export const useMovieDetails = (movieId: number) => {
  return useQuery({
    ...movieDetailsOptions({ path: { movie_id: movieId } }),
  }) as UseQueryResult<MovieDetailsResponse, TMDBError>
}
