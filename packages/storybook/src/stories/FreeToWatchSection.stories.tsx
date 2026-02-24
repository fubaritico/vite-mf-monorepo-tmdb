import { FreeToWatchSection } from '@vite-mf-monorepo/home'
import { freeToWatchHandlers } from '@vite-mf-monorepo/shared/mocks'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Home/FreeToWatchSection',
  component: FreeToWatchSection,
  parameters: {
    layout: 'fullscreen',
    msw: {
      handlers: [
        freeToWatchHandlers.freeToWatchMovies,
        freeToWatchHandlers.freeToWatchTV,
      ],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FreeToWatchSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const MoviesLoading: Story = {
  parameters: {
    msw: {
      handlers: [
        freeToWatchHandlers.freeToWatchMoviesLoading,
        freeToWatchHandlers.freeToWatchTV,
      ],
    },
  },
}

export const TVLoading: Story = {
  parameters: {
    msw: {
      handlers: [
        freeToWatchHandlers.freeToWatchMovies,
        freeToWatchHandlers.freeToWatchTVLoading,
      ],
    },
  },
}

export const MoviesError: Story = {
  parameters: {
    msw: {
      handlers: [
        freeToWatchHandlers.freeToWatchMoviesError,
        freeToWatchHandlers.freeToWatchTV,
      ],
    },
  },
}

export const TVError: Story = {
  parameters: {
    msw: {
      handlers: [
        freeToWatchHandlers.freeToWatchMovies,
        freeToWatchHandlers.freeToWatchTVError,
      ],
    },
  },
}
