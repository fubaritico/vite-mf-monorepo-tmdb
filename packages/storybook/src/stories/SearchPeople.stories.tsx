import { SearchPeople } from '@vite-mf-monorepo/search'

import type { Meta, StoryObj } from '@storybook/react'
import type { SearchResult } from '@vite-mf-monorepo/search/components/SearchTypeahead/searchTypeahead.utils'

const mockActors: SearchResult[] = [
  {
    id: 287,
    name: 'Brad Pitt',
    media_type: 'person',
    known_for_department: 'Acting',
    profile_path: '/eKFMl8bIF3E5G88kaCyn2YJexnM.jpg',
    known_for: [
      { title: 'Fight Club' },
      { title: 'Once Upon a Time… in Hollywood' },
    ],
  },
  {
    id: 6193,
    name: 'Leonardo DiCaprio',
    media_type: 'person',
    known_for_department: 'Acting',
    profile_path: '/wo2hJpn04vbtmh0B9utCFGqo1kD.jpg',
    known_for: [{ title: 'Inception' }, { title: 'The Revenant' }],
  },
  {
    id: 1245,
    name: 'Scarlett Johansson',
    media_type: 'person',
    known_for_department: 'Acting',
    profile_path: '/6NsMbJXRlDZuDzatN2akFhWS4Vq.jpg',
    known_for: [{ title: 'Lost in Translation' }, { title: 'Lucy' }],
  },
  {
    id: 17419,
    name: 'Bryan Cranston',
    media_type: 'person',
    known_for_department: 'Acting',
    profile_path: '/7Jahy5LZX2Fo8fGJltMreAI49hC.jpg',
    known_for: [{ name: 'Breaking Bad' }, { title: 'Drive' }],
  },
] as SearchResult[]

const mockDirectors: SearchResult[] = [
  {
    id: 525,
    name: 'Christopher Nolan',
    media_type: 'person',
    known_for_department: 'Directing',
    profile_path: '/xuAIuYSmsUzKlUMBFGVZaWsY3DZ.jpg',
    known_for: [{ title: 'Inception' }, { title: 'Interstellar' }],
  },
  {
    id: 138,
    name: 'Quentin Tarantino',
    media_type: 'person',
    known_for_department: 'Directing',
    profile_path: '/1gjcpAa99FAOWGnrUvHEXXsRs7o.jpg',
    known_for: [{ title: 'Pulp Fiction' }, { title: 'Kill Bill: Vol. 1' }],
  },
  {
    id: 240,
    name: 'Stanley Kubrick',
    media_type: 'person',
    known_for_department: 'Directing',
    profile_path: '/AdFczGBojOMAYnOLxqoFnqKMdn1.jpg',
    known_for: [{ title: 'The Shining' }, { title: '2001: A Space Odyssey' }],
  },
] as SearchResult[]

const mockManyPeople: SearchResult[] = Array.from({ length: 15 }, (_, i) => ({
  id: 200 + i,
  name: `Actor ${String(i + 1)}`,
  media_type: 'person',
  known_for_department: 'Acting',
  profile_path: null,
  known_for: [{ title: `Film ${String(i + 1)}` }],
})) as SearchResult[]

const meta = {
  title: 'Search/SearchPeople',
  component: SearchPeople,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SearchPeople>

export default meta
type Story = StoryObj<typeof meta>

/** Actors with profile photos and known-for credits */
export const Actors: Story = {
  args: {
    items: mockActors,
    title: 'Actors',
  },
}

/** Directors with profile photos and known-for credits */
export const Directors: Story = {
  args: {
    items: mockDirectors,
    title: 'Directors',
  },
}

/** More than 10 items — "Show more" button visible */
export const WithShowMore: Story = {
  args: {
    items: mockManyPeople,
    title: 'Actors',
  },
}

/** Empty state — renders nothing */
export const Empty: Story = {
  args: {
    items: [],
    title: 'Actors',
  },
}

/** Loading more results from API */
export const LoadingMore: Story = {
  args: {
    items: mockActors,
    title: 'Actors',
    hasMore: true,
    isLoadingMore: true,
  },
}
