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
/** Returns true if the result is an actor (person with Acting department) */
export declare const isActor: (r: SearchResult) => boolean;
/** Returns true if the result is a director (person with Directing department) */
export declare const isDirector: (r: SearchResult) => boolean;
/** Extracts the year from release_date or first_air_date */
export declare const getResultYear: (r: SearchResult) => number | null;
/** Returns the top N known_for titles for a person result */
export declare const getPersonKnownFor: (r: SearchResult, count?: number) => string[];
/** Returns the full TMDB profile image URL (w185) for a person result */
export declare const getProfileImageUrl: (r: SearchResult) => string | null;
/** Returns the full TMDB poster URL (w92) for a movie/TV result */
export declare const getPosterUrl: (r: SearchResult) => string | null;
