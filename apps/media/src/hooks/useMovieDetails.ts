import {
  MovieDetailsResponse,
  TMDBError,
  movieDetailsOptions,
} from '@fubar-it-co/tmdb-client'
import { UseQueryResult, useQuery } from '@tanstack/react-query'

export const useMovieDetails = (movieId: number) => {
  return useQuery({
    ...movieDetailsOptions({ path: { movie_id: movieId } }),
  }) as UseQueryResult<MovieDetailsResponse, TMDBError>
}
