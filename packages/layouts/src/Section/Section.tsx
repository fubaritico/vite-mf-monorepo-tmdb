import clsx from 'clsx'

import type { FC, HTMLAttributes } from 'react'

/** Section max-width variants */
export type SectionMaxWidth = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** Section title */
  title?: string
  /** Maximum width variant */
  maxWidth?: SectionMaxWidth
  /** Vertical spacing */
  spacing?: 'sm' | 'md' | 'lg'
}

/**
 * Section component for page sections.
 * Provides max-width, horizontal padding, and vertical spacing.
 */
const Section: FC<SectionProps> = ({
  title,
  maxWidth = 'xl',
  spacing = 'md',
  className,
  children,
  ...rest
}) => {
  return (
    <section
      className={clsx(
        'layout:mx-auto layout:px-4 sm:layout:px-5 md:layout:px-6 lg:layout:px-8',
        {
          'layout:max-w-screen-sm': maxWidth === 'sm',
          'layout:max-w-screen-md': maxWidth === 'md',
          'layout:max-w-screen-lg': maxWidth === 'lg',
          'layout:max-w-screen-xl': maxWidth === 'xl',
          'layout:max-w-screen-2xl': maxWidth === '2xl',
          'layout:max-w-full': maxWidth === 'full',
          'layout:py-6': spacing === 'sm',
          'layout:py-12': spacing === 'md',
          'layout:py-16': spacing === 'lg',
        },
        className
      )}
      {...rest}
    >
      {title && (
        <h2 className="layout:text-2xl layout:font-bold layout:mb-6">
          {title}
        </h2>
      )}
      {children}
    </section>
  )
}

export default Section
