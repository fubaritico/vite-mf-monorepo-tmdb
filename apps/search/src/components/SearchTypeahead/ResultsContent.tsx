import { Typeahead, Typography } from '@vite-mf-monorepo/ui'

import {
  getPersonDepartment,
  getResultLabel,
  getResultRoute,
} from './searchTypeahead.utils'

import type { SearchResult } from './searchTypeahead.utils'
import type { FC } from 'react'

/** Props for the shared grouped results rendered inside Typeahead.Menu (desktop) */
export interface ResultsContentProps {
  movies: SearchResult[]
  tvShows: SearchResult[]
  persons: SearchResult[]
}

/**
 * Grouped search results for the desktop Typeahead.Menu.
 *
 * Renders Movies, TV Shows, and People sections using Typeahead.Item.
 * Navigation is handled by Typeahead onSelect (value = route).
 * Person items are disabled.
 */
const ResultsContent: FC<ResultsContentProps> = ({
  movies,
  tvShows,
  persons,
}) => {
  let itemIndex = 0

  return (
    <>
      {movies.length > 0 && (
        <>
          <Typography
            variant="overline"
            className="sr:px-3 sr:py-1 sr:text-neutral-400"
          >
            Movies
          </Typography>
          {movies.map((r) => {
            const idx = itemIndex++
            const route = getResultRoute(r)
            return (
              <Typeahead.Item key={r.id} value={route ?? ''} index={idx}>
                <span className="sr:flex sr:w-full sr:items-center sr:gap-2">
                  <Typeahead.Highlight>{getResultLabel(r)}</Typeahead.Highlight>
                  {r.release_date && (
                    <span className="sr:ml-auto sr:text-xs sr:opacity-60">
                      {new Date(r.release_date).getFullYear()}
                    </span>
                  )}
                </span>
              </Typeahead.Item>
            )
          })}
        </>
      )}

      {tvShows.length > 0 && (
        <>
          <Typography
            variant="overline"
            className="sr:px-3 sr:py-1 sr:text-neutral-400"
          >
            TV Shows
          </Typography>
          {tvShows.map((r) => {
            const idx = itemIndex++
            const route = getResultRoute(r)
            return (
              <Typeahead.Item key={r.id} value={route ?? ''} index={idx}>
                <Typeahead.Highlight>{getResultLabel(r)}</Typeahead.Highlight>
              </Typeahead.Item>
            )
          })}
        </>
      )}

      {persons.length > 0 && (
        <>
          <Typography
            variant="overline"
            className="sr:px-3 sr:py-1 sr:text-neutral-400"
          >
            People
          </Typography>
          {persons.map((r) => {
            const idx = itemIndex++
            return (
              <Typeahead.Item key={r.id} value="" index={idx} disabled>
                {getResultLabel(r)}
                {getPersonDepartment(r) && (
                  <span className="sr:ml-1 sr:text-xs sr:opacity-60">
                    — {getPersonDepartment(r)}
                  </span>
                )}
              </Typeahead.Item>
            )
          })}
        </>
      )}
    </>
  )
}

export default ResultsContent
