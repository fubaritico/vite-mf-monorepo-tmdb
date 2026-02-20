import clsx from 'clsx'

import type { FC, HTMLAttributes } from 'react'

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** Section title */
  title?: string
  /** Section background variant */
  variant?: 'default' | 'muted'
  /** Vertical spacing */
  spacing?: 'sm' | 'md' | 'lg'
}

/**
 * Section component for page sections.
 * Provides consistent spacing and optional background variants.
 */
const Section: FC<SectionProps> = ({
  title,
  variant = 'default',
  spacing = 'md',
  className,
  children,
  ...rest
}) => {
  return (
    <section
      className={clsx(
        'layout:w-full',
        {
          'layout:bg-muted': variant === 'muted',
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
