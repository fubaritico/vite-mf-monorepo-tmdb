import { Outlet } from 'react-router-dom'

import { Cast } from './Cast'
import { MediaHero } from './MediaHero'
import { Photos } from './Photos'
import { RecommendedSection } from './RecommendedSection'
import { SimilarSection } from './SimilarSection'
import { Synopsis } from './Synopsis'
import { TrailersSection } from './TrailersSection'

import type { FC } from 'react'

import '../remote.css'

const Media: FC = () => {
  return (
    <div data-testid="mf-ready-media">
      {/* Hero Section - Full width, no container */}
      <MediaHero />

      {/* Synopsis Section - White background */}
      <Synopsis />

      {/* Photos Section */}
      <Photos />

      {/* Cast Section */}
      <Cast />

      {/* Outlet for nested routes (e.g. PhotoViewer modal) */}
      <Outlet />

      {/* Trailers & Clips Section */}
      <TrailersSection />

      {/* Similar Section with Movie/TV Tabs */}
      <SimilarSection />

      {/* Recommendations Section */}
      <RecommendedSection />
    </div>
  )
}

export default Media
