import { QueryClient, useQuery } from '@tanstack/react-query'
import { Link, useLoaderData } from 'react-router-dom'

import { fetchPopularMovies, getImageUrl } from '../services/api'

import type { FC } from 'react'

export type RouteComponent = FC & {
  loader: (queryClient: QueryClient) => () => Promise<MovieListResponse>
}

const query = () => ({
  queryKey: ['getMovies'],
  queryFn: async () => {
    try {
      return await fetchPopularMovies()
    } catch (error) {
      console.error('Error fetching popular movies:', error)
      throw error
    }
  },
})

const loader = (queryClient: QueryClient) => async () => {
  return queryClient.ensureQueryData(query())
}

const List: RouteComponent = () => {
  const initialData = useLoaderData<MovieListResponse>()

  const { data: movies, error } = useQuery<MovieListResponse>({
    ...query(),
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
      {movies.results.map((movie) => (
        <Link
          to={`/detail/${movie.id.toString()}`}
          key={movie.id}
          className="flex flex-col overflow-hidden rounded-lg bg-card shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          data-testid="movie-grid-card"
        >
          test
          <div className="relative aspect-[2/3] overflow-hidden">
            <img
              src={getImageUrl(movie.poster_path)}
              alt={`${movie.title} poster`}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-4 text-center font-medium text-foreground">
            {movie.title}
          </div>
        </Link>
      ))}
    </div>
  )
}

export default List

List.loader = loader
