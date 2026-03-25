import type { ImageProps } from 'next/image'
import type { ReactNode } from 'react'

export interface NextImageProps extends Omit<ImageProps, 'placeholder'> {
  /** Custom fallback content on error (default: Photo icon) */
  fallback?: ReactNode
  /** Container aspect ratio (e.g. '2/3', '16/9') */
  aspectRatio?: string
  /** Base64 blur data URL — auto-sets placeholder="blur" when provided */
  blurDataURL?: string
}
