/**
 * TMDB API Error Response
 *
 * This is the error format returned by the TMDB API when a request fails.
 * The API returns this JSON structure with an HTTP error status code (401, 404, 500, etc.).
 *
 * @see https://developer.themoviedb.org/docs/errors
 *
 * @example
 * // 401 Unauthorized (Invalid API key)
 * {
 *   success: false,
 *   status_code: 7,
 *   status_message: "Invalid API key: You must be granted a valid key."
 * }
 *
 * @example
 * // 404 Not Found (Resource not found)
 * {
 *   success: false,
 *   status_code: 34,
 *   status_message: "The resource you requested could not be found."
 * }
 */
export interface TMDBError {
  /** Always false for error responses */
  success: false
  /** TMDB internal status code (e.g., 7 for invalid API key, 34 for not found) */
  status_code: number
  /** Human-readable error message */
  status_message: string
}
