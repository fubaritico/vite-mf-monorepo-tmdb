import { QueryClient, useQuery } from '@tanstack/react-query'
import { moviePopularListOptions } from '@vite-mf-monorepo/tmdb-client'
import { Link, useLoaderData } from 'react-router-dom'

import type { MoviePopularListResponse } from '@vite-mf-monorepo/tmdb-client'
import type { FC } from 'react'

import '../remote.css'

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'

/**
 * Constructs the full image URL for TMDB images.
 */
const getImageUrl = (path: string | null, size = 'w500'): string => {
  if (!path) return ''
  return `${IMAGE_BASE_URL}/${size}${path}`
}

export type RouteComponent = FC & {
  loader: (queryClient: QueryClient) => () => Promise<MoviePopularListResponse>
}

const loader = (queryClient: QueryClient) => async () => {
  return queryClient.ensureQueryData(moviePopularListOptions())
}

const Home: RouteComponent = () => {
  const initialData = useLoaderData<MoviePopularListResponse>()

  const { data: movies, error } = useQuery({
    ...moviePopularListOptions(),
    initialData,
  })

  if (error) {
    return (
      <div className="p-8 text-center text-xl text-destructive">
        {error.message}
      </div>
    )
  }

  return (
    <div
      data-testid="movie-grid-list"
      className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-8"
    >
      {movies.results?.map((movie) => (
        <Link
          to={`/movie/${String(movie.id)}`}
          key={movie.id}
          className="flex flex-col overflow-hidden rounded-lg bg-card shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          data-testid="movie-grid-card"
        >
          <div className="relative aspect-[2/3] overflow-hidden">
            <img
              src={getImageUrl(movie.poster_path ?? null)}
              alt={`${movie.title ?? 'Movie'} poster`}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="text-foreground p-4 text-center font-medium">
            {movie.title}
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Home

Home.loader = loader
