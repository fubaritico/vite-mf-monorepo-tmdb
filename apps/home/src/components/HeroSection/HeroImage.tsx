import { getOptimizedImageUrl } from '@vite-mf-monorepo/shared'
import { Skeleton } from '@vite-mf-monorepo/ui'
import { useState } from 'react'

import type { FC } from 'react'

export interface HeroImageProps {
  backdropPath: string | null | undefined
  title: string | null | undefined
}

const HeroImage: FC<HeroImageProps> = ({ backdropPath, title }) => {
  const [loading, setLoading] = useState(true)

  const backdropPathMobile = backdropPath
    ? getOptimizedImageUrl(backdropPath, 'w300', 60)
    : undefined

  const backdropPathTablet = backdropPath
    ? getOptimizedImageUrl(backdropPath, 'w300', 60)
    : undefined

  const backdropPathDesktop = backdropPath
    ? getOptimizedImageUrl(backdropPath, 'w780', 60)
    : undefined

  const backdropPathUltraWide = backdropPath
    ? getOptimizedImageUrl(backdropPath, 'w1280', 60)
    : undefined

  return (
    <>
      {loading && (
        <Skeleton
          variant="rectangle"
          width="hm:relative hm:w-full h-full hm:hero-height hm:z-0"
          aspectRatio="16/9"
          rounded={false}
        />
      )}
      <picture>
        {backdropPathMobile && (
          <source media="(max-width: 639px)" srcSet={backdropPathMobile} />
        )}
        {backdropPathTablet && (
          <source media="(max-width: 1023px)" srcSet={backdropPathTablet} />
        )}
        {backdropPathDesktop && (
          <source media="(max-width: 1535px)" srcSet={backdropPathDesktop} />
        )}
        {backdropPathUltraWide && (
          <source media="(min-width: 1536px)" srcSet={backdropPathUltraWide} />
        )}
        {backdropPathMobile && (
          <img
            src={backdropPathMobile}
            fetchPriority="high"
            onLoad={() => {
              setLoading(false)
            }}
            alt={title ?? 'Unknown'}
            className="hm:relative hm:h-full hm:w-full hm:object-cover hm:object-center hm:z-0"
          />
        )}
      </picture>
      {/* Gradient Overlay */}
      <div className="hm:absolute hm:inset-0 hm:bg-gradient-to-t hm:from-black/80 hm:via-black/40 hm:to-transparent hm:z-1 hm:top-0 hm:left-0 hm:right-0 hm:bottom-0" />
    </>
  )
}

export default HeroImage
