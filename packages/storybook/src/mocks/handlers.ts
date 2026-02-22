import { HttpResponse, http } from 'msw'

import { mockTrendingDay, mockTrendingWeek } from './data/trendingData'

export const trendingHandlers = {
  trendingDay: http.get('https://api.themoviedb.org/3/trending/all/day', () => {
    return HttpResponse.json(mockTrendingDay)
  }),
  trendingWeek: http.get(
    'https://api.themoviedb.org/3/trending/all/week',
    () => {
      return HttpResponse.json(mockTrendingWeek)
    }
  ),
  trendingDayLoading: http.get(
    'https://api.themoviedb.org/3/trending/all/day',
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 10000))
      return HttpResponse.json(mockTrendingDay)
    }
  ),
  trendingDayError: http.get(
    'https://api.themoviedb.org/3/trending/all/day',
    () => {
      return HttpResponse.json(
        { error: 'Failed to fetch trending data' },
        { status: 500 }
      )
    }
  ),
  trendingWeekError: http.get(
    'https://api.themoviedb.org/3/trending/all/week',
    () => {
      return HttpResponse.json(
        { error: 'Failed to fetch trending data' },
        { status: 500 }
      )
    }
  ),
}

export const handlers = [
  trendingHandlers.trendingDay,
  trendingHandlers.trendingWeek,
]
