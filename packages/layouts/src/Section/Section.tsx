import { cn } from '@vite-mf-monorepo/shared'

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
  /** flex direction for contents */
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
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
  direction = 'column',
  ...rest
}: Readonly<SectionProps>) {
  const flexDirectionClass = ((): Record<string, boolean> => {
    switch (direction) {
      case 'row-reverse':
        return { 'layout:flex-row-reverse': true }
      case 'column':
        return { 'layout:flex-col': true }
      case 'column-reverse':
        return { 'layout:flex-col-reverse': true }
      case 'row':
      default:
        return { 'layout:flex-row': true }
    }
  })()

  return (
    <section
      className={cn(
        'layout:mx-auto layout:px-4 layout:sm:px-5 layout:md:px-6 layout:lg:px-8',
        'layout:flex layout:flex-col layout:gap-4 layout:justify-start',
        {
          'layout:max-w-screen-sm': maxWidth === 'sm',
          'layout:max-w-screen-md': maxWidth === 'md',
          'layout:max-w-screen-lg': maxWidth === 'lg',
          'layout:max-w-screen-xl': maxWidth === 'xl',
          'layout:max-w-screen-2xl': maxWidth === '2xl',
          'layout:max-w-full': maxWidth === 'full',
          'layout:py-3 layout:md:py-4 layout:lg:py-6': spacing === 'sm',
          'layout:py-6 layout:md:py-8 layout:lg:py-12': spacing === 'md',
          'layout:py-8 layout:md:py-12 layout:lg:py-16': spacing === 'lg',
          ...flexDirectionClass,
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
