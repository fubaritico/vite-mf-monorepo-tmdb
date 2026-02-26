import { Badge } from '@vite-mf-monorepo/ui'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Badge> = {
  title: 'Design System/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'outline', 'destructive'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    icon: {
      control: 'select',
      options: [
        undefined,
        'Calendar',
        'Star',
        'Heart',
        'Play',
        'Bookmark',
        'Plus',
      ],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {
    children: 'Action',
    variant: 'default',
    size: 'md',
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
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      </section>

      {/* Sizes */}
      <section>
        <h3 className="mb-4 text-sm font-semibold text-gray-500">Sizes</h3>
        <div className="flex flex-wrap items-center gap-2">
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
          <Badge size="lg">Large</Badge>
        </div>
      </section>

      {/* With Icons */}
      <section>
        <h3 className="mb-4 text-sm font-semibold text-gray-500">With Icons</h3>
        <div className="flex flex-wrap gap-2">
          <Badge icon="Calendar" variant="secondary">
            2024
          </Badge>
          <Badge icon="Star">Featured</Badge>
          <Badge icon="Heart" variant="secondary">
            Favorite
          </Badge>
          <Badge icon="Play" variant="outline">
            Watch
          </Badge>
        </div>
      </section>

      {/* Media Genres */}
      <section>
        <h3 className="mb-4 text-sm font-semibold text-gray-500">
          Movie Genres
        </h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">Action</Badge>
          <Badge variant="secondary">Sci-Fi</Badge>
          <Badge variant="secondary">Drama</Badge>
          <Badge variant="secondary">Comedy</Badge>
          <Badge variant="secondary">Thriller</Badge>
        </div>
      </section>

      {/* Status Examples */}
      <section>
        <h3 className="mb-4 text-sm font-semibold text-gray-500">
          Status Examples
        </h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">Released</Badge>
          <Badge variant="secondary">In Production</Badge>
          <Badge variant="destructive">Cancelled</Badge>
        </div>
      </section>

      {/* Media Card Example */}
      <section>
        <h3 className="mb-4 text-sm font-semibold text-gray-500">
          Movie Card Example
        </h3>
        <div className="flex flex-col gap-2 rounded-lg bg-gray-800 p-4">
          <span className="font-medium text-white">Dune: Part Two</span>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" size="sm">
              2024
            </Badge>
            <Badge variant="outline" size="sm" textClassName="text-white">
              Sci-Fi
            </Badge>
            <Badge variant="outline" size="sm" textClassName="text-white">
              Adventure
            </Badge>
            <Badge variant="outline" size="sm" textClassName="text-white">
              Drama
            </Badge>
          </div>
        </div>
      </section>
    </div>
  ),
}
