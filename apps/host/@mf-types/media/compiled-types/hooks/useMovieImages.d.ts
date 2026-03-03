import { UseQueryResult } from '@tanstack/react-query';
import type { MovieImagesResponse, TMDBError } from '@vite-mf-monorepo/tmdb-client';
export declare const useMovieImages: (movieId: number) => UseQueryResult<MovieImagesResponse, TMDBError>;
