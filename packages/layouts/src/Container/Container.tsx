import clsx from 'clsx'

import type { FC, HTMLAttributes } from 'react'

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Background variant */
  variant?: 'default' | 'muted'
}

/**
 * Container component for full-width sections with background variants.
 * Wraps content with optional background color.
 */
const Container: FC<ContainerProps> = ({
  variant = 'default',
  className,
  children,
  ...rest
}) => {
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

export default Container
