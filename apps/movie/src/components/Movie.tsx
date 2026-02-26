import { Section } from '@vite-mf-monorepo/layouts'
import { Typography } from '@vite-mf-monorepo/ui'

import { MovieHero } from './MovieHero'

import type { FC } from 'react'

import '../remote.css'

const Movie: FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <MovieHero />

      {/* Synopsis Section - TODO */}
      <Section maxWidth="xl" spacing="md">
        <Typography variant="h2" className="mv:mb-4">
          Synopsis
        </Typography>
        <Typography variant="body" className="mv:text-muted-foreground">
          Synopsis section coming soon...
        </Typography>
      </Section>

      {/* Photos Section - TODO */}
      <Section maxWidth="xl" spacing="md">
        <Typography variant="h2" className="mv:mb-6">
          Photos
        </Typography>
        <Typography variant="body" className="mv:text-muted-foreground">
          Photos gallery coming soon...
        </Typography>
      </Section>

      {/* Crew Section - TODO */}
      <Section maxWidth="xl" spacing="md">
        <Typography variant="h2" className="mv:mb-6">
          Crew
        </Typography>
        <Typography variant="body" className="mv:text-muted-foreground">
          Director and writers information coming soon...
        </Typography>
      </Section>

      {/* Top 10 Cast Section - TODO */}
      <Section maxWidth="xl" spacing="md">
        <Typography variant="h2" className="mv:mb-6">
          Top 10 Cast
        </Typography>
        <Typography variant="body" className="mv:text-muted-foreground">
          Cast carousel coming soon...
        </Typography>
      </Section>

      {/* Trailers & Clips Section - TODO */}
      <Section maxWidth="xl" spacing="md">
        <Typography variant="h2" className="mv:mb-6">
          Trailers & Clips
        </Typography>
        <Typography variant="body" className="mv:text-muted-foreground">
          Video trailers coming soon...
        </Typography>
      </Section>

      {/* You May Also Like Section - TODO */}
      <Section maxWidth="xl" spacing="md">
        <Typography variant="h2" className="mv:mb-6">
          You May Also Like
        </Typography>
        <Typography variant="body" className="mv:text-muted-foreground">
          Similar movies carousel coming soon...
        </Typography>
      </Section>

      {/* Recommendations Section - TODO */}
      <Section maxWidth="xl" spacing="md">
        <Typography variant="h2" className="mv:mb-6">
          Recommendations
        </Typography>
        <Typography variant="body" className="mv:text-muted-foreground">
          Recommended movies carousel coming soon...
        </Typography>
      </Section>
    </div>
  )
}

export default Movie
