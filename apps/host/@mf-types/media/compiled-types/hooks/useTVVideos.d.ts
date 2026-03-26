import { UseQueryResult } from '@tanstack/react-query';
import type { TMDBError, TvSeriesVideosResponse } from '@fubar-it-co/tmdb-client';
/**
 * Fetch TV series videos (trailers, clips, teasers) by series ID
 * Filters for official YouTube trailers and limits to top 3
 */
export declare const useTVVideos: (seriesId: number) => UseQueryResult<TvSeriesVideosResponse, TMDBError>;
