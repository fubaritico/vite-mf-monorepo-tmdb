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
  className,
  ...rest
}) => {
  return (
    <div
      className={clsx(
        'ui:relative ui:overflow-hidden ui:bg-muted',
        'ui-skeleton-shimmer',
        {
          'ui:rounded-lg': variant === 'rectangle',
          'ui:rounded-full': variant === 'circle',
          'ui:rounded': variant === 'line',
        },
        width,
        height,
        aspectRatio && `ui:aspect-[${aspectRatio}]`,
        className
      )}
      {...rest}
    />
  )
}

export default Skeleton
