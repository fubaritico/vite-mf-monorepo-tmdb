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
 * Constructs an optimized image URL via Netlify Image CDN (production only).
 * Automatically converts to WebP/AVIF and handles caching on edge.
 *
 * In production: routes through Netlify's Image CDN endpoint (/.netlify/images)
 * In development: serves images directly from TMDB with optimization query params
 *
 * @param path - TMDB image path
 * @param size - TMDB image size (w300, w780, w1280, etc.)
 * @param quality - Image quality 1-100 (default: 80)
 * @returns Optimized image URL (Netlify CDN in prod, TMDB direct in dev)
 *
 * @example
 * // Production: W300 JPEG → transformed to WebP via Netlify CDN
 * getOptimizedImageUrl('/path/image.jpg', 'w300', 80)
 * // Result: /.netlify/images?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Fw300%2Fpath%2Fimage.jpg&q=80&fm=webp
 *
 * // Development: serve directly from TMDB
 * // Result: https://image.tmdb.org/t/p/w300/path/image.jpg?q=80&fm=auto
 */
export const getOptimizedImageUrl = (
  path: string | null | undefined,
  size = 'w500',
  quality = 80
): string => {
  if (!path) return ''
  const baseUrl = getImageUrl(path, size)

  // In production (Netlify), route through Image CDN for format conversion
  // In development, serve directly from TMDB with optimization params
  if ((import.meta.env as Record<string, string>).MODE === 'production') {
    return `/.netlify/images?url=${encodeURIComponent(baseUrl)}&q=${String(quality)}&fm=webp`
  }

  // Development: direct TMDB with query params (images will load, format conversion skipped)
  // fm=auto: browser's Accept headers determine format (not handled locally)
  return `${baseUrl}?q=${String(quality)}&fm=auto`
}
