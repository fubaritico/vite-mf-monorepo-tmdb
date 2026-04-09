import { searchMultiInfiniteOptions } from '@fubar-it-co/tmdb-client'
import { useInfiniteQuery } from '@tanstack/react-query'

import type { SearchMultiResponse } from '@fubar-it-co/tmdb-client'

/**
 * Fetches paginated multi-search results from TMDB.
 *
 * Wraps `searchMultiInfiniteOptions` with `useInfiniteQuery`.
 * Exposes flattened results, total count, and pagination controls.
 *
 * @param query - Search string; fetch is disabled below 2 characters.
 */
export const useSearchMultiInfinite = (query: string) => {
  const infiniteQuery = useInfiniteQuery({
    ...searchMultiInfiniteOptions({ query: { query } }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: SearchMultiResponse) => {
      const page = lastPage.page ?? 1
      const totalPages = lastPage.total_pages ?? 1
      return page < totalPages ? page + 1 : undefined
    },
    enabled: query.length >= 2,
    staleTime: 1000 * 60 * 5,
  })

  const data = infiniteQuery.data as
    | { pages: SearchMultiResponse[]; pageParams: unknown[] }
    | undefined
  const pages = data?.pages ?? []
  const allResults = pages.flatMap((p) => p.results ?? [])
  const totalResults = pages[0]?.total_results ?? 0

  return {
    results: allResults,
    totalResults,
    isPending: infiniteQuery.isPending as boolean,
    isError: infiniteQuery.isError,
    fetchNextPage: infiniteQuery.fetchNextPage,
    hasNextPage: infiniteQuery.hasNextPage,
    isFetchingNextPage: infiniteQuery.isFetchingNextPage,
  }
}
