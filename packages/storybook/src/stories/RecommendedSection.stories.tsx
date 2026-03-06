import { RecommendedSection } from '@vite-mf-monorepo/media'
import {
  movieRecommendationsHandlers,
  tvSeriesRecommendationsHandlers,
} from '@vite-mf-monorepo/shared/mocks'

import { withRouter } from '../../.storybook/decorators/withRouter'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Media/RecommendedSection',
  component: RecommendedSection,
  parameters: {
    layout: 'fullscreen',
    msw: {
      handlers: [
        movieRecommendationsHandlers.movieRecommendations,
        tvSeriesRecommendationsHandlers.tvSeriesRecommendations,
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
} satisfies Meta<typeof RecommendedSection>

export default meta
type Story = StoryObj<typeof meta>

export const Movie: Story = {
  decorators: [withRouter('/movie/278')],
}

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        movieRecommendationsHandlers.movieRecommendationsLoading,
        tvSeriesRecommendationsHandlers.tvSeriesRecommendations,
      ],
    },
  },
  decorators: [withRouter('/movie/278')],
}

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [
        movieRecommendationsHandlers.movieRecommendationsError,
        tvSeriesRecommendationsHandlers.tvSeriesRecommendations,
      ],
    },
  },
  decorators: [withRouter('/movie/278')],
}
