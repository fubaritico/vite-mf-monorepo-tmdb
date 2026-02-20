import { IconButton } from '@vite-mf-monorepo/ui'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof IconButton> = {
  title: 'Design System/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: 'select',
      options: [
        'ChevronLeft',
        'ChevronRight',
        'ArrowLeft',
        'ArrowRight',
        'Play',
        'Heart',
        'Bookmark',
        'Share',
        'Plus',
        'Minus',
        'XMark',
        'Star',
        'MagnifyingGlass',
      ],
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {
    icon: 'ChevronRight',
    'aria-label': 'Next',
  },
}

export const Showcase: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div className="flex flex-col gap-8">
      {/* Variants */}
      <section>
        <h3 className="mb-4 text-sm font-semibold text-gray-500">Variants</h3>
        <div className="flex flex-wrap gap-3">
          <IconButton icon="Heart" variant="primary" aria-label="Primary" />
          <IconButton icon="Heart" variant="secondary" aria-label="Secondary" />
          <IconButton icon="Heart" variant="outline" aria-label="Outline" />
          <IconButton icon="Heart" variant="ghost" aria-label="Ghost" />
        </div>
      </section>

      {/* Sizes */}
      <section>
        <h3 className="mb-4 text-sm font-semibold text-gray-500">Sizes</h3>
        <div className="flex flex-wrap items-center gap-3">
          <IconButton icon="Play" size="sm" aria-label="Small" />
          <IconButton icon="Play" size="md" aria-label="Medium" />
          <IconButton icon="Play" size="lg" aria-label="Large" />
        </div>
      </section>

      {/* Common Icons */}
      <section>
        <h3 className="mb-4 text-sm font-semibold text-gray-500">
          Common Icons
        </h3>
        <div className="flex flex-wrap gap-3">
          <IconButton icon="ChevronLeft" aria-label="Previous" />
          <IconButton icon="ChevronRight" aria-label="Next" />
          <IconButton icon="Play" aria-label="Play" />
          <IconButton icon="Heart" aria-label="Like" />
          <IconButton icon="Bookmark" aria-label="Bookmark" />
          <IconButton icon="Share" aria-label="Share" />
          <IconButton icon="Plus" aria-label="Add" />
          <IconButton icon="XMark" aria-label="Close" />
        </div>
      </section>

      {/* Carousel Navigation */}
      <section>
        <h3 className="mb-4 text-sm font-semibold text-gray-500">
          Carousel Navigation
        </h3>
        <div className="flex items-center gap-4">
          <IconButton
            icon="ChevronLeft"
            aria-label="Previous"
            variant="outline"
          />
          <span className="text-sm text-gray-500">Content</span>
          <IconButton icon="ChevronRight" aria-label="Next" variant="outline" />
        </div>
      </section>

      {/* Disabled States */}
      <section>
        <h3 className="mb-4 text-sm font-semibold text-gray-500">
          Disabled States
        </h3>
        <div className="flex flex-wrap gap-3">
          <IconButton
            icon="Heart"
            variant="primary"
            disabled
            aria-label="Disabled Primary"
          />
          <IconButton
            icon="Heart"
            variant="secondary"
            disabled
            aria-label="Disabled Secondary"
          />
          <IconButton
            icon="Heart"
            variant="outline"
            disabled
            aria-label="Disabled Outline"
          />
          <IconButton
            icon="Heart"
            variant="ghost"
            disabled
            aria-label="Disabled Ghost"
          />
        </div>
      </section>
    </div>
  ),
}
