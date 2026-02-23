import { HttpResponse, http } from 'msw'

import { mockTrendingDay, mockTrendingWeek } from '../data/trendingData.js'

export const trendingHandlers = {
  trendingDay: http.get('https://api.themoviedb.org/3/trending/all/day', () => {
    return HttpResponse.json(mockTrendingDay as never)
  }),
  trendingWeek: http.get(
    'https://api.themoviedb.org/3/trending/all/week',
    () => {
      return HttpResponse.json(mockTrendingWeek as never)
    }
  ),
  trendingDayLoading: http.get(
    'https://api.themoviedb.org/3/trending/all/day',
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 10000))
      return HttpResponse.json(mockTrendingDay as never)
    }
  ),
  trendingDayError: http.get(
    'https://api.themoviedb.org/3/trending/all/day',
    () => {
      return HttpResponse.json(
        {
          success: false,
          status_code: 7,
          status_message: 'Invalid API key: You must be granted a valid key.',
        },
        { status: 401 }
      )
    }
  ),
  trendingWeekError: http.get(
    'https://api.themoviedb.org/3/trending/all/week',
    () => {
      return HttpResponse.json(
        {
          success: false,
          status_code: 7,
          status_message: 'Invalid API key: You must be granted a valid key.',
        },
        { status: 401 }
      )
    }
  ),
}
