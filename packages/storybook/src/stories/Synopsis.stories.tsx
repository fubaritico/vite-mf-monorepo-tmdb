import { Synopsis } from '@vite-mf-monorepo/media'
import {
  movieDetailsHandlers,
  tvSeriesDetailsHandlers,
} from '@vite-mf-monorepo/shared/mocks'

import { withRouter } from '../../.storybook/decorators/withRouter'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Media/Synopsis',
  component: Synopsis,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Synopsis>

export default meta
type Story = StoryObj<typeof meta>

export const Movie: Story = {
  parameters: {
    msw: {
      handlers: [movieDetailsHandlers.movieDetails],
    },
  },
  decorators: [withRouter('/movie/278')],
}

export const TVSeries: Story = {
  parameters: {
    msw: {
      handlers: [tvSeriesDetailsHandlers.tvSeriesDetails],
    },
  },
  decorators: [withRouter('/tv/549')],
}

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [movieDetailsHandlers.movieDetailsLoading],
    },
  },
  decorators: [withRouter('/movie/278')],
}

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [movieDetailsHandlers.movieDetailsError],
    },
  },
  decorators: [withRouter('/movie/278')],
}
