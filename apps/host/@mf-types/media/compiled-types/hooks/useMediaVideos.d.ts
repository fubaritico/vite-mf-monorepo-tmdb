import { type MovieVideosResponse, type TMDBError, type TvSeriesVideosResponse } from '@fubar-it-co/tmdb-client';
import type { MediaType } from './useMediaDetails';
import type { UseQueryResult } from '@tanstack/react-query';
export type MediaVideosResponse = UseQueryResult<MovieVideosResponse, TMDBError> | UseQueryResult<TvSeriesVideosResponse, TMDBError>;
export declare function useMediaVideos(mediaType: MediaType, contentId: number): MediaVideosResponse;
