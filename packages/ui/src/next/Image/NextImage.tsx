import clsx from 'clsx'
import Image from 'next/image'

import type { NextImageProps } from './NextImage.types'

function NextImage({
  aspectRatio,
  blurDataURL,
  className,
  imageClassName,
  style,
  ...rest
}: Readonly<NextImageProps>) {
  return (
    <div
      className={clsx('ui:relative ui:overflow-hidden ui:bg-muted', className)}
      style={aspectRatio ? { aspectRatio, ...style } : style}
    >
      <Image
        {...rest}
        className={imageClassName}
        placeholder={blurDataURL ? 'blur' : 'empty'}
        blurDataURL={blurDataURL}
      />
    </div>
  )
}

export default NextImage
