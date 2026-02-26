import { HttpResponse, http } from 'msw'

import { mockMovieDetails } from '../data/movieDetailsData.js'

export const movieDetailsHandlers = {
  movieDetails: http.get('https://api.themoviedb.org/3/movie/:id', () => {
    return HttpResponse.json(mockMovieDetails as never)
  }),

  movieDetailsLoading: http.get(
    'https://api.themoviedb.org/3/movie/:id',
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 10000))
      return HttpResponse.json(mockMovieDetails as never)
    }
  ),

  movieDetailsError: http.get('https://api.themoviedb.org/3/movie/:id', () => {
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
