import { type MovieDetailsResponse, type TMDBError, type TvSeriesDetailsResponse } from '@vite-mf-monorepo/tmdb-client';
import type { UseQueryResult } from '@tanstack/react-query';
export type MediaType = 'movie' | 'tv';
export type MediaQueryResponse = UseQueryResult<MovieDetailsResponse, TMDBError> | UseQueryResult<TvSeriesDetailsResponse, TMDBError>;
export declare function useMediaDetails(mediaType: MediaType, contentId: number): MediaQueryResponse;
