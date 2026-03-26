import { LogoT } from '@vite-mf-monorepo/shared/assets'
import clsx from 'clsx'
import Link from 'next/link'

import { Footer } from '../Footer'
import { Header } from '../Header'

import type { HTMLAttributes, ReactNode } from 'react'

export interface NextRootLayoutProps extends HTMLAttributes<HTMLDivElement> {
  /** Page content */
  children: ReactNode
  /** Hide default header */
  hideHeader?: boolean
  /** Hide default footer */
  hideFooter?: boolean
  /**
   * When true, the logo link renders a plain `<a href="/">` instead of
   * `<Link href="/">` from next/link. Required in multi-zone setups where
   * the home route lives in a different zone.
   *
   * @default false
   */
  crossZoneHome?: boolean
}

/**
 * RootLayout component for Next.js App Router.
 * Server Component — scroll-to-top is handled natively by Next.js.
 * Uses children prop instead of Outlet.
 */
export default function RootLayout({
  children,
  hideHeader = false,
  hideFooter = false,
  crossZoneHome = false,
  className,
  ...rest
}: Readonly<NextRootLayoutProps>) {
  const logoContent = (
    <div className="layout:flex layout:items-center layout:gap-2">
      <LogoT />
      <span className="layout:text-white layout:font-bold layout:text-xl">
        TMDB
      </span>
    </div>
  )

  const TMDBLogo = () =>
    crossZoneHome ? (
      <a href="/" className="layout:no-underline">
        {logoContent}
      </a>
    ) : (
      <Link href="/" className="layout:no-underline">
        {logoContent}
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

      <main className="layout:flex-1">{children}</main>

      {!hideFooter && (
        <Footer>
          <p className="layout:text-sm layout:text-footer-foreground layout:text-center">
            © 2026 TMDB Clone. All rights reserved.{' '}
            <span className="layout:mx-1">|</span>{' '}
            <a
              href="https://github.com/fubaritico/nextjs-multizone-tmdb"
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
