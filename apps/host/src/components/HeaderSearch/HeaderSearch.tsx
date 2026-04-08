import { Suspense, lazy } from 'react'

import type { FC } from 'react'

const SearchTypeahead = lazy(() =>
  import('search/SearchTypeahead').then((m) => ({
    default: m.default,
  }))
)

const HeaderSearch: FC = () => {
  return (
    <Suspense>
      <SearchTypeahead />
    </Suspense>
  )
}

export default HeaderSearch
