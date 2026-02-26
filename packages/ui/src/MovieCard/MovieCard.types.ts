/**
 * MovieCard component types with discriminated union for type-safe variants
 */

/**
 * Base props shared across all MovieCard variants
 */
export interface MovieCardBaseProps {
  /** Media ID */
  id: number
  /** Media title */
  title: string
  /** Poster URL (full URL or TMDB path) */
  posterUrl: string
  /** Vote average (0-10) */
  voteAverage: number
  /** Release year */
  year?: number | null
  /** Additional class name */
  className?: string
}

/**
 * MovieCard as a simple card (default, non-interactive)
 */
export interface MovieCardAsCard extends MovieCardBaseProps {
  /** Render as simple card (default) */
  as?: 'card' | undefined
  /** Not allowed when as="card" */
  to?: never
  /** Not allowed when as="card" */
  onClick?: never
}

/**
 * MovieCard as a navigable link (React Router Link)
 */
export interface MovieCardAsLink extends MovieCardBaseProps {
  /** Render as React Router Link */
  as: 'link'
  /** Navigation path (required when as="link") */
  to: string
  /** Not allowed when as="link" */
  onClick?: never
}

/**
 * MovieCard as a clickable button with custom action
 */
export interface MovieCardAsButton extends MovieCardBaseProps {
  /** Render as button with onClick */
  as: 'button'
  /** Click handler (required when as="button") */
  onClick: () => void
  /** Not allowed when as="button" */
  to?: never
}

/**
 * MovieCard props - discriminated union by 'as' prop
 *
 * @example
 * // Simple card (default)
 * <MovieCard id={1} title="..." posterUrl="..." voteAverage={8} />
 *
 * @example
 * // Navigable link
 * <MovieCard as="link" to="/movie/1" id={1} title="..." posterUrl="..." voteAverage={8} />
 *
 * @example
 * // Button with custom action
 * <MovieCard as="button" onClick={() => console.log('clicked')} id={1} title="..." posterUrl="..." voteAverage={8} />
 */
export type MovieCardProps =
  | MovieCardAsCard
  | MovieCardAsLink
  | MovieCardAsButton
