import { cn } from '@vite-mf-monorepo/shared'
import { Button, Input } from '@vite-mf-monorepo/ui'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import type { ComponentProps, FC } from 'react'

interface SearchBarProps extends ComponentProps<'div'> {
  /** URI encoded string used in the search, displayed in the input on init when getting to the search page */
  query: string
}

const SearchBar: FC<SearchBarProps> = ({ query, className, ...rest }) => {
  const navigate = useNavigate()
  const [inputValue, setInputValue] = useState(decodeURIComponent(query))

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (inputValue.trim().length >= 2) {
      void navigate(`/search/${encodeURIComponent(inputValue.trim())}`)
    }
  }

  return (
    <div
      data-testid="search-bar"
      className={cn(
        'sr:mx-auto sr:w-[calc(100vw-32px)] sr:sm:max-w-lg sr:px-4',
        className
      )}
      {...rest}
    >
      <form
        onSubmit={handleSubmit}
        className="sr:flex sr:items-center sr:gap-3"
      >
        <Input
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value)
          }}
          placeholder="Search..."
          icon="MagnifyingGlass"
          inputSize="sm"
        />
        <Button type="submit" variant="primary" size="sm">
          Search
        </Button>
      </form>
    </div>
  )
}

export default SearchBar
