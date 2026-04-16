import { Container, Section } from '@vite-mf-monorepo/layouts'
import { Button, Image, Rating, Typography } from '@vite-mf-monorepo/ui'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import {
  getPosterUrl,
  getResultLabel,
  getResultRoute,
  getResultYear,
} from '../SearchTypeahead/searchTypeahead.utils'

import type { SearchResult } from '../SearchTypeahead/searchTypeahead.utils'
import type { FC } from 'react'

export interface SearchMediaProps {
  items: SearchResult[]
  title: string
  hasMore?: boolean
  onLoadMore?: () => void
  isLoadingMore?: boolean
}

const PAGE_SIZE = 10

const SearchMedia: FC<SearchMediaProps> = ({
  items,
  title,
  hasMore,
  onLoadMore,
  isLoadingMore,
}) => {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  if (items.length === 0) return null

  const visibleItems = items.slice(0, visibleCount)
  const hasMoreLocal = visibleCount < items.length

  return (
    <Container variant="default">
      <Section spacing="lg" maxWidth="xl">
        <Typography variant="h2" className="sr:mb-6">
          {title}
        </Typography>
        <div className="sr:flex sr:flex-col sr:divide-y sr:divide-neutral-200">
          {visibleItems.map((item) => {
            const route = getResultRoute(item)
            const year = getResultYear(item)
            const posterUrl = getPosterUrl(item)
            const rating = (item as SearchResult & { vote_average?: number })
              .vote_average

            return (
              <Link
                key={item.id}
                to={route ?? ''}
                className="sr:flex sr:items-center sr:gap-4 sr:py-3 sr:no-underline sr:text-inherit sr:transition-colors"
              >
                <div className="sr:w-[62px] sr:shrink-0">
                  {posterUrl ? (
                    <Image
                      src={posterUrl}
                      alt={getResultLabel(item)}
                      aspectRatio="2/3"
                    />
                  ) : (
                    <div className="sr:aspect-[2/3] sr:w-full sr:rounded sr:bg-neutral-200" />
                  )}
                </div>
                <div className="sr:flex sr:flex-1 sr:flex-col sr:gap-1">
                  <div className="sr:flex sr:items-baseline sr:justify-between sr:gap-2">
                    <Typography variant="label">
                      {getResultLabel(item)}
                    </Typography>
                    {year && (
                      <Typography variant="caption" className="sr:shrink-0">
                        {String(year)}
                      </Typography>
                    )}
                  </div>
                  {rating != null && rating > 0 && (
                    <Rating value={rating} variant="stars" size="sm" />
                  )}
                </div>
              </Link>
            )
          })}
        </div>
        {(hasMoreLocal || hasMore) && (
          <div className="sr:mt-6 sr:flex sr:justify-end">
            <Button
              onClick={() => {
                if (hasMoreLocal) {
                  setVisibleCount((prev) => prev + PAGE_SIZE)
                } else {
                  onLoadMore?.()
                }
              }}
              disabled={isLoadingMore}
              variant="secondary"
              size="sm"
              icon="Bars3"
            >
              {isLoadingMore ? 'Loading...' : 'Show more'}
            </Button>
          </div>
        )}
      </Section>
    </Container>
  )
}

export default SearchMedia
