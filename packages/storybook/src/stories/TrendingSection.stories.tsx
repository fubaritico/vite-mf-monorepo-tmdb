import { TrendingSection } from '@vite-mf-monorepo/home'
import { trendingHandlers } from '@vite-mf-monorepo/shared/mocks'

import { withRouter } from '../../.storybook/decorators/withRouter'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Home/TrendingSection',
  component: TrendingSection,
  parameters: {
    layout: 'fullscreen',
    msw: {
      handlers: [trendingHandlers.trendingDay, trendingHandlers.trendingWeek],
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
} satisfies Meta<typeof TrendingSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        trendingHandlers.trendingDayLoading,
        trendingHandlers.trendingWeek,
      ],
    },
  },
}

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [
        trendingHandlers.trendingDayError,
        trendingHandlers.trendingWeek,
      ],
    },
  },
}
