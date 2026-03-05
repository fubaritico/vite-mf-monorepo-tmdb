import { HttpResponse, delay, http } from 'msw'

import { mockTVSeriesSimilar } from '../data/tvSeriesSimilarData.js'

const BASE_URL = 'https://api.themoviedb.org/3'

export const tvSeriesSimilarHandlers = {
  tvSeriesSimilar: http.get(`${BASE_URL}/tv/:id/similar`, () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return HttpResponse.json(mockTVSeriesSimilar)
  }),

  tvSeriesSimilarLoading: http.get(`${BASE_URL}/tv/:id/similar`, async () => {
    await delay('infinite')
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return HttpResponse.json(mockTVSeriesSimilar)
  }),

  tvSeriesSimilarError: http.get(`${BASE_URL}/tv/:id/similar`, () => {
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
