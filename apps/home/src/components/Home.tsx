import { Container, Section } from '@vite-mf-monorepo/layouts'

import FreeToWatchSection from './FreeToWatchSection/FreeToWatchSection'
import HeroSection from './HeroSection/HeroSection'
import PopularSection from './PopularSection/PopularSection'
import TrendingSection from './TrendingSection/TrendingSection'

import type { FC } from 'react'

/** Home page orchestrator — composes hero + trending/popular/free-to-watch sections. */
const Home: FC = () => {
  return (
    <div data-testid="mf-ready-home">
      {/* Hero Section - Full width, no container */}
      <HeroSection />

      {/* Trending Section - White background */}
      <Container>
        <Section spacing="lg" maxWidth="xl">
          <TrendingSection />
        </Section>
      </Container>

      {/* What's Popular Section - Gray background */}
      <Container>
        <Section spacing="lg" maxWidth="xl">
          <PopularSection />
        </Section>
      </Container>

      {/* Free to Watch Section - White background */}
      <Container>
        <Section spacing="lg" maxWidth="xl">
          <FreeToWatchSection />
        </Section>
      </Container>
    </div>
  )
}

export default Home
