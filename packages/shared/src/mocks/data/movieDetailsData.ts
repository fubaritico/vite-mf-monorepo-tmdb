import type { MovieDetailsResponse } from '@vite-mf-monorepo/tmdb-client/client'

export const mockMovieDetails: MovieDetailsResponse = {
  id: 278,
  title: 'The Shawshank Redemption',
  tagline: 'Fear can hold you prisoner. Hope can set you free.',
  overview:
    'Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.',
  backdrop_path: '/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg',
  poster_path: '/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg',
  release_date: '1994-09-23',
  runtime: 142,
  vote_average: 8.707,
  vote_count: 26847,
  budget: 25000000,
  revenue: 28341469,
  status: 'Released',
  adult: false,
  genres: [
    { id: 18, name: 'Drama' },
    { id: 80, name: 'Crime' },
  ],
  homepage: '',
  imdb_id: 'tt0111161',
  original_language: 'en',
  original_title: 'The Shawshank Redemption',
  popularity: 142.503,
  production_companies: [
    {
      id: 97,
      logo_path: '/7znWcbDd4PcJzJUlJxYqAlPPykp.png',
      name: 'Castle Rock Entertainment',
      origin_country: 'US',
    },
  ],
  production_countries: [
    {
      iso_3166_1: 'US',
      name: 'United States of America',
    },
  ],
  spoken_languages: [
    {
      english_name: 'English',
      iso_639_1: 'en',
      name: 'English',
    },
  ],
  video: false,
}
