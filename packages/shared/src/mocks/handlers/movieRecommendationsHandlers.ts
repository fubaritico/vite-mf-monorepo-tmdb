import { HttpResponse, delay, http } from 'msw'

import { mockMovieRecommendations } from '../data/movieRecommendationsData.js'

const BASE_URL = 'https://api.themoviedb.org/3'

export const movieRecommendationsHandlers = {
  movieRecommendations: http.get(
    `${BASE_URL}/movie/:id/recommendations`,
    () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return HttpResponse.json(mockMovieRecommendations)
    }
  ),

  movieRecommendationsLoading: http.get(
    `${BASE_URL}/movie/:id/recommendations`,
    async () => {
      await delay('infinite')
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return HttpResponse.json(mockMovieRecommendations)
    }
  ),

  movieRecommendationsError: http.get(
    `${BASE_URL}/movie/:id/recommendations`,
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
