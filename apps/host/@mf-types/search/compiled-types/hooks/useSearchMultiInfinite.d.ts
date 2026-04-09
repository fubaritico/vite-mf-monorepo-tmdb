/**
 * Fetches paginated multi-search results from TMDB.
 *
 * Wraps `searchMultiInfiniteOptions` with `useInfiniteQuery`.
 * Exposes flattened results, total count, and pagination controls.
 *
 * @param query - Search string; fetch is disabled below 2 characters.
 */
export declare const useSearchMultiInfinite: (query: string) => {
    results: {
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
    }[];
    totalResults: number;
    isPending: boolean;
    isError: boolean;
    fetchNextPage: (options?: import("@tanstack/react-query").FetchNextPageOptions) => Promise<import("@tanstack/react-query").InfiniteQueryObserverResult<import("@tanstack/react-query").InfiniteData<{
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
    }, unknown>, Error>>;
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
};
