import clsx from 'clsx'

import type { FC, HTMLAttributes } from 'react'

export interface CarouselItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Whether this is a hero item (full width with snap, no border radius) */
  isHero?: boolean
}

/**
 * Wrapper for individual carousel items.
 * For hero variant, items take full width and snap to center.
 */
const CarouselItem: FC<CarouselItemProps> = ({
  children,
  isHero = false,
  className,
  ...rest
}) => {
  return (
    <div
      className={clsx(
        'ui:flex-shrink-0',
        isHero && 'ui:w-full ui:snap-center',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

export default CarouselItem
