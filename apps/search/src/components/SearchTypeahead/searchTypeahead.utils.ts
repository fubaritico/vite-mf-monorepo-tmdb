import type { SearchMultiResponse } from '@fubar-it-co/tmdb-client'

/** Single item from the TMDB searchMulti response */
export type SearchResult = NonNullable<SearchMultiResponse['results']>[number]

export const isMovie = (r: SearchResult) => r.media_type === 'movie'
export const isTv = (r: SearchResult) => r.media_type === 'tv'
export const isPerson = (r: SearchResult) => r.media_type === 'person'

/** Returns the best available display name for a search result */
export const getResultLabel = (r: SearchResult) => {
  const candidates = [r.title, r.name, r.original_title, r.original_name]
  return candidates.find((v) => v != null && v !== '') ?? 'Unknown'
}

/** Returns the known_for_department for person results (e.g. "Acting", "Directing") */
export const getPersonDepartment = (r: SearchResult) =>
  (r as SearchResult & { known_for_department?: string })
    .known_for_department ?? null

/** Returns the internal route for a movie or TV result, null for persons */
export const getResultRoute = (r: SearchResult) => {
  if (isMovie(r)) return `/movie/${String(r.id)}`
  if (isTv(r)) return `/tv/${String(r.id)}`
  return null
}
