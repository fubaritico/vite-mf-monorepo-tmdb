import { Container, Section } from '@vite-mf-monorepo/layouts'
import { HeroImage, Skeleton, Typography } from '@vite-mf-monorepo/ui'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useSearchMultiInfinite } from '../hooks/useSearchMultiInfinite'

import SearchBar from './SearchBar/SearchBar.tsx'
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

  const movies = results.filter(isMovie)
  const tvShows = results.filter(isTv)
  const actors = results.filter(isActor)
  const directors = results.filter(isDirector)

  return (
    <div data-testid="mf-ready-search">
      {/* Hero — same pattern as MediaHero / HeroSection */}
      <div className="sr:relative sr:h-[100px] sr:sm:h-[150px] sr:w-full sr:overflow-hidden">
        <HeroImage backdropPath={HERO_BACKDROP} />
        <SearchBar
          query={query}
          className="sr:absolute sr:left-1/2 sr:-translate-1/2 sr:bottom-4 sr:z-10"
        />
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
              Search results for{' '}
              <span className="mda:font-bold">
                &ldquo;{decodeURIComponent(query)}&rdquo;
              </span>
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
