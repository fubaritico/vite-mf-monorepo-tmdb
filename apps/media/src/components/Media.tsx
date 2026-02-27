import { Container, Section } from '@vite-mf-monorepo/layouts'
import { Typography } from '@vite-mf-monorepo/ui'

import { Crew } from './Crew'
import { MediaHero } from './MediaHero'
import { Synopsis } from './Synopsis'

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
      <Container variant="default">
        <Section maxWidth="xl" spacing="md">
          <Typography variant="h2" className="mda:mb-6">
            Photos
          </Typography>
          <Typography variant="body" className="mda:text-muted-foreground">
            Photos gallery coming soon...
          </Typography>
        </Section>
      </Container>

      {/* Top 10 Cast Section */}
      <Container variant="default">
        <Section maxWidth="xl" spacing="md">
          <Typography variant="h2" className="mda:mb-6">
            Top 10 Cast
          </Typography>
          <Typography variant="body" className="mda:text-muted-foreground">
            Cast carousel coming soon...
          </Typography>
        </Section>
      </Container>

      {/* Trailers & Clips Section */}
      <Container variant="default">
        <Section maxWidth="xl" spacing="md">
          <Typography variant="h2" className="mda:mb-6">
            Trailers & Clips
          </Typography>
          <Typography variant="body" className="mda:text-muted-foreground">
            Video trailers coming soon...
          </Typography>
        </Section>
      </Container>

      {/* You May Also Like Section */}
      <Container variant="default">
        <Section maxWidth="xl" spacing="md">
          <Typography variant="h2" className="mda:mb-6">
            You May Also Like
          </Typography>
          <Typography variant="body" className="mda:text-muted-foreground">
            Similar movies carousel coming soon...
          </Typography>
        </Section>
      </Container>

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
