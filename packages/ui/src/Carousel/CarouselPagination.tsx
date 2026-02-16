import clsx from 'clsx'

import type { FC } from 'react'

export interface CarouselPaginationProps {
  /** Total number of items */
  total: number
  /** Current active index */
  current: number
  /** Callback when a dot is clicked */
  onSelect: (index: number) => void
  /** Use light colors (for dark backgrounds) */
  light?: boolean
  /** Additional class name */
  className?: string
}

/**
 * Pagination dots for Carousel.
 * Active dot is displayed as a capsule (wider), inactive dots are circles.
 * Supports light mode for dark backgrounds (white dots).
 */
const CarouselPagination: FC<CarouselPaginationProps> = ({
  total,
  current,
  onSelect,
  light = false,
  className,
}) => {
  if (total === 0) return null

  return (
    <div className={clsx('ui:flex ui:items-center ui:gap-2', className)}>
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => {
            onSelect(index)
          }}
          aria-label={`Go to slide ${String(index + 1)}`}
          className={clsx(
            'ui:rounded-full ui:transition-all ui:duration-300',
            index === current
              ? clsx('ui:h-2 ui:w-6', light ? 'ui:bg-white' : 'ui:bg-primary')
              : clsx(
                  'ui:h-2 ui:w-2',
                  light
                    ? 'ui:bg-white/50 hover:ui:bg-white/70'
                    : 'ui:bg-gray-400 hover:ui:bg-gray-500'
                )
          )}
        />
      ))}
    </div>
  )
}

export default CarouselPagination
