import type {
  MovieDetailsResponse,
  TvSeriesDetailsResponse,
} from '@fubar-it-co/tmdb-client'

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

/**
 * Type guard to check if media is a Media
 * @param media - Media details (Media or TV Series)
 * @returns true if media is TvSeriesDetailsResponse
 */
export function isTvSeries(
  media: MovieDetailsResponse | TvSeriesDetailsResponse
): media is TvSeriesDetailsResponse {
  return 'number_of_seasons' in media
}
