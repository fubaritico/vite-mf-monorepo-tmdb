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
 * Constructs an optimized image URL via Netlify Image CDN.
 * Automatically converts to WebP/AVIF and handles caching on edge.
 *
 * This routes TMDB images through Netlify's Image CDN endpoint (/.netlify/images)
 * for on-demand transformation, format conversion, and edge caching.
 *
 * @param path - TMDB image path
 * @param size - TMDB image size (w300, w780, w1280, etc.)
 * @param quality - Image quality 1-100 (default: 80)
 * @returns Optimized image URL routed through Netlify Image CDN
 *
 * @example
 * // Mobile: w300 JPEG → transformed to WebP via Netlify CDN
 * getOptimizedImageUrl('/path/image.jpg', 'w300', 80)
 * // Result: /.netlify/images?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Fw300%2Fpath%2Fimage.jpg&q=80&fm=webp
 */
export const getOptimizedImageUrl = (
  path: string | null | undefined,
  size = 'w500',
  quality = 80
): string => {
  if (!path) return ''
  const remoteUrl = getImageUrl(path, size)
  // Route through Netlify Image CDN for on-demand transformation and format conversion
  // q=XX: quality setting (1-100)
  // fm=webp: request WebP format (Netlify automatically falls back to AVIF if supported)
  return `/.netlify/images?url=${encodeURIComponent(remoteUrl)}&q=${String(quality)}&fm=webp`
}
