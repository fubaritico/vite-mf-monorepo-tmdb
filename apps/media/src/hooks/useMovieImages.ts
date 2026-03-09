import { movieImagesOptions } from '@fubar-it-co/tmdb-client'
import { UseQueryResult, useQuery } from '@tanstack/react-query'

import type { MovieImagesResponse, TMDBError } from '@fubar-it-co/tmdb-client'

export const useMovieImages = (movieId: number) => {
  return useQuery({
    ...movieImagesOptions({ path: { movie_id: movieId } }),
    staleTime: 1000 * 60 * 10,
  }) as UseQueryResult<MovieImagesResponse, TMDBError>
}
