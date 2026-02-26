import type { TvSeriesDetailsResponse } from '@vite-mf-monorepo/tmdb-client/client'

export const mockTVSeriesDetails: TvSeriesDetailsResponse = {
  id: 549,
  name: 'Law & Order',
  tagline: 'Truth matters.',
  overview:
    "In cases ripped from the headlines, police investigate serious and often deadly crimes, weighing the evidence and questioning the suspects until someone is taken into custody. The district attorney's office then builds a case to convict the perpetrator by proving the person guilty beyond a reasonable doubt. Working together, these expert teams navigate all sides of the complex criminal justice system to make New York a safer place.",
  backdrop_path: '/tc7canPSAn2X14hYi6Rl3gZm1o4.jpg',
  poster_path: '/haJ9eHytVO3H3JooMJG1DiWwDNm.jpg',
  first_air_date: '1990-09-13',
  last_air_date: '2026-01-29',
  vote_average: 7.34,
  vote_count: 668,
  status: 'Returning Series',
  number_of_seasons: 25,
  number_of_episodes: 536,
  episode_run_time: [],
  genres: [
    { id: 80, name: 'Crime' },
    { id: 18, name: 'Drama' },
  ],
  homepage: 'http://www.nbc.com/law-order',
  in_production: true,
  languages: ['en'],
  original_language: 'en',
  original_name: 'Law & Order',
  popularity: 328.3067,
  production_companies: [
    {
      id: 25545,
      logo_path: '/8Lqf0okunSPAwBBL08Ua1IRe1xi.png',
      name: 'Wolf Entertainment',
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
  networks: [
    {
      id: 6,
      name: 'NBC',
      logo_path: '/cm111bsDVlYaC1foL0itvEI4yLG.png',
      origin_country: 'US',
    },
  ],
  seasons: [
    {
      air_date: '1990-09-13',
      episode_count: 22,
      id: 1664,
      name: 'Season 1',
      overview: '',
      poster_path: '/hGrkBU5p60zZj9bMByo9cegZfhl.jpg',
      season_number: 1,
    },
  ],
  type: 'Scripted',
  origin_country: ['US'],
}
