import { HttpResponse, delay, http } from 'msw'

import { mockTVSeriesRecommendations } from '../data/tvSeriesRecommendationsData.js'

const BASE_URL = 'https://api.themoviedb.org/3'

export const tvSeriesRecommendationsHandlers = {
  tvSeriesRecommendations: http.get(
    `${BASE_URL}/tv/:id/recommendations`,
    () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return HttpResponse.json(mockTVSeriesRecommendations)
    }
  ),

  tvSeriesRecommendationsLoading: http.get(
    `${BASE_URL}/tv/:id/recommendations`,
    async () => {
      await delay('infinite')
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return HttpResponse.json(mockTVSeriesRecommendations)
    }
  ),

  tvSeriesRecommendationsError: http.get(
    `${BASE_URL}/tv/:id/recommendations`,
    () => {
      return HttpResponse.json(
        {
          success: false,
          status_code: 500,
          status_message: 'Internal Server Error',
        },
        { status: 500 }
      )
    }
  ),
}
