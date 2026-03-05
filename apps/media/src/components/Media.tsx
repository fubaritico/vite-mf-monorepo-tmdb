import { Container, Section } from '@vite-mf-monorepo/layouts'
import { Typography } from '@vite-mf-monorepo/ui'
import { Outlet } from 'react-router-dom'

import { Cast } from './Cast'
import { Crew } from './Crew'
import { MediaHero } from './MediaHero'
import { Photos } from './Photos'
import { SimilarSection } from './SimilarSection'
import { Synopsis } from './Synopsis'
import { TrailersSection } from './TrailersSection'

import type { FC } from 'react'

import '../remote.css'

const Media: FC = () => {
  return (
    <>
      {/* Hero Section - Full width, no container */}
      <MediaHero />

      {/* Synopsis Section - White background */}
      <Synopsis />

      {/* Crew Section - White background */}
      <Crew />

      {/* Photos Section */}
      <Photos />

      {/* Cast Section */}
      <Cast />

      {/* Outlet for nested routes (e.g. PhotoViewer modal) */}
      <Outlet />

      {/* Trailers & Clips Section */}
      <TrailersSection />

      {/* Similar Section with Movie/TV Tabs */}
      <SimilarSection />

      {/* Recommendations Section */}
      <Container variant="default">
        <Section maxWidth="xl" spacing="md">
          <Typography variant="h2" className="mda:mb-6">
            Recommendations
          </Typography>
          <Typography variant="body" className="mda:text-muted-foreground">
            Recommended movies carousel coming soon...
          </Typography>
        </Section>
      </Container>
    </>
  )
}

export default Media
