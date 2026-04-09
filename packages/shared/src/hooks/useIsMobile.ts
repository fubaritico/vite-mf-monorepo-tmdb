import { useEffect, useState } from 'react'

/**
 * Reactive viewport hook matching Tailwind's `md` breakpoint.
 *
 * Listens for `matchMedia` changes and returns `true` when the viewport
 * is narrower than the given breakpoint (default: 768px = Tailwind md).
 *
 * @param breakpoint - Width threshold in px (default: 768)
 * @returns `true` when the viewport is narrower than the breakpoint
 */
export const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(() => {
    if (
      typeof window === 'undefined' ||
      typeof window.matchMedia !== 'function'
    )
      return false
    return window.matchMedia(`(max-width: ${String(breakpoint - 1)}px)`).matches
  })

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      typeof window.matchMedia !== 'function'
    )
      return
    const mql = window.matchMedia(`(max-width: ${String(breakpoint - 1)}px)`)
    const handler = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches)
    }
    mql.addEventListener('change', handler)
    return () => {
      mql.removeEventListener('change', handler)
    }
  }, [breakpoint])

  return isMobile
}
