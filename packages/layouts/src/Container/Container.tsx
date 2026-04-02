import clsx from 'clsx'

import type { HTMLAttributes } from 'react'

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Background variant 'default' for transparent background, 'muted' for light grey background */
  variant?: 'default' | 'muted'
}

/**
 * Container component for full-width sections with background variants.
 * Wraps content with optional background color.
 */
export default function Container({
  variant = 'default',
  className,
  children,
  ...rest
}: Readonly<ContainerProps>) {
  return (
    <div
      className={clsx(
        'media-section',
        'layout:w-full',
        {
          'layout:bg-muted': variant === 'muted',
        },
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
