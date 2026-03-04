import { Container, Section } from '@vite-mf-monorepo/layouts'
import { CarouselLoading, Skeleton } from '@vite-mf-monorepo/ui'
import { Suspense, lazy } from 'react'

import HeroSection from './HeroSection/HeroSection'

import type { FC } from 'react'

const TrendingSection = lazy(() => import('./TrendingSection/TrendingSection'))
const PopularSection = lazy(() => import('./PopularSection/PopularSection'))
const FreeToWatchSection = lazy(
  () => import('./FreeToWatchSection/FreeToWatchSection')
)

const Home: FC = () => {
  return (
    <>
      {/* Hero Section - Full width, no container */}
      <HeroSection />

      {/* Trending Section - White background */}
      <Container variant="default">
        <Section spacing="lg" maxWidth="xl">
          <Suspense
            fallback={
              <div
                className="hm:flex hm:flex-col hm:gap-4"
                style={{ minHeight: '421px' }}
              >
                <Skeleton variant="line" width="hm:w-32" height="hm:h-8" />
                <Skeleton variant="line" width="hm:w-24" height="hm:h-10" />
                <CarouselLoading count={6} />
              </div>
            }
          >
            <TrendingSection />
          </Suspense>
        </Section>
      </Container>

      {/* What's Popular Section - Gray background */}
      <Container variant="muted">
        <Section spacing="lg" maxWidth="xl">
          <Suspense
            fallback={
              <div
                className="hm:flex hm:flex-col hm:gap-4"
                style={{ minHeight: '421px' }}
              >
                <Skeleton variant="line" width="hm:w-40" height="hm:h-8" />
                <CarouselLoading count={6} />
              </div>
            }
          >
            <PopularSection />
          </Suspense>
        </Section>
      </Container>

      {/* Free to Watch Section - White background */}
      <Container variant="default">
        <Section spacing="lg" maxWidth="xl">
          <Suspense
            fallback={
              <div
                className="hm:flex hm:flex-col hm:gap-4"
                style={{ minHeight: '421px' }}
              >
                <Skeleton variant="line" width="hm:w-40" height="hm:h-8" />
                <CarouselLoading count={6} />
              </div>
            }
          >
            <FreeToWatchSection />
          </Suspense>
        </Section>
      </Container>
    </>
  )
}

export default Home
