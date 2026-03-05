import { UseQueryResult } from '@tanstack/react-query';
import type { MovieVideosResponse, TMDBError } from '@vite-mf-monorepo/tmdb-client';
/**
 * Fetch movie videos (trailers, clips, teasers) by movie ID
 * Filters for official YouTube trailers and limits to top 3
 */
export declare const useMovieVideos: (movieId: number) => UseQueryResult<MovieVideosResponse, TMDBError>;
