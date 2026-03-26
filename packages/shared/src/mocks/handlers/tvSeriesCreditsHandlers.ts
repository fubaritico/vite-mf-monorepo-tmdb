import { HttpResponse, delay, http } from 'msw'

import { mockTVSeriesCredits } from '../data/tvSeriesCreditsData.js'

const BASE_URL = 'https://api.themoviedb.org/3'

export const tvSeriesCreditsHandlers = {
  tvSeriesCredits: http.get(`${BASE_URL}/tv/:id/credits`, () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return HttpResponse.json(mockTVSeriesCredits)
  }),

  tvSeriesCreditsLoading: http.get(`${BASE_URL}/tv/:id/credits`, async () => {
    await delay('infinite')
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return HttpResponse.json(mockTVSeriesCredits)
  }),

  tvSeriesCreditsError: http.get(`${BASE_URL}/tv/:id/credits`, () => {
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
