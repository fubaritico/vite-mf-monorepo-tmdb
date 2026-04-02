import { Input } from '@vite-mf-monorepo/ui'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Design System/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    inputSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    placeholder: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {
    placeholder: 'Search movies, TV shows, people...',
    inputSize: 'md',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
}

const ShowcaseComponent = () => (
  <div className="ui:space-y-8 ui:w-full" style={{ maxWidth: 400 }}>
    <div>
      <h3 className="ui:text-lg ui:font-semibold ui:mb-4">Sizes</h3>
      <div className="ui:space-y-3">
        <Input inputSize="sm" placeholder="Small input" />
        <Input inputSize="md" placeholder="Medium input (default)" />
        <Input inputSize="lg" placeholder="Large input" />
      </div>
    </div>

    <div>
      <h3 className="ui:text-lg ui:font-semibold ui:mb-4">States</h3>
      <div className="ui:space-y-3">
        <Input placeholder="Default" />
        <Input placeholder="Disabled" disabled />
        <Input defaultValue="With value" />
      </div>
    </div>

    <div>
      <h3 className="ui:text-lg ui:font-semibold ui:mb-4">With Icon</h3>
      <div className="ui:space-y-3">
        <Input
          inputSize="sm"
          icon="MagnifyingGlass"
          placeholder="Search (sm)"
        />
        <Input
          inputSize="md"
          icon="MagnifyingGlass"
          placeholder="Search (md)"
        />
        <Input
          inputSize="lg"
          icon="MagnifyingGlass"
          placeholder="Search (lg)"
        />
      </div>
    </div>

    <div>
      <h3 className="ui:text-lg ui:font-semibold ui:mb-4">With Label</h3>
      <div className="ui:space-y-3">
        <Input label="Email" type="email" placeholder="you@example.com" />
        <Input
          label="Search"
          icon="MagnifyingGlass"
          placeholder="Search movies..."
        />
      </div>
    </div>

    <div>
      <h3 className="ui:text-lg ui:font-semibold ui:mb-4">With Message</h3>
      <div className="ui:space-y-3">
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          message="We'll never share your email."
          messageType="info"
        />
        <Input
          label="Username"
          defaultValue="ab"
          message="Username must be at least 3 characters."
          messageType="error"
        />
      </div>
    </div>
  </div>
)

export const Showcase: Story = {
  render: () => <ShowcaseComponent />,
  parameters: {
    controls: { disable: true },
  },
}
