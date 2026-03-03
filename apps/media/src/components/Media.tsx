import { Container, Section } from '@vite-mf-monorepo/layouts'
import { Typography } from '@vite-mf-monorepo/ui'
import { Suspense, lazy } from 'react'
import { Outlet } from 'react-router-dom'

import { MediaHero } from './MediaHero'

import type { FC } from 'react'

const Synopsis = lazy(() => import('./Synopsis/Synopsis'))
const Crew = lazy(() => import('./Crew/Crew'))
const Photos = lazy(() => import('./Photos/Photos'))
const Cast = lazy(() => import('./Cast/Cast'))

import '../remote.css'

const Media: FC = () => {
  return (
    <>
      {/* Hero Section - Full width, no container */}
      <MediaHero />

      {/* Synopsis Section - White background */}
      <Suspense>
        <Synopsis />
      </Suspense>

      {/* Crew Section - White background */}
      <Suspense>
        <Crew />
      </Suspense>

      {/* Photos Section */}
      <Suspense>
        <Photos />
      </Suspense>

      {/* Cast Section */}
      <Suspense>
        <Cast />
      </Suspense>

      {/* Outlet for nested routes (e.g. PhotoViewer modal) */}
      <Outlet />

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
