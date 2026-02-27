import { HttpResponse, delay, http } from 'msw'

import { mockMovieCredits } from '../data/movieCreditsData.js'

const BASE_URL = 'https://api.themoviedb.org/3'

export const movieCreditsHandlers = {
  movieCredits: http.get(`${BASE_URL}/movie/:id/credits`, () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return HttpResponse.json(mockMovieCredits)
  }),

  movieCreditsLoading: http.get(`${BASE_URL}/movie/:id/credits`, async () => {
    await delay('infinite')
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return HttpResponse.json(mockMovieCredits)
  }),

  movieCreditsError: http.get(`${BASE_URL}/movie/:id/credits`, () => {
    return HttpResponse.json(
      {
        success: false,
        status_code: 500,
        status_message: 'Internal Server Error',
      },
      { status: 500 }
    )
  }),
}
