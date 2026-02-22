import {
  Carousel,
  CarouselItem,
  MovieCard,
  Skeleton,
  Tabs,
} from '@vite-mf-monorepo/ui'
import { useState } from 'react'

import { useTrending } from '../../hooks/useTrending'

import type { FC } from 'react'

type TimeWindow = 'day' | 'week'

const TrendingSection: FC = () => {
  const [timeWindow, setTimeWindow] = useState<TimeWindow>('day')
  const { data, isLoading } = useTrending(timeWindow)

  const handleTabChange = (value: string) => {
    setTimeWindow(value as TimeWindow)
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-3xl font-bold">Trending</h2>
      <Tabs value={timeWindow} onValueChange={handleTabChange} variant="pills">
        <Tabs.List>
          <Tabs.Trigger value="day">Today</Tabs.Trigger>
          <Tabs.Trigger value="week">This Week</Tabs.Trigger>
        </Tabs.List>
      </Tabs>

      {isLoading && (
        <div className="flex gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton
              key={i}
              variant="rectangle"
              width="w-[200px]"
              aspectRatio="2/3"
            />
          ))}
        </div>
      )}

      {data && (
        <Carousel>
          {data.results?.map((item) => {
            const posterUrl = item.poster_path
              ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
              : ''
            const year = item.release_date
              ? new Date(item.release_date).getFullYear()
              : null

            return (
              <CarouselItem key={item.id}>
                <div style={{ width: 150 }}>
                  <MovieCard
                    id={item.id ?? 0}
                    title={item.title ?? 'Unknown'}
                    posterUrl={posterUrl}
                    voteAverage={item.vote_average ?? 0}
                    year={year}
                  />
                </div>
              </CarouselItem>
            )
          })}
        </Carousel>
      )}
    </div>
  )
}

export default TrendingSection
