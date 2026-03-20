import clsx from 'clsx'

import { Footer } from '../Footer'
import { Header } from '../Header'

import type { FC, HTMLAttributes, ReactNode } from 'react'

export interface NextRootLayoutProps extends HTMLAttributes<HTMLDivElement> {
  /** Logo or brand element */
  logo?: ReactNode
  /** Page content */
  children: ReactNode
  /** Hide default header */
  hideHeader?: boolean
  /** Hide default footer */
  hideFooter?: boolean
  /** Footer content */
  footerContent?: ReactNode
}

/**
 * RootLayout component for Next.js App Router.
 * Server Component — scroll-to-top is handled natively by Next.js.
 * Uses children prop instead of Outlet.
 */
const RootLayout: FC<NextRootLayoutProps> = ({
  logo,
  children,
  hideHeader = false,
  hideFooter = false,
  footerContent,
  className,
  ...rest
}) => {
  return (
    <div
      className={clsx(
        'layout:min-h-screen layout:flex layout:flex-col layout:bg-background',
        className
      )}
      {...rest}
    >
      {!hideHeader && <Header logo={logo} />}

      <main className="layout:flex-1">{children}</main>

      {!hideFooter && <Footer>{footerContent}</Footer>}
    </div>
  )
}

export default RootLayout
