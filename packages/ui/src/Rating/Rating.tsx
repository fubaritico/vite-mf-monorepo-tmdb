import clsx from 'clsx'

import CircleRating from './CircleRating'
import StarsRating from './StarsRating'

import type { FC } from 'react'

export type RatingVariant = 'circle' | 'stars'
export type RatingSize = 'sm' | 'md' | 'lg'

export interface RatingProps {
  /** Rating value (0-10 by default, or 0-100 if max=100) */
  value: number
  /** Maximum value (default: 10 for TMDB scores) */
  max?: number
  /** Visual variant */
  variant?: RatingVariant
  /** Size of the rating */
  size?: RatingSize
  /** Show the numeric value */
  showValue?: boolean
  /** Custom class for the background track circle (circle variant only) */
  trackClassName?: string
  /** Additional class name */
  className?: string
}

const Rating: FC<RatingProps> = ({
  value,
  max = 10,
  variant = 'circle',
  size = 'md',
  showValue = true,
  trackClassName,
  className,
}) => {
  const clampedValue = Math.max(0, Math.min(value, max))
  const percent = (clampedValue / max) * 100

  return (
    <div className={clsx('ui:inline-flex', className)}>
      {variant === 'circle' ? (
        <CircleRating
          percent={percent}
          size={size}
          showValue={showValue}
          value={clampedValue}
          max={max}
          trackClassName={trackClassName}
        />
      ) : (
        <StarsRating
          percent={percent}
          size={size}
          showValue={showValue}
          value={clampedValue}
          max={max}
        />
      )}
    </div>
  )
}

export default Rating
