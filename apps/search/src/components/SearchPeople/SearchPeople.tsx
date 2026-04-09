import { Container, Section } from '@vite-mf-monorepo/layouts'
import { Avatar, Typography } from '@vite-mf-monorepo/ui'

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
}

const SearchPeople: FC<SearchPeopleProps> = ({ items, title }) => {
  if (items.length === 0) return null

  return (
    <Container variant="default">
      <Section spacing="lg" maxWidth="xl">
        <Typography variant="h2" className="sr:mb-6">
          {String(items.length)} results for {title}
        </Typography>
        <div className="sr:flex sr:flex-col sr:divide-y sr:divide-neutral-200">
          {items.map((item) => {
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
      </Section>
    </Container>
  )
}

export default SearchPeople
