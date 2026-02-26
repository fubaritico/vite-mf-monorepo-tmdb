import { MediaType } from '../hooks/useMediaDetails.ts'

/**
 * Extract media type from route pathname by checking all segments
 * @param pathname - Route pathname (e.g., '/movie/278', '/tv/94722')
 * @returns 'movie' | 'tv'
 * @throws Error if neither 'movie' nor 'tv' is found in pathname
 */
export const getMediaTypeFromPath = (pathname: string): MediaType => {
  const segments = pathname.split('/').filter(Boolean)

  const hasMovie = segments.includes('movie')
  const hasTv = segments.includes('tv')

  if (hasTv) {
    return 'tv'
  }

  if (hasMovie) {
    return 'movie'
  }

  throw new Error(
    `Invalid media type in pathname: "${pathname}". Expected 'movie' or 'tv' segment.`
  )
}
