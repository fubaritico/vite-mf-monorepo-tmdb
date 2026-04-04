import { Typography } from '@vite-mf-monorepo/ui'

import type { FC } from 'react'

import '../remote.css'

const Search: FC = () => {
  return (
    <div data-testid="mf-ready-search">
      <Typography variant="h1">Search</Typography>
    </div>
  )
}

export default Search
