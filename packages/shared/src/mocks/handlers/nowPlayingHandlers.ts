import { HttpResponse, http } from 'msw'

import { mockNowPlayingMovies } from '../data/nowPlayingData.js'

export const nowPlayingHandlers = {
  nowPlayingMovies: http.get(
    'https://api.themoviedb.org/3/movie/now_playing',
    () => {
      return HttpResponse.json(mockNowPlayingMovies as never)
    }
  ),
  nowPlayingMoviesLoading: http.get(
    'https://api.themoviedb.org/3/movie/now_playing',
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 10000))
      return HttpResponse.json(mockNowPlayingMovies as never)
    }
  ),
  nowPlayingMoviesError: http.get(
    'https://api.themoviedb.org/3/movie/now_playing',
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
