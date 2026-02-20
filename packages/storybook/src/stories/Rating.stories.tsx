import { Rating } from '@vite-mf-monorepo/ui'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Rating> = {
  title: 'Design System/Rating',
  component: Rating,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 10, step: 0.1 },
    },
    max: {
      control: 'select',
      options: [10, 100],
    },
    variant: {
      control: 'select',
      options: ['circle', 'stars'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    showValue: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {
    value: 7.5,
    max: 10,
    variant: 'circle',
    size: 'md',
    showValue: true,
  },
}

export const Showcase: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div className="flex flex-col gap-8">
      {/* Circle Variant */}
      <section>
        <h3 className="mb-4 text-sm font-semibold text-gray-500">
          Circle Variant
        </h3>
        <div className="flex items-end gap-4">
          <Rating value={8.5} variant="circle" size="sm" />
          <Rating value={8.5} variant="circle" size="md" />
          <Rating value={8.5} variant="circle" size="lg" />
        </div>
      </section>

      {/* Stars Variant */}
      <section>
        <h3 className="mb-4 text-sm font-semibold text-gray-500">
          Stars Variant
        </h3>
        <div className="flex flex-col gap-2">
          <Rating value={8.5} variant="stars" size="sm" />
          <Rating value={8.5} variant="stars" size="md" />
          <Rating value={8.5} variant="stars" size="lg" />
        </div>
      </section>

      {/* Color Thresholds (Circle) */}
      <section>
        <h3 className="mb-4 text-sm font-semibold text-gray-500">
          Color Thresholds
        </h3>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center gap-1">
            <Rating value={8.5} variant="circle" />
            <span className="text-xs text-gray-500">High (≥70%)</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Rating value={5.5} variant="circle" />
            <span className="text-xs text-gray-500">Medium (40-70%)</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Rating value={3.0} variant="circle" />
            <span className="text-xs text-gray-500">Low (&lt;40%)</span>
          </div>
        </div>
      </section>

      {/* Partial Fill (Stars) */}
      <section>
        <h3 className="mb-4 text-sm font-semibold text-gray-500">
          Partial Fill Examples
        </h3>
        <div className="flex flex-col gap-2">
          <Rating value={10} variant="stars" />
          <Rating value={7.5} variant="stars" />
          <Rating value={5.0} variant="stars" />
          <Rating value={2.5} variant="stars" />
          <Rating value={0} variant="stars" />
        </div>
      </section>

      {/* Without Value */}
      <section>
        <h3 className="mb-4 text-sm font-semibold text-gray-500">
          Without Value Display
        </h3>
        <div className="flex items-center gap-4">
          <Rating value={7.5} variant="circle" showValue={false} />
          <Rating value={7.5} variant="stars" showValue={false} />
        </div>
      </section>

      {/* TMDB Movie Card Example */}
      <section>
        <h3 className="mb-4 text-sm font-semibold text-gray-500">
          Movie Card Example
        </h3>
        <div className="flex items-center gap-6 rounded-lg bg-gray-800 p-4">
          <div className="h-24 w-16 rounded bg-gray-600" />
          <div className="flex flex-col gap-2">
            <span className="font-medium text-white">Movie Title</span>
            <Rating value={7.8} variant="circle" size="sm" />
          </div>
        </div>
      </section>
    </div>
  ),
}
