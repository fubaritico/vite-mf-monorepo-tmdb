import clsx from 'clsx'

import type { FC, HTMLAttributes } from 'react'

/** Container max-width variants */
export type ContainerMaxWidth = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Maximum width variant */
  maxWidth?: ContainerMaxWidth
  /** Disable horizontal padding */
  noPadding?: boolean
}

/**
 * Container component for consistent max-width and horizontal padding.
 * Centers content and provides responsive padding.
 */
const Container: FC<ContainerProps> = ({
  maxWidth = 'xl',
  noPadding = false,
  className,
  children,
  ...rest
}) => {
  return (
    <div
      className={clsx(
        'layout:mx-auto',
        {
          'layout:px-4 sm:layout:px-6 lg:layout:px-8': !noPadding,
          'layout:max-w-screen-sm': maxWidth === 'sm',
          'layout:max-w-screen-md': maxWidth === 'md',
          'layout:max-w-screen-lg': maxWidth === 'lg',
          'layout:max-w-screen-xl': maxWidth === 'xl',
          'layout:max-w-screen-2xl': maxWidth === '2xl',
          'layout:max-w-full': maxWidth === 'full',
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
