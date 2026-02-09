import { QueryClient, useQuery } from '@tanstack/react-query'
import { useLoaderData, useParams } from 'react-router-dom'

import { fetchMovieDetail, getImageUrl } from '../services/api'

import type { FC } from 'react'
import type { Params } from 'react-router-dom'

import '../remote.css'

type ThisComponent = FC & {
  loader: (
    queryClient: QueryClient
  ) => ({ params }: { params: Params<'id'> }) => Promise<Movie>
}

const query = (id?: string) => ({
  queryKey: ['movieDetail', id],
  queryFn: async () => fetchMovieDetail(id),
})

const loader =
  (queryClient: QueryClient) =>
  ({ params }: { params: Params<'id'> }) => {
    return queryClient.ensureQueryData(query(params.id))
  }

const Detail: ThisComponent = () => {
  const initialData = useLoaderData<Movie>()
  const { id } = useParams<{ id: string }>()

  const { data: movie, error } = useQuery<Movie>({
    ...query(id),
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
    <div className="flex flex-col gap-8 md:flex-row">
      <div className="flex-shrink-0 md:w-[300px]">
        <img
          src={getImageUrl(movie.poster_path)}
          alt={`${movie.title} poster`}
          className="w-full rounded-lg shadow-lg"
        />
      </div>
      <div className="flex-1">
        <h2 className="mb-2 text-4xl text-foreground">{movie.title}</h2>
        {movie.tagline && (
          <p className="mb-4 italic text-muted-foreground">{movie.tagline}</p>
        )}
        <div className="mb-4 flex gap-4 text-muted-foreground">
          <span>{new Date(movie.release_date).getFullYear()}</span>
          {movie.runtime && <span>{movie.runtime} min</span>}
          <span>{movie.vote_average.toFixed(1)} / 10</span>
        </div>
        <div className="mb-6 flex flex-wrap gap-2">
          {movie.genres?.map((genre) => (
            <span
              key={genre.id}
              className="rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground"
            >
              {genre.name}
            </span>
          ))}
        </div>
        <div className="mb-6">
          <h3 className="mb-2 text-xl font-medium text-foreground">Overview</h3>
          <p className="leading-relaxed text-muted-foreground">
            {movie.overview}
          </p>
        </div>
        {(movie.budget ?? movie.revenue) && (
          <div className="mt-4 flex flex-col gap-2">
            {movie.budget && movie.budget > 0 && (
              <div className="flex gap-2">
                <span className="font-medium text-foreground">Budget:</span>
                <span className="text-muted-foreground">
                  ${movie.budget.toLocaleString()}
                </span>
              </div>
            )}
            {movie.revenue && movie.revenue > 0 && (
              <div className="flex gap-2">
                <span className="font-medium text-foreground">Revenue:</span>
                <span className="text-muted-foreground">
                  ${movie.revenue.toLocaleString()}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Detail

Detail.loader = loader
