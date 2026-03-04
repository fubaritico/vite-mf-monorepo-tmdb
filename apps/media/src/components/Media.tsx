import { Container, Section } from '@vite-mf-monorepo/layouts'
import { Skeleton, Typography } from '@vite-mf-monorepo/ui'
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
      <Suspense
        fallback={
          <div
            className="mda:flex mda:flex-col mda:gap-4"
            style={{ minHeight: '160px' }}
          >
            <Skeleton variant="line" width="mda:w-32" height="mda:h-8" />
            <Skeleton variant="line" width="mda:w-full" height="mda:h-6" />
          </div>
        }
      >
        <Synopsis />
      </Suspense>

      {/* Crew Section - White background */}
      <Suspense
        fallback={
          <div
            className="mda:flex mda:flex-col mda:gap-4"
            style={{ minHeight: '244px' }}
          >
            <Skeleton variant="line" width="mda:w-24" height="mda:h-8" />
            <div className="mda:grid mda:grid-cols-2 mda:gap-6">
              {Array.from({ length: 2 }).map((_, i) => (
                <div
                  key={i}
                  className="mda:flex mda:flex-col mda:items-center mda:gap-2"
                >
                  <Skeleton
                    variant="circle"
                    width="mda:w-24"
                    height="mda:h-24"
                  />
                  <Skeleton variant="line" width="mda:w-20" height="mda:h-4" />
                </div>
              ))}
            </div>
          </div>
        }
      >
        <Crew />
      </Suspense>

      {/* Photos Section */}
      <Suspense
        fallback={
          <div
            className="mda:flex mda:flex-col mda:gap-4"
            style={{ minHeight: '350px' }}
          >
            <Skeleton variant="line" width="mda:w-24" height="mda:h-8" />
            <div className="mda:grid mda:grid-cols-2 md:mda:grid-cols-3 mda:gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton
                  key={i}
                  variant="rectangle"
                  width="mda:w-full"
                  height="mda:h-40"
                  rounded
                />
              ))}
            </div>
          </div>
        }
      >
        <Photos />
      </Suspense>

      {/* Cast Section */}
      <Suspense
        fallback={
          <div
            className="mda:flex mda:flex-col mda:gap-4"
            style={{ minHeight: '540px' }}
          >
            <Skeleton variant="line" width="mda:w-24" height="mda:h-8" />
            <div className="mda:grid mda:grid-cols-2 mda:gap-6">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="mda:flex mda:flex-col mda:items-center mda:gap-2"
                >
                  <Skeleton
                    variant="circle"
                    width="mda:w-20"
                    height="mda:h-20"
                  />
                  <Skeleton variant="line" width="mda:w-24" height="mda:h-4" />
                  <Skeleton variant="line" width="mda:w-20" height="mda:h-3" />
                </div>
              ))}
            </div>
          </div>
        }
      >
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
