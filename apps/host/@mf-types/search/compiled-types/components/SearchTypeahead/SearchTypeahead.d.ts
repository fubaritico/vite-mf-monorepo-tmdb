import '../../remote.css';
import type { FC } from 'react';
/**
 * Header search typeahead exposed via Module Federation from the search remote.
 *
 * - **Desktop (≥md)**: renders a Typeahead with a portal dropdown grouped
 *   by Movies, TV Shows, and People.
 * - **Mobile (<md)**: renders a bottom Drawer that opens on input and
 *   stays visible while the user keeps typing.
 * - **Enter without selection**: navigates to `/search?q=...`
 * - **Select a movie/tv item**: navigates to `/movie/:id` or `/tv/:id`
 * - **Person items**: displayed but disabled (no talent page yet)
 */
declare const SearchTypeahead: FC;
export default SearchTypeahead;
