import { HeroSection } from '@vite-mf-monorepo/home'
import { nowPlayingHandlers } from '@vite-mf-monorepo/shared/mocks'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Home/HeroSection',
  component: HeroSection,
  parameters: {
    layout: 'fullscreen',
    msw: {
      handlers: [nowPlayingHandlers.nowPlayingMovies],
    },
  },
} satisfies Meta<typeof HeroSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [nowPlayingHandlers.nowPlayingMoviesLoading],
    },
  },
}

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [nowPlayingHandlers.nowPlayingMoviesError],
    },
  },
}
