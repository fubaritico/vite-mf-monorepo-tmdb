import { Container, Section } from '@vite-mf-monorepo/layouts'
import { Skeleton } from '@vite-mf-monorepo/ui'
import { Suspense, lazy } from 'react'

import HeroSection from './HeroSection/HeroSection'
import TrendingSection from './TrendingSection/TrendingSection'

import type { FC } from 'react'

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
          <TrendingSection />
        </Section>
      </Container>

      {/* What's Popular Section - Gray background */}
      <Container variant="muted">
        <Section spacing="lg" maxWidth="xl">
          <Suspense
            fallback={
              <div style={{ minHeight: '421px' }}>
                <Skeleton variant="rectangle" width="100%" height="421px" />
              </div>
            }
          >
            <div style={{ contentVisibility: 'auto' }}>
              <PopularSection />
            </div>
          </Suspense>
        </Section>
      </Container>

      {/* Free to Watch Section - White background */}
      <Container variant="default">
        <Section spacing="lg" maxWidth="xl">
          <Suspense
            fallback={
              <div style={{ minHeight: '421px' }}>
                <Skeleton variant="rectangle" width="100%" height="421px" />
              </div>
            }
          >
            <div style={{ contentVisibility: 'auto' }}>
              <FreeToWatchSection />
            </div>
          </Suspense>
        </Section>
      </Container>
    </>
  )
}

export default Home
