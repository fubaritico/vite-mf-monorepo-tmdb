import { Tabs, Typography } from '@vite-mf-monorepo/ui'
import { useState } from 'react'

import PopularMoviesCarousel from './PopularMoviesCarousel'
import PopularTVCarousel from './PopularTVCarousel'

import type { FC } from 'react'

type MediaType = 'movie' | 'tv'

const PopularSection: FC = () => {
  const [mediaType, setMediaType] = useState<MediaType>('movie')

  const handleTabChange = (value: string) => {
    setMediaType(value as MediaType)
  }

  return (
    <div className="hm:flex hm:flex-col hm:gap-4">
      <Typography variant="h2">What's Popular</Typography>
      <Tabs value={mediaType} onValueChange={handleTabChange} variant="pills">
        <Tabs.List>
          <Tabs.Trigger value="movie">Movies</Tabs.Trigger>
          <Tabs.Trigger value="tv">TV Shows</Tabs.Trigger>
        </Tabs.List>
      </Tabs>

      {mediaType === 'movie' ? (
        <PopularMoviesCarousel />
      ) : (
        <PopularTVCarousel />
      )}
    </div>
  )
}

export default PopularSection
