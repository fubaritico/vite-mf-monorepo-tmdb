import type { SearchResult } from '../SearchTypeahead/searchTypeahead.utils';
import type { FC } from 'react';
export interface SearchMediaProps {
    items: SearchResult[];
    title: string;
    hasMore?: boolean;
    onLoadMore?: () => void;
    isLoadingMore?: boolean;
}
declare const SearchMedia: FC<SearchMediaProps>;
export default SearchMedia;
