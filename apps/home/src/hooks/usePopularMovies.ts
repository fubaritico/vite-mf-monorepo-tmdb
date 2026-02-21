import { useQuery } from '@tanstack/react-query'
import { moviePopularListOptions } from '@vite-mf-monorepo/tmdb-client'

import type { UseQueryResult } from '@tanstack/react-query'
import type { MoviePopularListResponse } from '@vite-mf-monorepo/tmdb-client'

export const usePopularMovies =
  (): UseQueryResult<MoviePopularListResponse> => {
    return useQuery({
      ...moviePopularListOptions(),
      staleTime: 1000 * 60 * 10,
    })
  }
