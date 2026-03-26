import { HttpResponse, delay, http } from 'msw'

import { mockTVSeriesVideos } from '../data/tvSeriesVideosData.js'

const BASE_URL = 'https://api.themoviedb.org/3'

export const tvSeriesVideosHandlers = {
  tvSeriesVideos: http.get(`${BASE_URL}/tv/:id/videos`, () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return HttpResponse.json(mockTVSeriesVideos)
  }),

  tvSeriesVideosLoading: http.get(`${BASE_URL}/tv/:id/videos`, async () => {
    await delay('infinite')
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return HttpResponse.json(mockTVSeriesVideos)
  }),

  tvSeriesVideosError: http.get(`${BASE_URL}/tv/:id/videos`, () => {
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
