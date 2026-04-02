import { UseQueryResult } from '@tanstack/react-query';
import type { TMDBError, TvSeriesCreditsResponse } from '@fubar-it-co/tmdb-client';
/**
 * Fetch TV series cast and crew by series ID
 */
export declare const useTVCredits: (seriesId: number) => UseQueryResult<TvSeriesCreditsResponse, TMDBError>;
