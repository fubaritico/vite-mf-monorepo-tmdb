import { SearchTypeahead } from '@vite-mf-monorepo/search'
import { Typography } from '@vite-mf-monorepo/ui'
import {
  RouterProvider,
  createMemoryRouter,
  useLocation,
} from 'react-router-dom'

import type { Meta, StoryObj } from '@storybook/react'

/** Catch-all page that displays the navigated route */
const NavigatedPage = () => {
  const { pathname, search } = useLocation()
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        color: '#a3a3a3',
      }}
    >
      <Typography variant="body2">
        Navigated to {pathname}
        {search}
      </Typography>
    </div>
  )
}

const router = createMemoryRouter(
  [
    { path: '/search', element: <SearchTypeahead /> },
    { path: '*', element: <NavigatedPage /> },
  ],
  { initialEntries: ['/search'] }
)

const SearchTypeaheadStory = () => <RouterProvider router={router} />

const meta = {
  title: 'Search/SearchTypeahead',
  component: SearchTypeahead,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '2rem',
          minHeight: 400,
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SearchTypeahead>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Live search against the TMDB API.
 * Type at least 2 characters to see results.
 * Clicking an item navigates to its route (displayed as text).
 * If offline or no API token, a "Search unavailable" message appears.
 */
export const Default: Story = {
  render: () => <SearchTypeaheadStory />,
}
