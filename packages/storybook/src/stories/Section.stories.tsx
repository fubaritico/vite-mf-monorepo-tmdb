import { Container, Section } from '@vite-mf-monorepo/layouts'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Layout/Section',
  component: Section,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'muted'],
      description: 'Background variant',
    },
    spacing: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Vertical spacing',
    },
    title: {
      control: 'text',
      description: 'Section title',
    },
  },
} satisfies Meta<typeof Section>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Section Title',
    children: (
      <Container>
        <p className="ui:text-muted-foreground">
          This is a section with default background and medium spacing.
        </p>
      </Container>
    ),
  },
}

export const Muted: Story = {
  args: {
    title: 'Muted Section',
    variant: 'muted',
    children: (
      <Container>
        <p className="ui:text-muted-foreground">
          This section has a muted background for visual separation.
        </p>
      </Container>
    ),
  },
}

export const AllSpacings: Story = {
  render: () => (
    <div>
      <Section title="Small Spacing" spacing="sm">
        <Container>
          <p className="ui:text-muted-foreground">
            Section with small vertical spacing (py-6)
          </p>
        </Container>
      </Section>
      <Section title="Medium Spacing" spacing="md" variant="muted">
        <Container>
          <p className="ui:text-muted-foreground">
            Section with medium vertical spacing (py-12)
          </p>
        </Container>
      </Section>
      <Section title="Large Spacing" spacing="lg">
        <Container>
          <p className="ui:text-muted-foreground">
            Section with large vertical spacing (py-16)
          </p>
        </Container>
      </Section>
    </div>
  ),
}

export const WithoutTitle: Story = {
  args: {
    variant: 'muted',
    spacing: 'md',
    children: (
      <Container>
        <h2 className="ui:text-2xl ui:font-bold ui:mb-4">Custom Title</h2>
        <p className="ui:text-muted-foreground">
          Section without the built-in title prop. You can add your own custom
          heading.
        </p>
      </Container>
    ),
  },
}

export const AlternatingBackgrounds: Story = {
  render: () => (
    <div>
      <Section title="Trending" variant="default" spacing="lg">
        <Container>
          <div className="ui:bg-muted ui:p-8 ui:rounded-lg">
            <p>Content for trending section</p>
          </div>
        </Container>
      </Section>
      <Section title="What's Popular" variant="muted" spacing="lg">
        <Container>
          <div className="ui:bg-background ui:p-8 ui:rounded-lg">
            <p>Content for popular section</p>
          </div>
        </Container>
      </Section>
      <Section title="Free to Watch" variant="default" spacing="lg">
        <Container>
          <div className="ui:bg-muted ui:p-8 ui:rounded-lg">
            <p>Content for free section</p>
          </div>
        </Container>
      </Section>
    </div>
  ),
}
