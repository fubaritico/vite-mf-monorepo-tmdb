import type { SearchResult } from '../SearchTypeahead/searchTypeahead.utils';
import type { FC } from 'react';
export interface SearchPeopleProps {
    items: SearchResult[];
    title: string;
    hasMore?: boolean;
    onLoadMore?: () => void;
    isLoadingMore?: boolean;
}
declare const SearchPeople: FC<SearchPeopleProps>;
export default SearchPeople;
