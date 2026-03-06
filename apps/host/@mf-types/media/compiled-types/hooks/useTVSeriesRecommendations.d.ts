/**
 * Fetch recommended TV series based on a series ID
 */
export declare const useTVSeriesRecommendations: (seriesId: number) => import("@tanstack/react-query").UseQueryResult<{
    page?: number;
    results?: Array<{
        adult?: boolean;
        backdrop_path?: string;
        id?: number;
        name?: string;
        original_language?: string;
        original_name?: string;
        overview?: string;
        poster_path?: string;
        media_type?: string;
        genre_ids?: Array<number>;
        popularity?: number;
        first_air_date?: string;
        vote_average?: number;
        vote_count?: number;
        origin_country?: Array<string>;
    }>;
    total_pages?: number;
    total_results?: number;
}, Error>;
