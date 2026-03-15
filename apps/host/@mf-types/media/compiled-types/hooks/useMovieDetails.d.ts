import { MovieDetailsResponse, TMDBError } from '@fubar-it-co/tmdb-client';
import { UseQueryResult } from '@tanstack/react-query';
export declare const useMovieDetails: (movieId: number) => UseQueryResult<MovieDetailsResponse, TMDBError>;
