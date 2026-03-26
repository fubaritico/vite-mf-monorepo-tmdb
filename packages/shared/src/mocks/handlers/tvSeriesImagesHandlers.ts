import { HttpResponse, delay, http } from 'msw'

import { mockTVSeriesImages } from '../data/tvSeriesImagesData.js'

const BASE_URL = 'https://api.themoviedb.org/3'

export const tvSeriesImagesHandlers = {
  tvSeriesImages: http.get(`${BASE_URL}/tv/:id/images`, () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return HttpResponse.json(mockTVSeriesImages)
  }),

  tvSeriesImagesLoading: http.get(`${BASE_URL}/tv/:id/images`, async () => {
    await delay('infinite')
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return HttpResponse.json(mockTVSeriesImages)
  }),

  tvSeriesImagesError: http.get(`${BASE_URL}/tv/:id/images`, () => {
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
