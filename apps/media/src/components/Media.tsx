import { Container, Section } from '@vite-mf-monorepo/layouts'
import { Skeleton, Typography } from '@vite-mf-monorepo/ui'
import { Suspense, lazy } from 'react'
import { Outlet } from 'react-router-dom'

import { Crew } from './Crew'
import { MediaHero } from './MediaHero'
import { Synopsis } from './Synopsis'

import type { FC } from 'react'

const Photos = lazy(() => import('./Photos/Photos'))
const Cast = lazy(() => import('./Cast/Cast'))

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
      <Suspense
        fallback={
          <div style={{ minHeight: '438px' }}>
            <Skeleton variant="rectangle" width="100%" height="438px" />
          </div>
        }
      >
        <div style={{ contentVisibility: 'auto' }}>
          <Photos />
        </div>
      </Suspense>

      {/* Cast Section */}
      <Suspense
        fallback={
          <div style={{ minHeight: '630px' }}>
            <Skeleton variant="rectangle" width="100%" height="630px" />
          </div>
        }
      >
        <div style={{ contentVisibility: 'auto' }}>
          <Cast />
        </div>
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
