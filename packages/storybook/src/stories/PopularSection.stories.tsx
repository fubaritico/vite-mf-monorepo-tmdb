import { PopularSection } from '@vite-mf-monorepo/home'
import { popularHandlers } from '@vite-mf-monorepo/shared/mocks'

import { withRouter } from '../../.storybook/decorators/withRouter'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Home/PopularSection',
  component: PopularSection,
  parameters: {
    layout: 'fullscreen',
    msw: {
      handlers: [popularHandlers.popularMovies, popularHandlers.popularTV],
    },
  },
  decorators: [
    withRouter(),
    (Story) => (
      <div style={{ padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PopularSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const MoviesLoading: Story = {
  parameters: {
    msw: {
      handlers: [
        popularHandlers.popularMoviesLoading,
        popularHandlers.popularTV,
      ],
    },
  },
}

export const TVLoading: Story = {
  parameters: {
    msw: {
      handlers: [
        popularHandlers.popularMovies,
        popularHandlers.popularTVLoading,
      ],
    },
  },
}

export const MoviesError: Story = {
  parameters: {
    msw: {
      handlers: [popularHandlers.popularMoviesError, popularHandlers.popularTV],
    },
  },
}

export const TVError: Story = {
  parameters: {
    msw: {
      handlers: [popularHandlers.popularMovies, popularHandlers.popularTVError],
    },
  },
}
