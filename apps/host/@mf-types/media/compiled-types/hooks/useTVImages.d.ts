import { UseQueryResult } from '@tanstack/react-query';
import type { TMDBError, TvSeriesImagesResponse } from '@fubar-it-co/tmdb-client';
/**
 * Fetch TV series images by series ID
 */
export declare const useTVImages: (seriesId: number) => UseQueryResult<TvSeriesImagesResponse, TMDBError>;
