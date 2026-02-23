import { HttpResponse, http } from 'msw'

import {
  mockFreeToWatchMovies,
  mockFreeToWatchTV,
} from '../data/freeToWatchData.js'

export const freeToWatchHandlers = {
  freeToWatchMovies: http.get(
    'https://api.themoviedb.org/3/discover/movie',
    () => {
      return HttpResponse.json(mockFreeToWatchMovies as never)
    }
  ),
  freeToWatchTV: http.get('https://api.themoviedb.org/3/discover/tv', () => {
    return HttpResponse.json(mockFreeToWatchTV as never)
  }),
  freeToWatchMoviesLoading: http.get(
    'https://api.themoviedb.org/3/discover/movie',
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 10000))
      return HttpResponse.json(mockFreeToWatchMovies as never)
    }
  ),
  freeToWatchMoviesError: http.get(
    'https://api.themoviedb.org/3/discover/movie',
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
  freeToWatchTVLoading: http.get(
    'https://api.themoviedb.org/3/discover/tv',
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 10000))
      return HttpResponse.json(mockFreeToWatchTV as never)
    }
  ),
  freeToWatchTVError: http.get(
    'https://api.themoviedb.org/3/discover/tv',
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
}
