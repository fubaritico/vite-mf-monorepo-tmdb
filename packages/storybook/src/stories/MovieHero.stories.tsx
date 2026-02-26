import { MovieHero } from '@vite-mf-monorepo/movie'
import { movieDetailsHandlers } from '@vite-mf-monorepo/shared/mocks'

import { withRouter } from '../../.storybook/decorators/withRouter'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Movie/MovieHero',
  component: MovieHero,
  parameters: {
    layout: 'fullscreen',
    msw: {
      handlers: [movieDetailsHandlers.movieDetails],
    },
  },
  decorators: [withRouter('/movie/278')],
} satisfies Meta<typeof MovieHero>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [movieDetailsHandlers.movieDetailsLoading],
    },
  },
}

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [movieDetailsHandlers.movieDetailsError],
    },
  },
}
