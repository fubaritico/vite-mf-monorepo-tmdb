const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'

/**
 * Constructs the full image URL for TMDB images.
 */
export const getImageUrl = (
  path: string | null | undefined,
  size = 'w500'
): string => {
  if (!path) return ''
  return `${IMAGE_BASE_URL}/${size}${path}`
}
