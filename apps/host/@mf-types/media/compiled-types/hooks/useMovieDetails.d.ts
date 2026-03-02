import { UseQueryResult } from '@tanstack/react-query';
import { MovieDetailsResponse, TMDBError } from '@vite-mf-monorepo/tmdb-client';
export declare const useMovieDetails: (movieId: number) => UseQueryResult<MovieDetailsResponse, TMDBError>;
