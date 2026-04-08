import { searchMultiOptions } from '@fubar-it-co/tmdb-client'
import { useQuery } from '@tanstack/react-query'

/**
 * Fetches multi-search results from TMDB (movies, TV shows, people).
 *
 * Wraps `searchMultiOptions` with a `useQuery` call gated by query length.
 * Results are cached for 5 minutes and shared across components via
 * the TanStack Query cache (e.g. the Search page loader reuses warm data).
 *
 * @param query - Search string; fetch is disabled below 2 characters.
 */
export const useSearchMulti = (query: string) => {
  return useQuery({
    ...searchMultiOptions({ query: { query } }),
    enabled: query.length >= 2,
    staleTime: 1000 * 60 * 5,
  })
}
