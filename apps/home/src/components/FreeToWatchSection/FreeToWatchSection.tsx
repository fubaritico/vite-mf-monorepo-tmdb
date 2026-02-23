import { Tabs } from '@vite-mf-monorepo/ui'
import { useState } from 'react'

import FreeToWatchMoviesCarousel from './FreeToWatchMoviesCarousel'
import FreeToWatchTVCarousel from './FreeToWatchTVCarousel'

import type { FC } from 'react'

type MediaType = 'movie' | 'tv'

const FreeToWatchSection: FC = () => {
  const [mediaType, setMediaType] = useState<MediaType>('movie')

  const handleTabChange = (value: string) => {
    setMediaType(value as MediaType)
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-3xl font-bold">Free To Watch</h2>
      <Tabs value={mediaType} onValueChange={handleTabChange} variant="pills">
        <Tabs.List>
          <Tabs.Trigger value="movie">Movies</Tabs.Trigger>
          <Tabs.Trigger value="tv">TV Shows</Tabs.Trigger>
        </Tabs.List>
      </Tabs>

      {mediaType === 'movie' ? (
        <FreeToWatchMoviesCarousel />
      ) : (
        <FreeToWatchTVCarousel />
      )}
    </div>
  )
}

export default FreeToWatchSection
