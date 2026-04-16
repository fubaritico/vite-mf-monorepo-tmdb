import { cn } from '@vite-mf-monorepo/shared'
import { Button, Input } from '@vite-mf-monorepo/ui'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import type { ComponentProps, FC } from 'react'

/**
 * Props for the SearchBar component
 *
 * @interface SearchBarProps
 * @extends {ComponentProps<'div'>}
 */
interface SearchBarProps extends ComponentProps<'div'> {
  /** URI encoded string used in the search, displayed in the input on init when getting to the search page */
  query: string
}

/**
 * SearchBar component for the search results page that displays a search input form.
 * Shows the current search query in the input field and handles form submission.
 * Automatically decodes the URI encoded query for display and re-encodes on submission.
 *
 * @component
 * @param {SearchBarProps} props - The component props
 * @param {string} props.query - URI encoded search query string to display in the input
 * @param {string} [props.className] - Additional CSS class names
 * @returns {JSX.Element} A search form with input field and submit button
 *
 * @example
 * ```tsx
 * // Display search bar with pre-filled query
 * <SearchBar query="action%20movies" />
 *
 * // Display empty search bar
 * <SearchBar query="" />
 * ```
 */
const SearchBar: FC<SearchBarProps> = ({ query, className, ...rest }) => {
  const navigate = useNavigate()
  const [inputValue, setInputValue] = useState(decodeURIComponent(query))

  /**
   * Handles search form submission by navigating to the search results page
   * with the encoded query parameter. Only submits if query is at least 2 characters.
   *
   * @param {React.SyntheticEvent} e - Form submission event
   * @returns {void}
   */
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
