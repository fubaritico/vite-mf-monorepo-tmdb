/**
 * Fetches multi-search results from TMDB (movies, TV shows, people).
 *
 * Wraps `searchMultiOptions` with a `useQuery` call gated by query length.
 * Results are cached for 5 minutes and shared across components via
 * the TanStack Query cache (e.g. the Search page loader reuses warm data).
 *
 * @param query - Search string; fetch is disabled below 2 characters.
 */
export declare const useSearchMulti: (query: string) => import("@tanstack/react-query").UseQueryResult<{
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
        name?: string;
        original_name?: string;
    }>;
    total_pages?: number;
    total_results?: number;
}, Error>;
