import clsx from 'clsx'

import type { FC } from 'react'

export interface SpinnerProps {
  className?: string
  /** Spinner size */
  size?: 'sm' | 'md' | 'lg'
  /** Custom color for the spinner track */
  color?: 'white' | 'primary'
}

const sizeClasses = {
  sm: 'ui:size-6 ui:border-2',
  md: 'ui:size-12 ui:border-4',
  lg: 'ui:size-16 ui:border-4',
} as const

const colorClasses = {
  white: 'ui:border-white/20 ui:border-t-white',
  primary: 'ui:border-primary/20 ui:border-t-primary',
} as const

const Spinner: FC<SpinnerProps> = ({
  className,
  size = 'md',
  color = 'white',
}) => {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={clsx(
        'ui:rounded-full ui:animate-spin',
        sizeClasses[size],
        colorClasses[color],
        className
      )}
    />
  )
}

export default Spinner
