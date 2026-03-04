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

/**
 * Constructs an optimized image URL with Netlify Image Optimization.
 * Automatically converts PNG to WebP/AVIF based on browser support.
 *
 * Use this for modern image optimization. Query parameters tell Netlify
 * to automatically select WebP/AVIF format based on browser capabilities.
 *
 * @param path - TMDB image path
 * @param size - TMDB image size (w300, w780, w1280, etc.)
 * @param quality - Image quality 0-100 (default: 80)
 * @returns Optimized image URL with Netlify format auto-selection
 *
 * @example
 * // Mobile: w300 PNG → auto-converted to WebP/AVIF
 * getOptimizedImageUrl('/path/image.jpg', 'w300', 80)
 * // Result: https://image.tmdb.org/t/p/w300/path/image.jpg?q=80&fm=auto
 */
export const getOptimizedImageUrl = (
  path: string | null | undefined,
  size = 'w500',
  quality = 80
): string => {
  if (!path) return ''
  const baseUrl = getImageUrl(path, size)
  // fm=auto: Netlify selects format based on Accept headers (WebP/AVIF if supported)
  // q=XX: quality setting
  return `${baseUrl}?q=${String(quality)}&fm=auto`
}
