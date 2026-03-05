import { HttpResponse, delay, http } from 'msw'

import { mockMovieVideos } from '../data/movieVideosData.js'

const BASE_URL = 'https://api.themoviedb.org/3'

export const movieVideosHandlers = {
  movieVideos: http.get(`${BASE_URL}/movie/:id/videos`, () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return HttpResponse.json(mockMovieVideos)
  }),

  movieVideosLoading: http.get(`${BASE_URL}/movie/:id/videos`, async () => {
    await delay('infinite')
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return HttpResponse.json(mockMovieVideos)
  }),

  movieVideosError: http.get(`${BASE_URL}/movie/:id/videos`, () => {
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
