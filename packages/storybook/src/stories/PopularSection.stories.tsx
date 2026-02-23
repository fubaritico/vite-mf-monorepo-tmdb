import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PopularSection } from '@vite-mf-monorepo/home'

import { popularHandlers } from '../mocks/handlers'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Home/PopularSection',
  component: PopularSection,
  parameters: {
    layout: 'fullscreen',
    msw: {
      handlers: [popularHandlers.popularMovies, popularHandlers.popularTV],
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
} satisfies Meta<typeof PopularSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const MoviesLoading: Story = {
  parameters: {
    msw: {
      handlers: [
        popularHandlers.popularMoviesLoading,
        popularHandlers.popularTV,
      ],
    },
  },
}

export const TVLoading: Story = {
  parameters: {
    msw: {
      handlers: [
        popularHandlers.popularMovies,
        popularHandlers.popularTVLoading,
      ],
    },
  },
}

export const MoviesError: Story = {
  parameters: {
    msw: {
      handlers: [popularHandlers.popularMoviesError, popularHandlers.popularTV],
    },
  },
}

export const TVError: Story = {
  parameters: {
    msw: {
      handlers: [popularHandlers.popularMovies, popularHandlers.popularTVError],
    },
  },
}
