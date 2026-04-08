import type { SearchMultiResponse } from '@fubar-it-co/tmdb-client';
/** Single item from the TMDB searchMulti response */
export type SearchResult = NonNullable<SearchMultiResponse['results']>[number];
export declare const isMovie: (r: SearchResult) => boolean;
export declare const isTv: (r: SearchResult) => boolean;
export declare const isPerson: (r: SearchResult) => boolean;
/** Returns the best available display name for a search result */
export declare const getResultLabel: (r: SearchResult) => string;
/** Returns the known_for_department for person results (e.g. "Acting", "Directing") */
export declare const getPersonDepartment: (r: SearchResult) => string | null;
/** Returns the internal route for a movie or TV result, null for persons */
export declare const getResultRoute: (r: SearchResult) => string | null;
