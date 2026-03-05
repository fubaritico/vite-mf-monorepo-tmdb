import { TrailersSection } from '@vite-mf-monorepo/media'
import { movieVideosHandlers } from '@vite-mf-monorepo/shared/mocks'

import { withRouter } from '../../.storybook/decorators/withRouter'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Media/TrailersSection',
  component: TrailersSection,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof TrailersSection>

export default meta
type Story = StoryObj<typeof meta>

export const Movie: Story = {
  parameters: {
    msw: {
      handlers: [movieVideosHandlers.movieVideos],
    },
  },
  decorators: [withRouter('/movie/278')],
}

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [movieVideosHandlers.movieVideosLoading],
    },
  },
  decorators: [withRouter('/movie/278')],
}

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [movieVideosHandlers.movieVideosError],
    },
  },
  decorators: [withRouter('/movie/278')],
}
