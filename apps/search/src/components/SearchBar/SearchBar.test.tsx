import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderReactQueryWithRouter } from '@vite-mf-monorepo/shared/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import SearchBar from './SearchBar'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return { ...actual, useNavigate: () => mockNavigate }
})

describe('SearchBar', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
  })

  it('should render the search bar with data-testid', () => {
    renderReactQueryWithRouter(<SearchBar query="" />, '/', '/')
    expect(screen.getByTestId('search-bar')).toBeInTheDocument()
  })

  it('should render the input with decoded query as initial value', () => {
    renderReactQueryWithRouter(<SearchBar query="fight%20club" />, '/', '/')
    expect(screen.getByDisplayValue('fight club')).toBeInTheDocument()
  })

  it('should render the Search button', () => {
    renderReactQueryWithRouter(<SearchBar query="" />, '/', '/')
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument()
  })

  it('should render the input with placeholder', () => {
    renderReactQueryWithRouter(<SearchBar query="" />, '/', '/')
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
  })

  it('should update the input value when typing', async () => {
    const user = userEvent.setup()
    renderReactQueryWithRouter(<SearchBar query="" />, '/', '/')

    const input = screen.getByPlaceholderText('Search...')
    await user.type(input, 'inception')
    expect(input).toHaveValue('inception')
  })

  it('should navigate on submit when query is >= 2 characters', async () => {
    const user = userEvent.setup()
    renderReactQueryWithRouter(<SearchBar query="" />, '/', '/')

    const input = screen.getByPlaceholderText('Search...')
    await user.type(input, 'batman')
    await user.click(screen.getByRole('button', { name: 'Search' }))

    expect(mockNavigate).toHaveBeenCalledWith('/search/batman')
  })

  it('should encode the query in the navigation URL', async () => {
    const user = userEvent.setup()
    renderReactQueryWithRouter(<SearchBar query="" />, '/', '/')

    const input = screen.getByPlaceholderText('Search...')
    await user.type(input, 'fight club')
    await user.click(screen.getByRole('button', { name: 'Search' }))

    expect(mockNavigate).toHaveBeenCalledWith('/search/fight%20club')
  })

  it('should trim whitespace before navigating', async () => {
    const user = userEvent.setup()
    renderReactQueryWithRouter(<SearchBar query="" />, '/', '/')

    const input = screen.getByPlaceholderText('Search...')
    await user.type(input, '  batman  ')
    await user.click(screen.getByRole('button', { name: 'Search' }))

    expect(mockNavigate).toHaveBeenCalledWith('/search/batman')
  })

  it('should not navigate when query is less than 2 characters', async () => {
    const user = userEvent.setup()
    renderReactQueryWithRouter(<SearchBar query="" />, '/', '/')

    const input = screen.getByPlaceholderText('Search...')
    await user.type(input, 'a')
    await user.click(screen.getByRole('button', { name: 'Search' }))

    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it('should not navigate when query is only whitespace', async () => {
    const user = userEvent.setup()
    renderReactQueryWithRouter(<SearchBar query="" />, '/', '/')

    const input = screen.getByPlaceholderText('Search...')
    await user.type(input, '   ')
    await user.click(screen.getByRole('button', { name: 'Search' }))

    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it('should navigate on Enter key press', async () => {
    const user = userEvent.setup()
    renderReactQueryWithRouter(<SearchBar query="" />, '/', '/')

    const input = screen.getByPlaceholderText('Search...')
    await user.type(input, 'matrix{Enter}')

    expect(mockNavigate).toHaveBeenCalledWith('/search/matrix')
  })

  it('should spread additional props on the wrapper div', () => {
    renderReactQueryWithRouter(
      <SearchBar query="" aria-label="search form" />,
      '/',
      '/'
    )
    expect(screen.getByTestId('search-bar')).toHaveAttribute(
      'aria-label',
      'search form'
    )
  })

  it('should apply custom className', () => {
    renderReactQueryWithRouter(
      <SearchBar query="" className="sr:mt-4" />,
      '/',
      '/'
    )
    expect(screen.getByTestId('search-bar')).toHaveClass('sr:mt-4')
  })
})
