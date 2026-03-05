import { HttpResponse, delay, http } from 'msw'

import { mockMovieSimilar } from '../data/movieSimilarData.js'

const BASE_URL = 'https://api.themoviedb.org/3'

export const movieSimilarHandlers = {
  movieSimilar: http.get(`${BASE_URL}/movie/:id/similar`, () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return HttpResponse.json(mockMovieSimilar)
  }),

  movieSimilarLoading: http.get(`${BASE_URL}/movie/:id/similar`, async () => {
    await delay('infinite')
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return HttpResponse.json(mockMovieSimilar)
  }),

  movieSimilarError: http.get(`${BASE_URL}/movie/:id/similar`, () => {
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
