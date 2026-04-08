import type { SearchResult } from './searchTypeahead.utils';
import type { FC } from 'react';
/** Props for the shared grouped results rendered inside Typeahead.Menu (desktop) */
export interface ResultsContentProps {
    movies: SearchResult[];
    tvShows: SearchResult[];
    persons: SearchResult[];
    onNavigate: (route: string) => void;
}
/**
 * Grouped search results for the desktop Typeahead.Menu.
 *
 * Renders Movies, TV Shows, and People sections using Typeahead.Item
 * with Link wrappers for navigable results. Person items are disabled.
 */
declare const ResultsContent: FC<ResultsContentProps>;
export default ResultsContent;
