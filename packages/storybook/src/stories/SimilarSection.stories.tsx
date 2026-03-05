import { SimilarSection } from '@vite-mf-monorepo/media'
import {
  movieSimilarHandlers,
  tvSeriesSimilarHandlers,
} from '@vite-mf-monorepo/shared/mocks'

import { withRouter } from '../../.storybook/decorators/withRouter'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Media/SimilarSection',
  component: SimilarSection,
  parameters: {
    layout: 'fullscreen',
    msw: {
      handlers: [
        movieSimilarHandlers.movieSimilar,
        tvSeriesSimilarHandlers.tvSeriesSimilar,
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
} satisfies Meta<typeof SimilarSection>

export default meta
type Story = StoryObj<typeof meta>

export const MoviePage: Story = {
  decorators: [withRouter('/movie/278')],
}

export const TVPage: Story = {
  decorators: [withRouter('/tv/1399')],
}

export const MovieLoading: Story = {
  parameters: {
    msw: {
      handlers: [
        movieSimilarHandlers.movieSimilarLoading,
        tvSeriesSimilarHandlers.tvSeriesSimilar,
      ],
    },
  },
  decorators: [withRouter('/movie/278')],
}

export const TVLoading: Story = {
  parameters: {
    msw: {
      handlers: [
        movieSimilarHandlers.movieSimilar,
        tvSeriesSimilarHandlers.tvSeriesSimilarLoading,
      ],
    },
  },
  decorators: [withRouter('/tv/1399')],
}

export const MovieError: Story = {
  parameters: {
    msw: {
      handlers: [
        movieSimilarHandlers.movieSimilarError,
        tvSeriesSimilarHandlers.tvSeriesSimilar,
      ],
    },
  },
  decorators: [withRouter('/movie/278')],
}

export const TVError: Story = {
  parameters: {
    msw: {
      handlers: [
        movieSimilarHandlers.movieSimilar,
        tvSeriesSimilarHandlers.tvSeriesSimilarError,
      ],
    },
  },
  decorators: [withRouter('/tv/1399')],
}
