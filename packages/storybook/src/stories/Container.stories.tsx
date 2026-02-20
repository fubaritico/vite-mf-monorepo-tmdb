import { Container } from '@vite-mf-monorepo/layouts'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Layout/Container',
  component: Container,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    maxWidth: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl', 'full'],
      description: 'Maximum width variant',
    },
    noPadding: {
      control: 'boolean',
      description: 'Disable horizontal padding',
    },
  },
} satisfies Meta<typeof Container>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    maxWidth: 'xl',
    children: (
      <div className="ui:bg-muted ui:p-8 ui:rounded-lg">
        <h2 className="ui:text-2xl ui:font-bold ui:mb-4">Container Content</h2>
        <p className="ui:text-muted-foreground">
          This content is centered with max-width and horizontal padding.
        </p>
      </div>
    ),
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="ui:space-y-8 ui:py-8">
      {(['sm', 'md', 'lg', 'xl', '2xl', 'full'] as const).map((size) => (
        <Container key={size} maxWidth={size}>
          <div className="ui:bg-muted ui:p-4 ui:rounded-lg ui:text-center">
            <strong>{size}</strong> - Max width container
          </div>
        </Container>
      ))}
    </div>
  ),
}

export const NoPadding: Story = {
  args: {
    maxWidth: 'xl',
    noPadding: true,
    children: (
      <div className="ui:bg-muted ui:p-8 ui:rounded-lg">
        <h2 className="ui:text-2xl ui:font-bold ui:mb-4">
          No Padding Container
        </h2>
        <p className="ui:text-muted-foreground">
          This container has no horizontal padding. Useful for full-width
          content.
        </p>
      </div>
    ),
  },
}

export const Nested: Story = {
  render: () => (
    <Container maxWidth="2xl" className="ui:bg-muted ui:py-8">
      <h2 className="ui:text-2xl ui:font-bold ui:mb-4">
        Outer Container (2xl)
      </h2>
      <Container maxWidth="lg" className="ui:bg-background ui:py-4">
        <h3 className="ui:text-xl ui:font-semibold ui:mb-2">
          Inner Container (lg)
        </h3>
        <p className="ui:text-muted-foreground">
          Nested containers for complex layouts.
        </p>
      </Container>
    </Container>
  ),
}
