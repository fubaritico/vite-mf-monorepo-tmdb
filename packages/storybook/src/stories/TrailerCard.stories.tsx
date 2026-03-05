import { TrailerCard } from '@vite-mf-monorepo/ui'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof TrailerCard> = {
  title: 'Design System/TrailerCard',
  component: TrailerCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    videoKey: {
      control: 'text',
      description: 'YouTube video ID',
    },
    title: {
      control: 'text',
      description: 'Trailer title',
    },
    type: {
      control: 'text',
      description: 'Video type (Trailer, Clip, Teaser, etc.)',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    videoKey: '6GoesqWQngo',
    title: 'The Shawshank Redemption - Official Trailer',
    type: 'Trailer',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 480, maxWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
}

export const Teaser: Story = {
  args: {
    videoKey: 'z5y5A6u3Xm0',
    title: 'Movie Teaser',
    type: 'Teaser',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 480, maxWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
}

export const Featurette: Story = {
  args: {
    videoKey: 'pJHpvdX9nnE',
    title: 'Behind the Scenes',
    type: 'Featurette',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 480, maxWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
}

export const NoType: Story = {
  args: {
    videoKey: '6GoesqWQngo',
    title: 'Video Without Type',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 480, maxWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
}

export const Grid: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
      style={{ width: 1200, maxWidth: '100%' }}
    >
      <TrailerCard
        videoKey="6GoesqWQngo"
        title="The Shawshank Redemption - Official Trailer"
        type="Trailer"
      />
      <TrailerCard
        videoKey="z5y5A6u3Xm0"
        title="Shawshank Redemption Clip"
        type="Clip"
      />
      <TrailerCard
        videoKey="pJHpvdX9nnE"
        title="Behind the Scenes"
        type="Featurette"
      />
    </div>
  ),
}
