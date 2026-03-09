import type { MovieVideosResponse } from '@fubar-it-co/tmdb-client/client'

/**
 * Mock video data for The Shawshank Redemption (ID 278)
 * Contains real YouTube trailer IDs for official trailers
 */
export const mockMovieVideos: MovieVideosResponse = {
  id: 278,
  results: [
    {
      iso_639_1: 'en',
      iso_3166_1: 'US',
      name: 'The Shawshank Redemption - Official Trailer',
      key: '6GoesqWQngo',
      site: 'YouTube',
      size: 1080,
      type: 'Trailer',
      official: true,
      published_at: '2014-10-01T00:00:00.000Z',
      id: '5e84a9a0c3a36847f8001234',
    },
    {
      iso_639_1: 'en',
      iso_3166_1: 'US',
      name: 'The Shawshank Redemption - Clip',
      key: '9hDz4q_w8cI',
      site: 'YouTube',
      size: 720,
      type: 'Clip',
      official: true,
      published_at: '2015-06-15T00:00:00.000Z',
      id: '5e84a9a0c3a36847f8001235',
    },
    {
      iso_639_1: 'en',
      iso_3166_1: 'US',
      name: 'The Shawshank Redemption - Behind the Scenes',
      key: 'pJHpvdX9nnE',
      site: 'YouTube',
      size: 720,
      type: 'Featurette',
      official: true,
      published_at: '2016-02-20T00:00:00.000Z',
      id: '5e84a9a0c3a36847f8001236',
    },
  ],
}
