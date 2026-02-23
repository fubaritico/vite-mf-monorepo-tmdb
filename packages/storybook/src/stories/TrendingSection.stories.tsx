import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TrendingSection } from '@vite-mf-monorepo/home'
import { trendingHandlers } from '@vite-mf-monorepo/shared/mocks'

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
    (Story) => {
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            staleTime: Infinity,
          },
        },
      })

      return (
        <QueryClientProvider client={queryClient}>
          <div style={{ padding: '2rem' }}>
            <Story />
          </div>
        </QueryClientProvider>
      )
    },
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
