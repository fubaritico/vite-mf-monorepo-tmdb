import { Card } from '@vite-mf-monorepo/ui'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline'],
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

export const Default: Story = {
  args: {
    variant: 'default',
    children: 'This is a default card with shadow and background.',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'This is an outline card with border and transparent background.',
  },
}

export const WithContent: Story = {
  render: () => (
    <Card className="w-80">
      <h3 className="mb-2 text-lg font-semibold">Card Title</h3>
      <p className="text-muted-foreground">
        This is some example content inside the card. It can contain any React
        elements.
      </p>
    </Card>
  ),
}

export const OutlineWithContent: Story = {
  render: () => (
    <Card variant="outline" className="w-80">
      <h3 className="mb-2 text-lg font-semibold">Outline Card</h3>
      <p className="text-muted-foreground">
        This card has an outline variant with a border instead of a shadow.
      </p>
    </Card>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Card className="w-64">
        <h3 className="mb-2 font-semibold">Default Card</h3>
        <p className="text-sm text-muted-foreground">
          With shadow and background color.
        </p>
      </Card>
      <Card variant="outline" className="w-64">
        <h3 className="mb-2 font-semibold">Outline Card</h3>
        <p className="text-sm text-muted-foreground">
          With border and transparent background.
        </p>
      </Card>
    </div>
  ),
}
