import type {
  MovieDetailsResponse,
  TvSeriesDetailsResponse,
} from '@vite-mf-monorepo/tmdb-client'

/**
 * Type guard to check if media is a Media
 * @param media - Media details (Media or TV Series)
 * @returns true if media is MovieDetailsResponse
 */
export function isMovie(
  media: MovieDetailsResponse | TvSeriesDetailsResponse
): media is MovieDetailsResponse {
  return 'title' in media
}
