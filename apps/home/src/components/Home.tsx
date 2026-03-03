import { Container, Section } from '@vite-mf-monorepo/layouts'
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
          <Suspense>
            <TrendingSection />
          </Suspense>
        </Section>
      </Container>

      {/* What's Popular Section - Gray background */}
      <Container variant="muted">
        <Section spacing="lg" maxWidth="xl">
          <Suspense>
            <PopularSection />
          </Suspense>
        </Section>
      </Container>

      {/* Free to Watch Section - White background */}
      <Container variant="default">
        <Section spacing="lg" maxWidth="xl">
          <Suspense>
            <FreeToWatchSection />
          </Suspense>
        </Section>
      </Container>
    </>
  )
}

export default Home
