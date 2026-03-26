import { type MovieCreditsResponse, type TMDBError, type TvSeriesCreditsResponse } from '@fubar-it-co/tmdb-client';
import type { MediaType } from './useMediaDetails';
import type { UseQueryResult } from '@tanstack/react-query';
export type MediaCreditsResponse = UseQueryResult<MovieCreditsResponse, TMDBError> | UseQueryResult<TvSeriesCreditsResponse, TMDBError>;
export declare function useMediaCredits(mediaType: MediaType, contentId: number): MediaCreditsResponse;
