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

/** Returns true if the result is an actor (person with Acting department) */
export const isActor = (r: SearchResult) =>
  isPerson(r) && getPersonDepartment(r) === 'Acting'

/** Returns true if the result is a director (person with Directing department) */
export const isDirector = (r: SearchResult) =>
  isPerson(r) && getPersonDepartment(r) === 'Directing'

/** Extracts the year from release_date or first_air_date */
export const getResultYear = (r: SearchResult): number | null => {
  const date =
    r.release_date ??
    (r as SearchResult & { first_air_date?: string }).first_air_date
  if (!date) return null
  const year = new Date(date).getFullYear()
  return Number.isNaN(year) ? null : year
}

/** Returns the top N known_for titles for a person result */
export const getPersonKnownFor = (r: SearchResult, count = 2): string[] => {
  const knownFor = (
    r as SearchResult & { known_for?: { title?: string; name?: string }[] }
  ).known_for
  if (!knownFor) return []
  return knownFor
    .slice(0, count)
    .map((item) => item.title ?? item.name ?? '')
    .filter(Boolean)
}

/** Returns the full TMDB profile image URL (w185) for a person result */
export const getProfileImageUrl = (r: SearchResult): string | null => {
  const path = (r as SearchResult & { profile_path?: string }).profile_path
  return path ? `https://image.tmdb.org/t/p/w185${path}` : null
}

/** Returns the full TMDB poster URL (w92) for a movie/TV result */
export const getPosterUrl = (r: SearchResult): string | null => {
  const path = (r as SearchResult & { poster_path?: string }).poster_path
  return path ? `https://image.tmdb.org/t/p/w92${path}` : null
}
