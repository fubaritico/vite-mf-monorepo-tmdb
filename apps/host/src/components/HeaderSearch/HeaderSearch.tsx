import { Suspense, lazy } from 'react'

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
  return (
    <Suspense>
      <SearchTypeahead />
    </Suspense>
  )
}

export default HeaderSearch
