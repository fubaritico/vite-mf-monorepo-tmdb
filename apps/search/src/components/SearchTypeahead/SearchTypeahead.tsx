import { useIsMobile } from '@vite-mf-monorepo/shared'
import { Button, Drawer, Typeahead, Typography } from '@vite-mf-monorepo/ui'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import '../../remote.css'

import { useSearchMulti } from '../../hooks/useSearchMulti'

import ResultsContent from './ResultsContent'
import {
  getPersonDepartment,
  getResultLabel,
  getResultRoute,
  isMovie,
  isPerson,
  isTv,
} from './searchTypeahead.utils'

import type { FC } from 'react'

/**
 * Header search typeahead exposed via Module Federation from the search remote
 *
 * - **Desktop (≥md)**: renders a Typeahead with a portal dropdown grouped
 *   by Movies, TV Shows, and People.
 * - **Mobile (<md)**: renders a bottom Drawer that opens on input and
 *   stays visible while the user keeps typing.
 * - **Enter without selection**: navigates to `/search?q=...`
 * - **Select a movie/tv item**: navigates to `/movie/:id` or `/tv/:id`
 * - **Person items**: displayed but disabled (no talent page yet)
 */
const SearchTypeahead: FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const navigate = useNavigate()
  const isMobile = useIsMobile()
  const { data, isError } = useSearchMulti(searchQuery)

  const results = data?.results ?? []
  const movies = results.filter(isMovie).slice(0, 4)
  const tvShows = results.filter(isTv).slice(0, 4)
  const persons = results.filter(isPerson).slice(0, 4)
  const hasResults =
    movies.length > 0 || tvShows.length > 0 || persons.length > 0

  /**
   *
   * @param value
   */
  const handleSelect = (value: string) => {
    setDrawerOpen(false)
    void navigate(value)
  }

  /**
   * Handles search input changes.
   * - Opens the drawer on mobile when input length is >= 2
   * - Closes the drawer when input length is < 2
   * - Updates search query
   */
  const handleSearch = (value: string) => {
    setSearchQuery(value)
    if (isMobile && value.length >= 2) {
      setDrawerOpen(true)
    } else if (value.length < 2) {
      setDrawerOpen(false)
    }
  }

  /** Navigates to the search page on Enter when no item is highlighted */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchQuery.length >= 2) {
      const activeElement = document.querySelector('[aria-activedescendant]')
      const hasActiveItem = activeElement?.getAttribute('aria-activedescendant')

      if (!hasActiveItem) {
        e.preventDefault()
        setDrawerOpen(false)
        void navigate(`/search/${encodeURIComponent(searchQuery)}`)
      }
    }
  }

  return (
    <div
      onKeyDown={handleKeyDown}
      className="sr:flex sr:items-center sr:gap-1 sr:w-48 sr:sm:w-56 sr:md:w-72 sr:lg:w-96"
    >
      <Typeahead
        onSearch={handleSearch}
        onSelect={handleSelect}
        debounceMs={300}
        minChars={2}
        clearOnSelect={false}
        portal={!isMobile}
        variant="dark"
        className="sr:min-w-0"
      >
        <Typeahead.Input
          placeholder="Search..."
          icon="MagnifyingGlass"
          inputSize="sm"
        />
        {!isMobile && (
          <Typeahead.Menu>
            <ResultsContent
              movies={movies}
              tvShows={tvShows}
              persons={persons}
            />
            {!hasResults && searchQuery.length >= 2 && !isError && (
              <Typeahead.Empty>No results found</Typeahead.Empty>
            )}
            {isError && searchQuery.length >= 2 && (
              <Typeahead.Empty>
                Search unavailable — check your connection
              </Typeahead.Empty>
            )}
          </Typeahead.Menu>
        )}
      </Typeahead>

      {isMobile && searchQuery.length >= 2 && (
        <Button
          icon="ArrowRight"
          variant="primary"
          size="sm"
          className="sr:shrink-0 sr:ml-2"
          onClick={() => {
            setDrawerOpen(false)
            void navigate(`/search/${encodeURIComponent(searchQuery)}`)
          }}
        >
          {null}
        </Button>
      )}

      {isMobile && (
        <Drawer
          open={drawerOpen && (hasResults || isError)}
          onClose={() => {
            setDrawerOpen(false)
          }}
          variant="dark"
        >
          <Drawer.Header>
            <Typography variant="caption">
              {isError ? 'Search unavailable' : 'Search results'}
            </Typography>
          </Drawer.Header>
          <Drawer.Body>
            <div className="sr:flex sr:flex-col sr:gap-4">
              {isError && (
                <Typography
                  variant="body"
                  className="sr:px-2 sr:py-4 sr:text-neutral-400"
                >
                  Check your connection and try again.
                </Typography>
              )}
              {movies.length > 0 && (
                <div>
                  <Typography
                    variant="overline"
                    className="sr:block sr:px-2 sr:py-0.5 sr:text-neutral-400"
                  >
                    Movies
                  </Typography>
                  {movies.map((r) => {
                    const route = getResultRoute(r)
                    return (
                      <Link
                        key={r.id}
                        to={route ?? ''}
                        onClick={() => {
                          handleSelect(route ?? '')
                        }}
                        className="sr:flex sr:items-center sr:gap-2 sr:px-2 sr:py-1.5 sr:no-underline sr:text-neutral-200 sr:hover:bg-neutral-800 sr:rounded sr:text-xs"
                      >
                        <span>{getResultLabel(r)}</span>
                        {r.release_date && (
                          <span className="sr:ml-auto sr:opacity-60">
                            {new Date(r.release_date).getFullYear()}
                          </span>
                        )}
                      </Link>
                    )
                  })}
                </div>
              )}

              {tvShows.length > 0 && (
                <div>
                  <Typography
                    variant="overline"
                    className="sr:block sr:px-2 sr:py-0.5 sr:text-neutral-400"
                  >
                    TV Shows
                  </Typography>
                  {tvShows.map((r) => {
                    const route = getResultRoute(r)
                    return (
                      <Link
                        key={r.id}
                        to={route ?? ''}
                        onClick={() => {
                          handleSelect(route ?? '')
                        }}
                        className="sr:flex sr:items-center sr:gap-2 sr:px-2 sr:py-1.5 sr:no-underline sr:text-neutral-200 sr:hover:bg-neutral-800 sr:rounded sr:text-xs"
                      >
                        <span>{getResultLabel(r)}</span>
                      </Link>
                    )
                  })}
                </div>
              )}

              {persons.length > 0 && (
                <div>
                  <Typography
                    variant="overline"
                    className="sr:block sr:px-2 sr:py-0.5 sr:text-neutral-400"
                  >
                    People
                  </Typography>
                  {persons.map((r) => (
                    <div
                      key={r.id}
                      className="sr:flex sr:items-center sr:gap-2 sr:px-2 sr:py-1.5 sr:text-neutral-400 sr:text-xs"
                    >
                      <span>{getResultLabel(r)}</span>
                      {getPersonDepartment(r) && (
                        <span className="sr:ml-auto sr:opacity-60">
                          {getPersonDepartment(r)}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Drawer.Body>
        </Drawer>
      )}
    </div>
  )
}

export default SearchTypeahead
