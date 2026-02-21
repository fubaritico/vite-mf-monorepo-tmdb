import clsx from 'clsx'
import { Outlet } from 'react-router-dom'

import { Footer } from '../Footer'
import { Header } from '../Header'

import type { FC, HTMLAttributes } from 'react'

export interface RootLayoutProps extends HTMLAttributes<HTMLDivElement> {
  /** Hide default header */
  hideHeader?: boolean
  /** Hide default footer */
  hideFooter?: boolean
}

/**
 * RootLayout component for React Router.
 * Provides the main application layout with sticky header and footer.
 * Uses flexbox to ensure footer stays at bottom when content is short.
 */
const RootLayout: FC<RootLayoutProps> = ({
  hideHeader = false,
  hideFooter = false,
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
      {!hideHeader && <Header />}

      <main className="layout:flex-1">
        <Outlet />
      </main>

      {!hideFooter && <Footer />}
    </div>
  )
}

export default RootLayout
