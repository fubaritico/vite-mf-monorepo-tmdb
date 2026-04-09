import { Container, Section } from '@vite-mf-monorepo/layouts'
import { Avatar, Button, Typography } from '@vite-mf-monorepo/ui'
import { useState } from 'react'

import {
  getPersonDepartment,
  getPersonKnownFor,
  getProfileImageUrl,
  getResultLabel,
} from '../SearchTypeahead/searchTypeahead.utils'

import type { SearchResult } from '../SearchTypeahead/searchTypeahead.utils'
import type { FC } from 'react'

export interface SearchPeopleProps {
  items: SearchResult[]
  title: string
  hasMore?: boolean
  onLoadMore?: () => void
  isLoadingMore?: boolean
}

const PAGE_SIZE = 10

const SearchPeople: FC<SearchPeopleProps> = ({
  items,
  title,
  hasMore: hasMoreApi,
  onLoadMore,
  isLoadingMore,
}) => {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  if (items.length === 0) return null

  const visibleItems = items.slice(0, visibleCount)
  const hasMore = visibleCount < items.length

  return (
    <Container variant="default">
      <Section spacing="lg" maxWidth="xl">
        <Typography variant="h2" className="sr:mb-6">
          {title}
        </Typography>
        <div className="sr:flex sr:flex-col sr:divide-y sr:divide-neutral-200">
          {visibleItems.map((item) => {
            const profileUrl = getProfileImageUrl(item)
            const department = getPersonDepartment(item)
            const knownFor = getPersonKnownFor(item)

            return (
              <div
                key={item.id}
                className="sr:flex sr:items-center sr:gap-4 sr:py-3"
              >
                <Avatar
                  src={profileUrl ?? undefined}
                  alt={getResultLabel(item)}
                  size="xl"
                />
                <div className="sr:flex sr:flex-1 sr:flex-col sr:gap-0.5">
                  <Typography variant="label">
                    {getResultLabel(item)}
                  </Typography>
                  {department && (
                    <Typography
                      variant="caption"
                      className="sr:text-neutral-500"
                    >
                      {department}
                    </Typography>
                  )}
                </div>
                {knownFor.length > 0 && (
                  <Typography
                    variant="caption"
                    className="sr:hidden sr:shrink-0 sr:text-right sr:text-neutral-500 sr:sm:block"
                  >
                    Known for &quot;{knownFor.join('", "')}&quot;
                  </Typography>
                )}
              </div>
            )
          })}
        </div>
        {(hasMore || hasMoreApi) && (
          <div className="sr:mt-6 sr:flex sr:justify-end">
            <Button
              onClick={() => {
                if (hasMore) {
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

export default SearchPeople
