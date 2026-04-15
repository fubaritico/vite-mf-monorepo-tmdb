import type { SearchResult } from './searchTypeahead.utils';
import type { FC } from 'react';
/** Props for the shared grouped results rendered inside Typeahead.Menu (desktop) */
export interface ResultsContentProps {
    movies: SearchResult[];
    tvShows: SearchResult[];
    persons: SearchResult[];
}
/**
 * Grouped search results for the desktop Typeahead.Menu.
 *
 * Renders Movies, TV Shows, and People sections using Typeahead.Item.
 * Navigation is handled by Typeahead onSelect (value = route).
 * Person items are disabled.
 */
declare const ResultsContent: FC<ResultsContentProps>;
export default ResultsContent;
