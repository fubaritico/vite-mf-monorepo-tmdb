import { Container, Section } from '@vite-mf-monorepo/layouts'

import FreeToWatchSection from './FreeToWatchSection/FreeToWatchSection'
import HeroSection from './HeroSection/HeroSection'
import PopularSection from './PopularSection/PopularSection'
import TrendingSection from './TrendingSection/TrendingSection'

import type { FC } from 'react'

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
