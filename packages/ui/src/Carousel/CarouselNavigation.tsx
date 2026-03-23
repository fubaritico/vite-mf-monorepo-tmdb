import clsx from 'clsx'

import { IconButton } from '../IconButton'

/** Position mode for navigation buttons */
export type CarouselNavigationPosition = 'inline' | 'sides' | 'sides-inset'

export interface CarouselNavigationProps {
  /** Callback for previous button */
  onPrev: () => void
  /** Callback for next button */
  onNext: () => void
  /** Whether previous is disabled */
  canPrev: boolean
  /** Whether next is disabled */
  canNext: boolean
  /** Button size */
  size?: 'sm' | 'md'
  /** Position mode */
  position?: CarouselNavigationPosition
  /** Icon button visual variant — ghost for lightbox (white arrows on dark bg) */
  iconVariant?: 'secondary' | 'ghost'
  /** Additional class name */
  className?: string
}

/**
 * Navigation buttons for Carousel (previous/next).
 * - inline: side by side (for bottom-right layout)
 * - sides: absolute, centered on the carousel edges (overhangs container — standard carousel)
 * - sides-inset: absolute, inside the container with padding (lightbox, fullscreen contexts)
 */
function CarouselNavigation({
  onPrev,
  onNext,
  canPrev,
  canNext,
  size = 'sm',
  position = 'inline',
  iconVariant = 'secondary',
  className,
}: Readonly<CarouselNavigationProps>) {
  if (position === 'sides') {
    return (
      <>
        <div className="ui:absolute ui:left-0 ui:top-1/2 ui:-translate-x-1/2 ui:-translate-y-1/2">
          <IconButton
            icon="ChevronLeft"
            variant={iconVariant}
            size={size}
            onClick={onPrev}
            disabled={!canPrev}
            aria-label="Previous"
          />
        </div>
        <div className="ui:absolute ui:right-0 ui:top-1/2 ui:-translate-y-1/2 ui:translate-x-1/2">
          <IconButton
            icon="ChevronRight"
            variant={iconVariant}
            size={size}
            onClick={onNext}
            disabled={!canNext}
            aria-label="Next"
          />
        </div>
      </>
    )
  }

  if (position === 'sides-inset') {
    return (
      <>
        <div className="ui:absolute ui:left-4 ui:top-1/2 ui:-translate-y-1/2 ui:z-10 ui:text-white">
          <IconButton
            icon="ChevronLeft"
            variant={iconVariant}
            size={size}
            onClick={onPrev}
            disabled={!canPrev}
            aria-label="Previous"
            className="ui:bg-white/20 ui:hover:bg-white/55"
          />
        </div>
        <div className="ui:absolute ui:right-4 ui:top-1/2 ui:-translate-y-1/2 ui:z-10 ui:text-white">
          <IconButton
            icon="ChevronRight"
            variant={iconVariant}
            size={size}
            onClick={onNext}
            disabled={!canNext}
            aria-label="Next"
            className="ui:bg-white/20 ui:hover:bg-white/55"
          />
        </div>
      </>
    )
  }

  return (
    <div className={clsx('ui:flex ui:gap-2', className)}>
      <IconButton
        icon="ChevronLeft"
        variant={iconVariant}
        size={size}
        onClick={onPrev}
        disabled={!canPrev}
        aria-label="Previous"
      />
      <IconButton
        icon="ChevronRight"
        variant={iconVariant}
        size={size}
        onClick={onNext}
        disabled={!canNext}
        aria-label="Next"
      />
    </div>
  )
}

export default CarouselNavigation
