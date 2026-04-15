import type { ComponentProps, FC } from 'react';
interface SearchBarProps extends ComponentProps<'div'> {
    /** URI encoded string used in the search, displayed in the input on init when getting to the search page */
    query: string;
}
declare const SearchBar: FC<SearchBarProps>;
export default SearchBar;
