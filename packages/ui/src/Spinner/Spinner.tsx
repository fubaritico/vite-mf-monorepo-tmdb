import clsx from 'clsx'

import type { FC } from 'react'

export interface SpinnerProps {
  className?: string
  /** Spinner size in pixels */
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'ui:size-6 ui:border-2',
  md: 'ui:size-12 ui:border-4',
  lg: 'ui:size-16 ui:border-4',
} as const

const Spinner: FC<SpinnerProps> = ({ className, size = 'md' }) => {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={clsx(
        'ui:rounded-full ui:border-white/20 ui:border-t-white ui:animate-spin',
        sizeClasses[size],
        className
      )}
    />
  )
}

export default Spinner
