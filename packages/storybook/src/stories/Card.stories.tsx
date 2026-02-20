import { Card } from '@vite-mf-monorepo/ui'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Card> = {
  title: 'Design System/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'elevated', 'ghost'],
      description: 'Visual variant of the card',
    },
    children: {
      control: 'text',
      description: 'Card content',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {
    variant: 'default',
    children: 'This is a card. Change the variant to see different styles.',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
}

export const Showcase: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div className="flex flex-col gap-8">
      {/* All Variants */}
      <section>
        <h3 className="mb-4 text-sm font-semibold text-gray-500">
          All Variants
        </h3>
        <div className="grid grid-cols-2 gap-4" style={{ width: 600 }}>
          <Card variant="default">
            <h4 className="mb-2 font-semibold">Default</h4>
            <p className="text-sm text-muted-foreground">
              Background, padding, rounded-md, shadow-md
            </p>
          </Card>
          <Card variant="outline">
            <h4 className="mb-2 font-semibold">Outline</h4>
            <p className="text-sm text-muted-foreground">
              Border, transparent background, padding, rounded-md
            </p>
          </Card>
          <Card variant="elevated">
            <h4 className="mb-2 font-semibold">Elevated</h4>
            <p className="text-sm text-muted-foreground">
              Larger padding, rounded-lg, shadow-lg
            </p>
          </Card>
          <Card
            variant="ghost"
            className="border border-dashed border-gray-300"
          >
            <h4 className="mb-2 font-semibold">Ghost</h4>
            <p className="text-sm text-muted-foreground">
              Only rounded-md, no padding/shadow/background
            </p>
          </Card>
        </div>
      </section>

      {/* Use Cases */}
      <section>
        <h3 className="mb-4 text-sm font-semibold text-gray-500">Use Cases</h3>
        <div className="flex gap-4">
          <Card variant="default" className="w-64">
            <h4 className="mb-2 font-semibold">Content Card</h4>
            <p className="text-sm text-muted-foreground">
              Use default for content sections with clear boundaries.
            </p>
          </Card>
          <Card variant="elevated" className="w-64">
            <h4 className="mb-2 font-semibold">Featured Card</h4>
            <p className="text-sm text-muted-foreground">
              Use elevated for important or featured content.
            </p>
          </Card>
          <Card variant="outline" className="w-64">
            <h4 className="mb-2 font-semibold">Form Card</h4>
            <p className="text-sm text-muted-foreground">
              Use outline for forms or secondary content.
            </p>
          </Card>
        </div>
      </section>
    </div>
  ),
}
