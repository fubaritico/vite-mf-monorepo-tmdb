import { getBlurDataUrl } from '@vite-mf-monorepo/shared'
import clsx from 'clsx'
import { useCallback, useEffect, useState } from 'react'

import { Icon } from '../Icon'

import type { FC, ImgHTMLAttributes, ReactNode } from 'react'

export type ImageState = 'loading' | 'loaded' | 'error'

export type AspectRatio = '2/3' | '16/9' | '1/1' | '4/3' | '3/2'

export interface ImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'placeholder'> {
  /** Image source URL */
  src: string
  /** Alt text for accessibility */
  alt: string
  /** Pre-generated blur data URL (base64) */
  blurDataUrl?: string
  /** Auto-generate blur placeholder from src using Canvas API */
  autoBlur?: boolean
  /** Size of blur canvas (smaller = more blur). Default: 16 */
  blurSize?: number
  /** JPEG quality for blur (0-1). Default: 0.3 */
  blurQuality?: number
  /** Aspect ratio of the image container */
  aspectRatio?: AspectRatio | (string & {})
  /** Fallback content when image fails to load */
  fallback?: ReactNode
  /** Callback when image loads successfully */
  onLoad?: () => void
  /** Callback when image fails to load */
  onError?: () => void
}

const Image: FC<ImageProps> = ({
  src,
  alt,
  blurDataUrl,
  autoBlur = false,
  blurSize = 16,
  blurQuality = 0.3,
  aspectRatio = '2/3',
  fallback,
  className,
  onLoad,
  onError,
  ...rest
}) => {
  const [state, setState] = useState<ImageState>('loading')
  const [generatedBlur, setGeneratedBlur] = useState<string | undefined>(
    undefined
  )
  const [blurReady, setBlurReady] = useState(!autoBlur || !!blurDataUrl)

  const effectiveBlur = blurDataUrl ?? generatedBlur

  useEffect(() => {
    if (!autoBlur || blurDataUrl) {
      setBlurReady(true)
      return
    }

    setBlurReady(false)

    getBlurDataUrl(src, blurSize, blurQuality)
      .then((base64) => {
        setGeneratedBlur(base64)
        setBlurReady(true)
      })
      .catch(() => {
        setBlurReady(true)
      })
  }, [autoBlur, src, blurDataUrl, blurSize, blurQuality])

  useEffect(() => {
    setState('loading')
    setGeneratedBlur(undefined)
  }, [src])

  const handleLoad = useCallback(() => {
    setState('loaded')
    onLoad?.()
  }, [onLoad])

  const handleError = useCallback(() => {
    setState('error')
    onError?.()
  }, [onError])

  const defaultFallback = (
    <div className="ui:flex ui:h-full ui:w-full ui:items-center ui:justify-center ui:bg-muted">
      <Icon
        name="Photo"
        size={48}
        className="ui:text-muted-foreground"
        aria-hidden="true"
      />
    </div>
  )

  return (
    <div
      className={clsx('ui:relative ui:overflow-hidden ui:bg-muted', className)}
      style={aspectRatio ? { aspectRatio } : undefined}
      data-state={state}
    >
      {state === 'error' ? (
        (fallback ?? defaultFallback)
      ) : (
        <>
          {effectiveBlur && state === 'loading' && (
            <img
              src={effectiveBlur}
              alt=""
              aria-hidden="true"
              className="ui:absolute ui:inset-0 ui:h-full ui:w-full ui:scale-105 ui:object-cover"
            />
          )}

          {blurReady && (
            <img
              src={src}
              alt={alt}
              onLoad={handleLoad}
              onError={handleError}
              className={clsx(
                'ui:absolute ui:inset-0 ui:h-full ui:w-full ui:object-cover ui:transition-opacity ui:duration-300',
                state === 'loaded' ? 'ui:opacity-100' : 'ui:opacity-0'
              )}
              {...rest}
            />
          )}
        </>
      )}
    </div>
  )
}

export default Image
