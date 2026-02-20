import clsx from 'clsx'

import { Container } from '../Container'

import type { FC, HTMLAttributes } from 'react'

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  /** Footer content */
  children?: React.ReactNode
}

/**
 * Footer component for application footer.
 * Uses flexbox sticky behavior to stay at bottom when content is short.
 */
const Footer: FC<FooterProps> = ({ className, children, ...rest }) => {
  return (
    <footer
      className={clsx(
        'layout:bg-black layout:text-white layout:py-8',
        'layout:border-t layout:border-border',
        className
      )}
      {...rest}
    >
      <Container>{children}</Container>
    </footer>
  )
}

export default Footer
