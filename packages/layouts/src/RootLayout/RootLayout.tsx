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
  const TMDBLogo = () => (
    <div className="layout:flex layout:items-center layout:gap-2">
      <div className="layout:w-8 layout:h-8 layout:bg-primary layout:rounded layout:flex layout:items-center layout:justify-center layout:font-bold layout:text-white">
        T
      </div>
      <span className="layout:text-white layout:font-bold layout:text-xl">
        TMDB
      </span>
    </div>
  )

  return (
    <div
      className={clsx(
        'layout:min-h-screen layout:flex layout:flex-col layout:bg-background',
        className
      )}
      {...rest}
    >
      {!hideHeader && <Header logo={<TMDBLogo />} />}

      <main className="layout:flex-1">
        <Outlet />
      </main>

      {!hideFooter && (
        <Footer>
          <div className="layout:text-center">
            <p className="layout:text-sm layout:text-muted-foreground">
              © 2026 TMDB Clone. All rights reserved.
            </p>
          </div>
        </Footer>
      )}
    </div>
  )
}

export default RootLayout
