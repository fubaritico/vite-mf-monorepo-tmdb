import { Photos } from '@vite-mf-monorepo/media'
import { movieImagesHandlers } from '@vite-mf-monorepo/shared/mocks'

import { withRouter } from '../../.storybook/decorators/withRouter'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Media/Photos',
  component: Photos,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Photos>

export default meta
type Story = StoryObj<typeof meta>

export const Movie: Story = {
  parameters: {
    msw: {
      handlers: [movieImagesHandlers.movieImages],
    },
  },
  decorators: [withRouter('/movie/278')],
}

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [movieImagesHandlers.movieImagesLoading],
    },
  },
  decorators: [withRouter('/movie/278')],
}

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [movieImagesHandlers.movieImagesError],
    },
  },
  decorators: [withRouter('/movie/278')],
}
