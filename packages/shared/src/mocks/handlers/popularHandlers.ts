import { HttpResponse, http } from 'msw'

import { mockPopularMovies, mockPopularTV } from '../data/popularData.js'

export const popularHandlers = {
  popularMovies: http.get('https://api.themoviedb.org/3/movie/popular', () => {
    return HttpResponse.json(mockPopularMovies as never)
  }),
  popularTV: http.get('https://api.themoviedb.org/3/tv/popular', () => {
    return HttpResponse.json(mockPopularTV as never)
  }),
  popularMoviesLoading: http.get(
    'https://api.themoviedb.org/3/movie/popular',
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 10000))
      return HttpResponse.json(mockPopularMovies as never)
    }
  ),
  popularTVLoading: http.get(
    'https://api.themoviedb.org/3/tv/popular',
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 10000))
      return HttpResponse.json(mockPopularTV as never)
    }
  ),
  popularMoviesError: http.get(
    'https://api.themoviedb.org/3/movie/popular',
    () => {
      return HttpResponse.json(
        {
          success: false,
          status_code: 7,
          status_message: 'Invalid API key: You must be granted a valid key.',
        },
        { status: 401 }
      )
    }
  ),
  popularTVError: http.get('https://api.themoviedb.org/3/tv/popular', () => {
    return HttpResponse.json(
      {
        success: false,
        status_code: 7,
        status_message: 'Invalid API key: You must be granted a valid key.',
      },
      { status: 401 }
    )
  }),
}
