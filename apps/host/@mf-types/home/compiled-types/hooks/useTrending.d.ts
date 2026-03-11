export declare const useTrending: (timeWindow?: "day" | "week") => import("@tanstack/react-query").UseQueryResult<{
    page?: number;
    results?: Array<{
        adult?: boolean;
        backdrop_path?: string;
        id?: number;
        title?: string;
        original_language?: string;
        original_title?: string;
        overview?: string;
        poster_path?: string;
        media_type?: string;
        genre_ids?: Array<number>;
        popularity?: number;
        release_date?: string;
        video?: boolean;
        vote_average?: number;
        vote_count?: number;
    }>;
    total_pages?: number;
    total_results?: number;
}, Error>;
