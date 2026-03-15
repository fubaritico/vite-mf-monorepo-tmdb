/**
 * Fetch recommended movies based on a movie ID
 */
export declare const useMovieRecommendations: (movieId: number) => import("@tanstack/react-query").UseQueryResult<{
    [key: string]: unknown;
}, Error>;
