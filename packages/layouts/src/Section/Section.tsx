import clsx from 'clsx'

import type { ComponentProps } from 'react'

/** Section max-width variants */
export type SectionMaxWidth = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'

export interface SectionProps extends ComponentProps<'section'> {
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
export default function Section({
  title,
  maxWidth = 'xl',
  spacing = 'md',
  className,
  children,
  ...rest
}: Readonly<SectionProps>) {
  return (
    <section
      className={clsx(
        'layout:mx-auto layout:px-4 sm:layout:px-5 md:layout:px-6 lg:layout:px-8',
        'layout:flex layout:flex-col layout:gap-4',
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
