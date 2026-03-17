import clsx from 'clsx'

import type { FC } from 'react'

export interface SpinnerProps {
  className?: string
}

const Spinner: FC<SpinnerProps> = ({ className }) => {
  console.warn(
    'Spinner is deprecated and will be removed in a future version. Use Skeleton instead.'
  )
  return (
    <div
      role="status"
      aria-label="Loading"
      className={clsx(
        'ui:size-12 ui:rounded-full ui:border-4 ui:border-white/20 ui:border-t-white ui:animate-spin',
        className
      )}
    />
  )
}

export default Spinner
