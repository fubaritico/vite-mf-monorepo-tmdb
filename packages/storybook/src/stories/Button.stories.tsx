import { Button } from '@vite-mf-monorepo/ui'

import type { Meta, StoryObj } from '@storybook/react'
import type { IconName } from '@vite-mf-monorepo/ui'

const iconOptions: IconName[] = [
  'ArrowLeft',
  'ArrowRight',
  'Check',
  'XMark',
  'Plus',
  'Minus',
  'ChevronRight',
  'ChevronLeft',
  'MagnifyingGlass',
  'Heart',
  'Star',
  'Play',
  'Share',
  'Bookmark',
]

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'destructive', 'outline', 'ghost'],
      description: 'Visual variant of the button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the button',
    },
    icon: {
      control: 'select',
      options: [undefined, ...iconOptions],
      description: 'Icon to display',
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Icon position relative to children',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    children: {
      control: 'text',
      description: 'Button content',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    icon: undefined,
    iconPosition: 'left',
    disabled: false,
    children: 'Button',
  },
}

export const Showcase: Story = {
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  render: () => (
    <div className="flex flex-col gap-8">
      {/* Variants */}
      <section>
        <h3 className="mb-4 text-sm font-semibold text-gray-500">Variants</h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </section>

      {/* Sizes */}
      <section>
        <h3 className="mb-4 text-sm font-semibold text-gray-500">Sizes</h3>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      {/* With Icons */}
      <section>
        <h3 className="mb-4 text-sm font-semibold text-gray-500">With Icons</h3>
        <div className="flex flex-wrap gap-3">
          <Button icon="Play">Play</Button>
          <Button icon="Heart" variant="secondary">
            Like
          </Button>
          <Button icon="ArrowLeft" iconPosition="left">
            Back
          </Button>
          <Button icon="ArrowRight" iconPosition="right">
            Next
          </Button>
          <Button icon="MagnifyingGlass" variant="outline">
            Search
          </Button>
        </div>
      </section>

      {/* Icon Sizes */}
      <section>
        <h3 className="mb-4 text-sm font-semibold text-gray-500">Icon Sizes</h3>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm" icon="Plus">
            Add
          </Button>
          <Button size="md" icon="Plus">
            Add
          </Button>
          <Button size="lg" icon="Plus">
            Add
          </Button>
        </div>
      </section>

      {/* Disabled States */}
      <section>
        <h3 className="mb-4 text-sm font-semibold text-gray-500">
          Disabled States
        </h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" disabled>
            Primary
          </Button>
          <Button variant="secondary" disabled>
            Secondary
          </Button>
          <Button variant="destructive" disabled>
            Destructive
          </Button>
          <Button variant="outline" disabled>
            Outline
          </Button>
          <Button variant="ghost" disabled>
            Ghost
          </Button>
        </div>
      </section>

      {/* All Variants with Icons */}
      <section>
        <h3 className="mb-4 text-sm font-semibold text-gray-500">
          All Variants with Icons
        </h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" icon="Check">
            Confirm
          </Button>
          <Button variant="secondary" icon="Bookmark">
            Save
          </Button>
          <Button variant="destructive" icon="XMark">
            Delete
          </Button>
          <Button variant="outline" icon="Share">
            Share
          </Button>
          <Button variant="ghost" icon="Heart">
            Like
          </Button>
        </div>
      </section>
    </div>
  ),
}
