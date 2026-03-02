import { UseQueryResult } from '@tanstack/react-query';
import type { MovieCreditsResponse, TMDBError } from '@vite-mf-monorepo/tmdb-client';
/**
 * Fetch movie cast and crew by movie ID
 */
export declare const useMovieCredits: (movieId: number) => UseQueryResult<MovieCreditsResponse, TMDBError>;
