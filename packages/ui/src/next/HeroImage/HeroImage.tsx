import Image from 'next/image'
import { useState } from 'react'

import { Skeleton } from '../../Skeleton'

export interface NextHeroImageProps {
  /** Backdrop path from TMDB API (e.g. "/abc123.jpg") */
  backdropPath?: string | null
  /** Alt text for the image */
  title?: string | null
}

function HeroImage({ backdropPath, title }: Readonly<NextHeroImageProps>) {
  const [loading, setLoading] = useState(true)

  const src = backdropPath
    ? `https://image.tmdb.org/t/p/original${backdropPath}`
    : undefined

  return (
    <>
      {loading && (
        <Skeleton
          data-testid="hero-image-skeleton"
          variant="rectangle"
          width="ui:relative ui:w-full ui:h-full ui:hero-height ui:z-0"
          aspectRatio="21/9"
          rounded={false}
        />
      )}
      {src && (
        <Image
          src={src}
          alt={title ?? 'Unknown'}
          fill
          priority
          sizes="100vw"
          className="ui:relative ui:h-full ui:w-full ui:object-cover ui:object-center ui:z-0"
          onLoad={() => {
            setLoading(false)
          }}
        />
      )}
      {/* Gradient Overlay */}
      <div className="ui:absolute ui:inset-0 ui:bg-gradient-to-t ui:from-black/80 ui:via-black/40 ui:to-transparent ui:z-1 ui:top-0 ui:left-0 ui:right-0 ui:bottom-0" />
    </>
  )
}

export default HeroImage
