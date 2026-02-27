import { Crew } from '@vite-mf-monorepo/media'
import { movieCreditsHandlers } from '@vite-mf-monorepo/shared/mocks'

import { withRouter } from '../../.storybook/decorators/withRouter'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Media/Crew',
  component: Crew,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Crew>

export default meta
type Story = StoryObj<typeof meta>

export const Movie: Story = {
  parameters: {
    msw: {
      handlers: [movieCreditsHandlers.movieCredits],
    },
  },
  decorators: [withRouter('/movie/278')],
}

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [movieCreditsHandlers.movieCreditsLoading],
    },
  },
  decorators: [withRouter('/movie/278')],
}

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [movieCreditsHandlers.movieCreditsError],
    },
  },
  decorators: [withRouter('/movie/278')],
}
