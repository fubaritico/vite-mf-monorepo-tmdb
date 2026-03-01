import { HttpResponse, delay, http } from 'msw'

import { mockMovieImages } from '../data/movieImagesData.js'

const BASE_URL = 'https://api.themoviedb.org/3'

export const movieImagesHandlers = {
  movieImages: http.get(`${BASE_URL}/movie/:id/images`, () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return HttpResponse.json(mockMovieImages)
  }),

  movieImagesLoading: http.get(`${BASE_URL}/movie/:id/images`, async () => {
    await delay('infinite')
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return HttpResponse.json(mockMovieImages)
  }),

  movieImagesError: http.get(`${BASE_URL}/movie/:id/images`, () => {
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
