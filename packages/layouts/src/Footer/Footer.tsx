import clsx from 'clsx'

import { Container } from '../Container'

import type { HTMLAttributes } from 'react'

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  /** Footer content */
  children?: React.ReactNode
}

/**
 * Footer component for application footer.
 * Uses flexbox sticky behavior to stay at bottom when content is short.
 */
export default function Footer({
  className,
  children,
  ...rest
}: Readonly<FooterProps>) {
  return (
    <footer
      className={clsx(
        'layout:bg-black layout:text-white layout:py-4 layout:sm:py-6 layout:md:py-8',
        'layout:border-t layout:border-border',
        className
      )}
      {...rest}
    >
      <Container>{children}</Container>
    </footer>
  )
}
