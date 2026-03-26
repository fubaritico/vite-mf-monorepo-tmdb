import { LogoT } from '@vite-mf-monorepo/shared/assets'
import clsx from 'clsx'
import { useEffect, useRef } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

import { Footer } from '../Footer'
import { Header } from '../Header'

import type { HTMLAttributes } from 'react'

export interface RootLayoutProps extends HTMLAttributes<HTMLDivElement> {
  /** Hide default header */
  hideHeader?: boolean
  /** Hide default footer */
  hideFooter?: boolean
  /** URL of the project's GitHub repository */
  projectUrl?: string
}

/**
 * RootLayout component for React Router.
 * Provides the main application layout with sticky header and footer.
 * Uses flexbox to ensure footer stays at bottom when content is short.
 */
export default function RootLayout({
  hideHeader = false,
  hideFooter = false,
  className,
  projectUrl,
  ...rest
}: Readonly<RootLayoutProps>) {
  const { pathname } = useLocation()
  const prevPathnameRef = useRef(pathname)

  /**
   * Scrolls to top on every page navigation, with two exceptions:
   * - Opening the lightbox (/photos/ in new path) — media page must stay in place.
   * - Closing the lightbox (/photos/ in previous path) — restores media scroll position.
   */
  useEffect(() => {
    const prev = prevPathnameRef.current
    prevPathnameRef.current = pathname

    if (pathname.includes('/photos/')) return
    if (prev.includes('/photos/')) return

    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  const TMDBLogo = () => (
    <Link to="/" className="layout:no-underline">
      <div className="layout:flex layout:items-center layout:gap-2">
        <LogoT />
        <span className="layout:text-white layout:font-bold layout:text-xl">
          TMDB
        </span>
      </div>
    </Link>
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
          <p className="layout:text-sm layout:text-footer-foreground layout:text-center">
            © 2026 TMDB Clone. All rights reserved.{' '}
            <span className="layout:mx-1">|</span>{' '}
            <a
              href={projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="layout:text-sm layout:text-footer-foreground layout:no-underline layout:hover:underline layout:hover:text-white"
            >
              See project source on GitHub
            </a>
          </p>
        </Footer>
      )}
    </div>
  )
}
