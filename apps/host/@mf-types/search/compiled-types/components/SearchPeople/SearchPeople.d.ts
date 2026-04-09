import type { SearchResult } from '../SearchTypeahead/searchTypeahead.utils';
import type { FC } from 'react';
export interface SearchPeopleProps {
    items: SearchResult[];
    title: string;
}
declare const SearchPeople: FC<SearchPeopleProps>;
export default SearchPeople;
