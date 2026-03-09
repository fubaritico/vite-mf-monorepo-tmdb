import { TMDBError, TvSeriesDetailsResponse } from '@fubar-it-co/tmdb-client';
import { UseQueryResult } from '@tanstack/react-query';
export declare const useTVDetails: (seriesId: number) => UseQueryResult<TvSeriesDetailsResponse, TMDBError>;
