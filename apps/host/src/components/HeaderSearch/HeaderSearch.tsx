import { Suspense, lazy } from 'react'
import { useMatch } from 'react-router-dom'

import type { FC } from 'react'

/**
 * Header search typeahead exposed via Module Federation from the search remote.
 */
const SearchTypeahead = lazy(() =>
  import('search/SearchTypeahead').then((m) => ({
    default: m.default,
  }))
)

/**
 * Header search typeahead component.
 * @constructor
 */
const HeaderSearch: FC = () => {
  const isSearchPage = useMatch('/search/:query')

  if (isSearchPage) return null

  return (
    <Suspense>
      <SearchTypeahead />
    </Suspense>
  )
}

export default HeaderSearch
