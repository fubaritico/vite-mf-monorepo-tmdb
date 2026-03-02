import { UseQueryResult } from '@tanstack/react-query';
import { TMDBError, TvSeriesDetailsResponse } from '@vite-mf-monorepo/tmdb-client';
export declare const useTVDetails: (seriesId: number) => UseQueryResult<TvSeriesDetailsResponse, TMDBError>;
