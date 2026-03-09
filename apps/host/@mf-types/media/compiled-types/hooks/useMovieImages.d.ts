import { UseQueryResult } from '@tanstack/react-query';
import type { MovieImagesResponse, TMDBError } from '@fubar-it-co/tmdb-client';
export declare const useMovieImages: (movieId: number) => UseQueryResult<MovieImagesResponse, TMDBError>;
