import clsx from 'clsx'

import { IconButton } from '../IconButton'

import type { FC } from 'react'

/** Position mode for navigation buttons */
export type CarouselNavigationPosition = 'inline' | 'sides'

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
  /** Additional class name */
  className?: string
}

/**
 * Navigation buttons for Carousel (previous/next).
 * Supports two position modes: inline (side by side) or sides (absolute positioned on carousel edges).
 */
const CarouselNavigation: FC<CarouselNavigationProps> = ({
  onPrev,
  onNext,
  canPrev,
  canNext,
  size = 'sm',
  position = 'inline',
  className,
}) => {
  if (position === 'sides') {
    return (
      <>
        <div className="ui:absolute ui:left-0 ui:top-1/2 ui:-translate-x-1/2 ui:-translate-y-1/2">
          <IconButton
            icon="ChevronLeft"
            variant="secondary"
            size={size}
            onClick={onPrev}
            disabled={!canPrev}
            aria-label="Previous"
          />
        </div>
        <div className="ui:absolute ui:right-0 ui:top-1/2 ui:-translate-y-1/2 ui:translate-x-1/2">
          <IconButton
            icon="ChevronRight"
            variant="secondary"
            size={size}
            onClick={onNext}
            disabled={!canNext}
            aria-label="Next"
          />
        </div>
      </>
    )
  }

  return (
    <div className={clsx('ui:flex ui:gap-2', className)}>
      <IconButton
        icon="ChevronLeft"
        variant="secondary"
        size={size}
        onClick={onPrev}
        disabled={!canPrev}
        aria-label="Previous"
      />
      <IconButton
        icon="ChevronRight"
        variant="secondary"
        size={size}
        onClick={onNext}
        disabled={!canNext}
        aria-label="Next"
      />
    </div>
  )
}

export default CarouselNavigation
