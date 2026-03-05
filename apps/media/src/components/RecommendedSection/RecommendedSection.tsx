import { Container, Section } from '@vite-mf-monorepo/layouts'
import { Tabs, Typography } from '@vite-mf-monorepo/ui'
import { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

import { getMediaTypeFromPath } from '../../utils'

import RecommendedMoviesCarousel from './RecommendedMoviesCarousel'
import RecommendedTVCarousel from './RecommendedTVCarousel'

import type { FC } from 'react'

type MediaType = 'movie' | 'tv'

const RecommendedSection: FC = () => {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()

  // Determine media type from the current page URL
  const contextMediaType = getMediaTypeFromPath(location.pathname) as MediaType

  // Tab state defaults to the current page's media type
  const [selectedTab, setSelectedTab] = useState<MediaType>(contextMediaType)

  const handleTabChange = (value: string) => {
    setSelectedTab(value as MediaType)
  }

  return (
    <Container variant="default">
      <Section maxWidth="xl" spacing="md">
        <div className="mda:flex mda:flex-col mda:gap-4">
          <Typography variant="h2">Recommended for you</Typography>

          {/* Tabs */}
          <Tabs
            value={selectedTab}
            onValueChange={handleTabChange}
            variant="pills"
          >
            <Tabs.List>
              <Tabs.Trigger value="movie">Movies</Tabs.Trigger>
              <Tabs.Trigger value="tv">Series TV</Tabs.Trigger>
            </Tabs.List>
          </Tabs>

          {/* Carousel */}
          {selectedTab === 'movie' ? (
            <RecommendedMoviesCarousel id={Number(id)} />
          ) : (
            <RecommendedTVCarousel id={Number(id)} />
          )}
        </div>
      </Section>
    </Container>
  )
}

export default RecommendedSection
