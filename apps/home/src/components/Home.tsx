import { Container, Section } from '@vite-mf-monorepo/layouts'

import FreeToWatchSection from './FreeToWatchSection/FreeToWatchSection'
import HeroSection from './HeroSection/HeroSection'
import PopularSection from './PopularSection/PopularSection'
import TrendingSection from './TrendingSection/TrendingSection'

import type { FC } from 'react'

const SentryTestButton: FC = () => {
  return (
    <button
      className="hm:fixed hm:bottom-4 hm:right-4 hm:z-50 hm:rounded hm:bg-red-600 hm:px-3 hm:py-2 hm:text-sm hm:text-white"
      onClick={() => {
        throw new Error('Sentry test error')
      }}
    >
      Test Sentry
    </button>
  )
}

const Home: FC = () => {
  return (
    <>
      <SentryTestButton />

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
          <PopularSection />
        </Section>
      </Container>

      {/* Free to Watch Section - White background */}
      <Container variant="default">
        <Section spacing="lg" maxWidth="xl">
          <FreeToWatchSection />
        </Section>
      </Container>
    </>
  )
}

export default Home
