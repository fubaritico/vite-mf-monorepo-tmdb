import { type MovieImagesResponse, type TMDBError, type TvSeriesImagesResponse } from '@fubar-it-co/tmdb-client';
import type { MediaType } from './useMediaDetails';
import type { UseQueryResult } from '@tanstack/react-query';
export type MediaImagesResponse = UseQueryResult<MovieImagesResponse, TMDBError> | UseQueryResult<TvSeriesImagesResponse, TMDBError>;
export declare function useMediaImages(mediaType: MediaType, contentId: number): MediaImagesResponse;
