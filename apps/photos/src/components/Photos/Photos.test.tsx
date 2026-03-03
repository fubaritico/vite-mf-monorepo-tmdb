import { screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import {
  mockMovieImages,
  movieImagesHandlers,
} from '@vite-mf-monorepo/shared/mocks'
import { renderReactQueryWithRouter } from '@vite-mf-monorepo/shared/test-utils'
import { setupServer } from 'msw/node'
import { useLocation } from 'react-router-dom'
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest'

import Photos from './Photos'

import type { FC } from 'react'

// jsdom does not implement <dialog> methods — mock them so RTL finds the dialog
const showModalMock = vi.fn(() => {
  screen.getByRole('dialog', { hidden: true }).setAttribute('open', '')
})
const closeMock = vi.fn(() => {
  screen.queryByRole('dialog', { hidden: true })?.removeAttribute('open')
})
HTMLDialogElement.prototype.showModal = showModalMock
HTMLDialogElement.prototype.close = closeMock

// Tracks the current route during a test — updated on every render of RouteObserver
let currentPath = ''
const RouteObserver: FC = () => {
  currentPath = useLocation().pathname
  return null
}

const server = setupServer()
const ROUTE = '/movie/:id/photos/:index'

/** Mirrors the production id derivation: file_path without leading slash and extension */
const toId = (filePath: string) =>
  filePath.replace(/^\//, '').replace(/\.[^/.]+$/, '')

const firstId = toId(mockMovieImages.backdrops?.[0]?.file_path ?? '')
const secondId = toId(mockMovieImages.backdrops?.[1]?.file_path ?? '')

beforeAll(() => {
  server.listen()
})
afterEach(() => {
  server.resetHandlers()
  currentPath = ''
  document.body.style.overflow = ''
})
afterAll(() => {
  server.close()
})

describe('Photos (viewer)', () => {
  it('opens the modal when data loads', async () => {
    server.use(movieImagesHandlers.movieImages)

    renderReactQueryWithRouter(
      <Photos />,
      ROUTE,
      `/movie/278/photos/${firstId}`
    )

    expect(await screen.findByRole('dialog')).toBeInTheDocument()
  })

  it('renders all backdrop images from the API', async () => {
    server.use(movieImagesHandlers.movieImages)

    renderReactQueryWithRouter(
      <Photos />,
      ROUTE,
      `/movie/278/photos/${firstId}`
    )

    await screen.findByRole('dialog')

    expect(screen.getAllByRole('img')).toHaveLength(
      mockMovieImages.backdrops?.length ?? 0
    )
  })

  it('image src uses the TMDB w1280 size and the correct file path', async () => {
    server.use(movieImagesHandlers.movieImages)

    renderReactQueryWithRouter(
      <Photos />,
      ROUTE,
      `/movie/278/photos/${firstId}`
    )

    await screen.findByRole('dialog')

    const firstBackdrop = mockMovieImages.backdrops?.[0]
    const img = screen.getByRole('img', { name: 'Backdrop 1' })
    expect(img).toHaveAttribute(
      'src',
      `https://image.tmdb.org/t/p/w1280${firstBackdrop?.file_path ?? ''}`
    )
  })

  it('Previous is disabled at the first photo', async () => {
    server.use(movieImagesHandlers.movieImages)

    renderReactQueryWithRouter(
      <Photos />,
      ROUTE,
      `/movie/278/photos/${firstId}`
    )

    await screen.findByRole('dialog')
    const prevBtn = await screen.findByRole('button', { name: 'Previous' })

    expect(prevBtn).toBeDisabled()
  })

  it('clicking Next updates the route to the next photo id', async () => {
    server.use(movieImagesHandlers.movieImages)

    renderReactQueryWithRouter(
      <>
        <RouteObserver />
        <Photos />
      </>,
      ROUTE,
      `/movie/278/photos/${firstId}`
    )

    await screen.findByRole('dialog')
    const nextBtn = await screen.findByRole('button', { name: 'Next' })

    await userEvent.click(nextBtn)

    await waitFor(() => {
      expect(currentPath).toBe(`/movie/278/photos/${secondId}`)
    })
  })

  it('shows loading state while fetching', () => {
    server.use(movieImagesHandlers.movieImagesLoading)

    renderReactQueryWithRouter(
      <Photos />,
      ROUTE,
      `/movie/278/photos/${firstId}`
    )

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('shows error status code and message when the API fails', async () => {
    server.use(movieImagesHandlers.movieImagesError)

    renderReactQueryWithRouter(
      <Photos />,
      ROUTE,
      `/movie/278/photos/${firstId}`
    )

    await waitFor(() => {
      expect(screen.getByText('500')).toBeInTheDocument()
    })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
