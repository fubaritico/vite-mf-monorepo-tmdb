import { Skeleton } from '@vite-mf-monorepo/ui'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Design System/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Rectangle: Story = {
  args: {
    variant: 'rectangle',
    width: 'ui:w-64',
    height: 'ui:h-32',
  },
}

export const Circle: Story = {
  args: {
    variant: 'circle',
    width: 'ui:w-16',
    height: 'ui:h-16',
  },
}

export const Line: Story = {
  args: {
    variant: 'line',
    width: 'ui:w-full',
    height: 'ui:h-4',
  },
}

export const WithAspectRatio: Story = {
  args: {
    variant: 'rectangle',
    width: 'ui:w-48',
    aspectRatio: '2/3',
  },
}

export const ListItemWithAvatar: Story = {
  render: () => (
    <div className="ui:flex ui:gap-4 ui:items-center ui:p-4 ui:max-w-md">
      {/* Avatar skeleton */}
      <Skeleton variant="circle" width="ui:w-12" height="ui:h-12" />

      {/* Content skeleton */}
      <div className="ui:flex-1 ui:space-y-2">
        <Skeleton variant="line" width="ui:w-3/4" height="ui:h-4" />
        <Skeleton variant="line" width="ui:w-1/2" height="ui:h-3" />
      </div>
    </div>
  ),
}

export const MovieCard: Story = {
  render: () => (
    <div className="ui:w-[200px] ui:space-y-2">
      {/* Poster skeleton */}
      <Skeleton variant="rectangle" width="ui:w-full" aspectRatio="2/3" />

      {/* Title skeleton */}
      <Skeleton variant="line" width="ui:w-full" height="ui:h-4" />

      {/* Rating skeleton */}
      <Skeleton variant="line" width="ui:w-16" height="ui:h-3" />
    </div>
  ),
}
