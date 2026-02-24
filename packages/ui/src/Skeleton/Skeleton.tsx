import clsx from 'clsx'

import type { ComponentProps, FC } from 'react'

export interface SkeletonProps extends ComponentProps<'div'> {
  /** Shape variant */
  variant?: 'rectangle' | 'circle' | 'line'
  /** Width (Tailwind class or custom value) */
  width?: string
  /** Height (Tailwind class or custom value) */
  height?: string
  /** Aspect ratio (e.g., "2/3", "16/9", "1/1") */
  aspectRatio?: string
  /** Apply rounded corners (default: true for rectangle/line, always true for circle) */
  rounded?: boolean
}

/**
 * Skeleton - Atomic loading placeholder component
 *
 * Composable primitive for building loading states with shimmer effect.
 */
const Skeleton: FC<SkeletonProps> = ({
  variant = 'rectangle',
  width,
  height,
  aspectRatio,
  rounded = true,
  className,
  ...rest
}) => {
  return (
    <div
      className={clsx(
        'ui:relative ui:overflow-hidden ui:bg-muted',
        'ui-skeleton-shimmer',
        {
          'ui:rounded-lg': variant === 'rectangle' && rounded,
          'ui:rounded-full': variant === 'circle',
          'ui:rounded': variant === 'line' && rounded,
        },
        width,
        height,
        className
      )}
      style={aspectRatio ? { aspectRatio } : undefined}
      {...rest}
    />
  )
}

export default Skeleton
