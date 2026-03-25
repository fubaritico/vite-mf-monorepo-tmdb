'use client'

import clsx from 'clsx'
import Image from 'next/image'
import { useCallback, useState } from 'react'

import { Icon } from '../../Icon'

import type { NextImageProps } from './NextImage.types'
import type { ImageState } from '../../Image/Image'

function NextImage({
  fallback,
  aspectRatio,
  blurDataURL,
  className,
  onLoad,
  onError,
  style,
  ...rest
}: Readonly<NextImageProps>) {
  const [state, setState] = useState<ImageState>('loading')

  const handleLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      setState('loaded')
      if (typeof onLoad === 'function') {
        onLoad(e as Parameters<typeof onLoad>[0])
      }
    },
    [onLoad]
  )

  const handleError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      setState('error')
      if (typeof onError === 'function') {
        onError(e as Parameters<typeof onError>[0])
      }
    },
    [onError]
  )

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
      style={aspectRatio ? { aspectRatio, ...style } : style}
      data-state={state}
    >
      {state === 'error' ? (
        (fallback ?? defaultFallback)
      ) : (
        <Image
          {...rest}
          className={clsx(
            'ui:transition-opacity ui:duration-300',
            state === 'loaded' ? 'ui:opacity-100' : 'ui:opacity-0'
          )}
          onLoad={handleLoad}
          onError={handleError}
          placeholder={blurDataURL ? 'blur' : 'empty'}
          blurDataURL={blurDataURL}
        />
      )}
    </div>
  )
}

export default NextImage
