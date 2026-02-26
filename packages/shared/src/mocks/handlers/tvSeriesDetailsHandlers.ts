import { HttpResponse, http } from 'msw'

import { mockTVSeriesDetails } from '../data/tvSeriesDetailsData.js'

export const tvSeriesDetailsHandlers = {
  tvSeriesDetails: http.get('https://api.themoviedb.org/3/tv/:id', () => {
    return HttpResponse.json(mockTVSeriesDetails as never)
  }),

  tvSeriesDetailsLoading: http.get(
    'https://api.themoviedb.org/3/tv/:id',
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 10000))
      return HttpResponse.json(mockTVSeriesDetails as never)
    }
  ),

  tvSeriesDetailsError: http.get('https://api.themoviedb.org/3/tv/:id', () => {
    return HttpResponse.json(
      {
        success: false,
        status_code: 34,
        status_message: 'The resource you requested could not be found.',
      },
      { status: 404 }
    )
  }),
}
