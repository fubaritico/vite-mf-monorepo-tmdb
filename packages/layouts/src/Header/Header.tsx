import clsx from 'clsx'
import { useEffect, useState } from 'react'

import { Container } from '../Container'

import type { FC, HTMLAttributes, ReactNode } from 'react'

/** Header display variant */
export type HeaderVariant = 'extended' | 'compact'

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  /** Header variant (extended shows larger header, compact shows smaller) */
  variant?: HeaderVariant
  /** Enable automatic transition from extended to compact on scroll */
  autoCompact?: boolean
  /** Scroll threshold in pixels for auto-compact transition */
  scrollThreshold?: number
  /** Logo or brand element */
  logo?: ReactNode
  /** Navigation or additional content */
  children?: ReactNode
}

/**
 * Header component with sticky positioning.
 * Supports extended and compact variants with optional auto-transition on scroll.
 */
const Header: FC<HeaderProps> = ({
  variant = 'extended',
  autoCompact = false,
  scrollThreshold = 50,
  logo,
  className,
  children,
  ...rest
}) => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    if (!autoCompact) return

    const handleScroll = () => {
      setIsScrolled(window.scrollY > scrollThreshold)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [autoCompact, scrollThreshold])

  const isCompact = autoCompact ? isScrolled : variant === 'compact'

  return (
    <header
      role="banner"
      className={clsx(
        'layout:sticky layout:top-0 layout:z-50',
        'layout:bg-black layout:text-white layout:border-b layout:border-border',
        'layout:transition-all layout:duration-300',
        isCompact ? 'layout:h-16' : 'layout:h-20',
        className
      )}
      {...rest}
    >
      <Container className="layout:h-full layout:flex layout:items-center layout:justify-between layout:py-3">
        {logo && <div className="layout:flex layout:items-center">{logo}</div>}
        {children && (
          <div className="layout:flex layout:items-center layout:gap-4">
            {children}
          </div>
        )}
      </Container>
    </header>
  )
}

export default Header
