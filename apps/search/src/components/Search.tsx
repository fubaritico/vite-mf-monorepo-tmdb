import { Container, Section } from '@vite-mf-monorepo/layouts'
import {
  Button,
  HeroImage,
  Input,
  Skeleton,
  Typography,
} from '@vite-mf-monorepo/ui'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useSearchMultiInfinite } from '../hooks/useSearchMultiInfinite'

import { SearchMedia } from './SearchMedia'
import { SearchPeople } from './SearchPeople'
import {
  isActor,
  isDirector,
  isMovie,
  isTv,
} from './SearchTypeahead/searchTypeahead.utils'

import type { FC } from 'react'

import '../remote.css'

const HERO_BACKDROP = '/8OzmkRKFzZZ7FklnmzL3nFaRr4z.jpg'

/** Search results page — displays movies, TV shows, actors and directors matching the query. */
const Search: FC = () => {
  const { query = '' } = useParams<{ query: string }>()
  const navigate = useNavigate()
  const [inputValue, setInputValue] = useState(query)

  useEffect(() => {
    const decodedQuery = decodeURIComponent(query)
    document.title = decodedQuery
      ? `Search results for "${decodedQuery}"`
      : 'Search'
  }, [query])

  const {
    results,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,
  } = useSearchMultiInfinite(query)

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (inputValue.trim().length >= 2) {
      void navigate(`/search/${encodeURIComponent(inputValue.trim())}`)
    }
  }

  const movies = results.filter(isMovie)
  const tvShows = results.filter(isTv)
  const actors = results.filter(isActor)
  const directors = results.filter(isDirector)

  return (
    <div data-testid="mf-ready-search">
      {/* Hero — same pattern as MediaHero / HeroSection */}
      <div className="sr:relative sr:aspect-[21/9] sr:lg:max-h-[300px] sr:w-full sr:overflow-hidden">
        <HeroImage backdropPath={HERO_BACKDROP} />
      </div>

      {/* Search bar — full-bleed dark bg */}
      <div className="sr:bg-neutral-900 sr:py-6">
        <div className="sr:mx-auto sr:max-w-lg sr:px-4">
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
      </div>

      <Container variant="default">
        <Section spacing="lg" maxWidth="xl">
          {isPending && (
            <div className="sr:flex sr:flex-col sr:gap-4">
              <Skeleton variant="rectangle" width="60%" height="32px" />
              <Skeleton variant="rectangle" width="100%" height="80px" />
              <Skeleton variant="rectangle" width="100%" height="80px" />
              <Skeleton variant="rectangle" width="100%" height="80px" />
            </div>
          )}
          {isError && (
            <Typography variant="body" className="sr:text-red-500">
              Something went wrong. Please try again.
            </Typography>
          )}
          {!isPending && !isError && query.length >= 2 && (
            <Typography variant="h1">
              Search results for &ldquo;
              <strong>{decodeURIComponent(query)}</strong>&rdquo;
            </Typography>
          )}
        </Section>
      </Container>

      <SearchMedia
        items={movies}
        title="Movies"
        hasMore={hasNextPage}
        onLoadMore={() => {
          void fetchNextPage()
        }}
        isLoadingMore={isFetchingNextPage}
      />
      <SearchMedia
        items={tvShows}
        title="TV Shows"
        hasMore={hasNextPage}
        onLoadMore={() => {
          void fetchNextPage()
        }}
        isLoadingMore={isFetchingNextPage}
      />
      <SearchPeople
        items={actors}
        title="Actors"
        hasMore={hasNextPage}
        onLoadMore={() => {
          void fetchNextPage()
        }}
        isLoadingMore={isFetchingNextPage}
      />
      <SearchPeople
        items={directors}
        title="Directors"
        hasMore={hasNextPage}
        onLoadMore={() => {
          void fetchNextPage()
        }}
        isLoadingMore={isFetchingNextPage}
      />
    </div>
  )
}

export default Search
