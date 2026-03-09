import { movieVideosOptions } from '@fubar-it-co/tmdb-client'
import { UseQueryResult, useQuery } from '@tanstack/react-query'

import type { MovieVideosResponse, TMDBError } from '@fubar-it-co/tmdb-client'

/**
 * Fetch movie videos (trailers, clips, teasers) by movie ID
 * Filters for official YouTube trailers and limits to top 3
 */
export const useMovieVideos = (movieId: number) => {
  return useQuery({
    ...movieVideosOptions({ path: { movie_id: movieId } }),
    staleTime: 1000 * 60 * 10,
    select: (data) => ({
      ...data,
      results: data.results
        ?.filter(
          (video) =>
            video.type === 'Trailer' &&
            video.site === 'YouTube' &&
            video.official === true
        )
        .slice(0, 3),
    }),
  }) as UseQueryResult<MovieVideosResponse, TMDBError>
}
