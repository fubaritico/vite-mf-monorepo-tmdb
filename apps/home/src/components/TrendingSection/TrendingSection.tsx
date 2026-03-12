import { getOptimizedImageUrl } from '@vite-mf-monorepo/shared'
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

import type { TMDBError, TrendingAllResponse } from '@fubar-it-co/tmdb-client'
import type { UseQueryResult } from '@tanstack/react-query'
import type { FC } from 'react'

type TimeWindow = 'day' | 'week'

const TrendingSection: FC = () => {
  const [timeWindow, setTimeWindow] = useState<TimeWindow>('day')
  const { data, isLoading, error } = useTrending(timeWindow) as UseQueryResult<
    TrendingAllResponse,
    TMDBError
  >

  const handleTabChange = (value: string) => {
    console.warn(
      value,
      'texte en plus du plus en plus, et puis dmieux en mieux'
    )
    setTimeWindow(value as TimeWindow)
  }

  const renderContent = () => {
    if (isLoading) {
      return <CarouselLoading count={6} />
    }

    if (error || !data) {
      const errorMsg =
        error?.status_message ?? (data ? 'Failed to load' : 'No data')
      return <Carousel errorMessage={errorMsg} />
    }

    return (
      <Carousel rounded={false}>
        {data.results?.map((item) => {
          const posterUrl = item.poster_path
            ? getOptimizedImageUrl(item.poster_path, 'w92', 60)
            : ''
          const year = item.release_date
            ? new Date(item.release_date).getFullYear()
            : null

          // Use media_type to determine correct route
          const mediaType = item.media_type === 'tv' ? 'tv' : 'movie'
          const linkTo = `/${mediaType}/${String(item.id)}`

          return (
            <CarouselItem key={item.id}>
              <div style={{ width: 150 }}>
                <MovieCard
                  as="link"
                  to={linkTo}
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
      <Tabs
        value={timeWindow}
        onValueChange={handleTabChange}
        variant="pills"
        prefix="trending"
      >
        <Tabs.List>
          <Tabs.Trigger value="day">Today</Tabs.Trigger>
          <Tabs.Trigger value="week">This Week</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Panel value="day">{renderContent()}</Tabs.Panel>
        <Tabs.Panel value="week">{renderContent()}</Tabs.Panel>
      </Tabs>
    </div>
  )
}

export default TrendingSection
