import { screen } from '@testing-library/react'
import { renderReactQueryWithRouter } from '@vite-mf-monorepo/shared/test-utils'
import { describe, expect, it } from 'vitest'

import SearchPeople from './SearchPeople'

import type { SearchResult } from '../SearchTypeahead/searchTypeahead.utils'

const mockActors: SearchResult[] = [
  {
    id: 287,
    name: 'Brad Pitt',
    media_type: 'person',
    known_for_department: 'Acting',
    profile_path: '/brad.jpg',
    known_for: [
      { title: 'Fight Club' },
      { title: 'Troy' },
      { title: 'Inglourious Basterds' },
    ],
  } as SearchResult,
  {
    id: 6193,
    name: 'Leonardo DiCaprio',
    media_type: 'person',
    known_for_department: 'Acting',
    profile_path: '/leo.jpg',
    known_for: [{ title: 'Inception' }, { title: 'Titanic' }],
  } as SearchResult,
]

describe('SearchPeople', () => {
  it('should render nothing when items is empty', () => {
    const { container } = renderReactQueryWithRouter(
      <SearchPeople items={[]} title="actors" />,
      '/',
      '/'
    )
    expect(container.innerHTML).toBe('')
  })

  it('should render person names', () => {
    renderReactQueryWithRouter(
      <SearchPeople items={mockActors} title="actors" />,
      '/',
      '/'
    )
    expect(screen.getByText('Brad Pitt')).toBeInTheDocument()
    expect(screen.getByText('Leonardo DiCaprio')).toBeInTheDocument()
  })

  it('should render the results count header with title', () => {
    renderReactQueryWithRouter(
      <SearchPeople items={mockActors} title="actors" />,
      '/',
      '/'
    )
    expect(screen.getByText('actors')).toBeInTheDocument()
  })

  it('should render department', () => {
    renderReactQueryWithRouter(
      <SearchPeople items={mockActors} title="actors" />,
      '/',
      '/'
    )
    const departments = screen.getAllByText('Acting')
    expect(departments.length).toBe(2)
  })

  it('should render known for titles (top 2)', () => {
    renderReactQueryWithRouter(
      <SearchPeople items={mockActors} title="actors" />,
      '/',
      '/'
    )
    expect(
      screen.getByText('Known for "Fight Club", "Troy"')
    ).toBeInTheDocument()
    expect(
      screen.getByText('Known for "Inception", "Titanic"')
    ).toBeInTheDocument()
  })

  it('should render with "directors" title', () => {
    const directors: SearchResult[] = [
      {
        id: 138,
        name: 'Quentin Tarantino',
        media_type: 'person',
        known_for_department: 'Directing',
      } as SearchResult,
    ]

    renderReactQueryWithRouter(
      <SearchPeople items={directors} title="directors" />,
      '/',
      '/'
    )
    expect(screen.getByText('directors')).toBeInTheDocument()
    expect(screen.getByText('Quentin Tarantino')).toBeInTheDocument()
    expect(screen.getByText('Directing')).toBeInTheDocument()
  })
})
