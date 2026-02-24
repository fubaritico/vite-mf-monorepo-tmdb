import {
  Carousel,
  CarouselItem,
  CarouselLoading,
  MovieCard,
  Tabs,
  Typography,
} from '@vite-mf-monorepo/ui'
import { useState } from 'react'

import { useTrending } from '../../hooks/useTrending'

import type { UseQueryResult } from '@tanstack/react-query'
import type {
  TMDBError,
  TrendingAllResponse,
} from '@vite-mf-monorepo/tmdb-client'
import type { FC } from 'react'

type TimeWindow = 'day' | 'week'

const TrendingSection: FC = () => {
  const [timeWindow, setTimeWindow] = useState<TimeWindow>('day')
  const { data, isLoading, error } = useTrending(timeWindow) as UseQueryResult<
    TrendingAllResponse,
    TMDBError
  >

  const handleTabChange = (value: string) => {
    setTimeWindow(value as TimeWindow)
  }

  const renderContent = () => {
    if (isLoading) {
      return <CarouselLoading count={6} />
    }

    if (error || !data) {
      const errorMsg =
        error?.status_message ?? (!data ? 'No data' : 'Failed to load')
      return <Carousel errorMessage={errorMsg} />
    }

    return (
      <Carousel rounded={false}>
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
                  as="link"
                  to={`/movie/${String(item.id)}`}
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
    )
  }

  return (
    <div className="hm:flex hm:flex-col hm:gap-4">
      <Typography variant="h2">Trending</Typography>
      <Tabs value={timeWindow} onValueChange={handleTabChange} variant="pills">
        <Tabs.List>
          <Tabs.Trigger value="day">Today</Tabs.Trigger>
          <Tabs.Trigger value="week">This Week</Tabs.Trigger>
        </Tabs.List>
      </Tabs>
      {renderContent()}
    </div>
  )
}

export default TrendingSection
