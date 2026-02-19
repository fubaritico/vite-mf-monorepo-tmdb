import { Icon, Tabs } from '@vite-mf-monorepo/ui'
import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['underline', 'pills'],
    },
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <Tabs defaultValue="streaming" variant={args.variant}>
      <Tabs.List>
        <Tabs.Trigger value="streaming">Streaming</Tabs.Trigger>
        <Tabs.Trigger value="tv">On TV</Tabs.Trigger>
        <Tabs.Trigger value="rent">For Rent</Tabs.Trigger>
        <Tabs.Trigger value="theaters">In Theaters</Tabs.Trigger>
      </Tabs.List>
    </Tabs>
  ),
  args: {
    variant: 'underline',
  },
}

const ShowcaseComponent = () => {
  const [activeUnderline, setActiveUnderline] = useState('today')
  const [activePills, setActivePills] = useState('streaming')
  const [activeIcons, setActiveIcons] = useState('movies')

  return (
    <div className="ui:space-y-12 ui:w-full ui:max-w-2xl">
      <div>
        <h3 className="ui:text-lg ui:font-semibold ui:mb-4">
          Underline Variant
        </h3>
        <Tabs
          variant="underline"
          value={activeUnderline}
          onValueChange={setActiveUnderline}
        >
          <Tabs.List>
            <Tabs.Trigger value="today">Today</Tabs.Trigger>
            <Tabs.Trigger value="week">This Week</Tabs.Trigger>
          </Tabs.List>
        </Tabs>
        <div className="ui:mt-4 ui:p-4 ui:bg-muted ui:rounded-md">
          <p className="ui:text-sm">
            Active tab: <strong>{activeUnderline}</strong>
          </p>
        </div>
      </div>

      <div>
        <h3 className="ui:text-lg ui:font-semibold ui:mb-4">Pills Variant</h3>
        <Tabs
          variant="pills"
          value={activePills}
          onValueChange={setActivePills}
        >
          <Tabs.List>
            <Tabs.Trigger value="streaming">Streaming</Tabs.Trigger>
            <Tabs.Trigger value="tv">On TV</Tabs.Trigger>
            <Tabs.Trigger value="rent">For Rent</Tabs.Trigger>
            <Tabs.Trigger value="theaters">In Theaters</Tabs.Trigger>
          </Tabs.List>
        </Tabs>
        <div className="ui:mt-4 ui:p-4 ui:bg-muted ui:rounded-md">
          <p className="ui:text-sm">
            Active tab: <strong>{activePills}</strong>
          </p>
        </div>
      </div>

      <div>
        <h3 className="ui:text-lg ui:font-semibold ui:mb-4">With Icons</h3>
        <Tabs
          variant="underline"
          value={activeIcons}
          onValueChange={setActiveIcons}
        >
          <Tabs.List>
            <Tabs.Trigger value="movies" icon={<Icon name="Film" size={16} />}>
              Movies
            </Tabs.Trigger>
            <Tabs.Trigger value="tv" icon={<Icon name="Tv" size={16} />}>
              TV Shows
            </Tabs.Trigger>
          </Tabs.List>
        </Tabs>
        <div className="ui:mt-4 ui:p-4 ui:bg-muted ui:rounded-md">
          <p className="ui:text-sm">
            Active tab: <strong>{activeIcons}</strong>
          </p>
        </div>
      </div>

      <div>
        <h3 className="ui:text-lg ui:font-semibold ui:mb-4">
          With Disabled Tab (Underline)
        </h3>
        <Tabs defaultValue="tab1" variant="underline">
          <Tabs.List>
            <Tabs.Trigger value="tab1">Active Tab</Tabs.Trigger>
            <Tabs.Trigger value="tab2" disabled>
              Disabled Tab
            </Tabs.Trigger>
            <Tabs.Trigger value="tab3">Another Tab</Tabs.Trigger>
          </Tabs.List>
        </Tabs>
      </div>

      <div>
        <h3 className="ui:text-lg ui:font-semibold ui:mb-4">
          With Disabled Tab (Pills)
        </h3>
        <Tabs defaultValue="tab1" variant="pills">
          <Tabs.List>
            <Tabs.Trigger value="tab1">Active Tab</Tabs.Trigger>
            <Tabs.Trigger value="tab2" disabled>
              Disabled Tab
            </Tabs.Trigger>
            <Tabs.Trigger value="tab3">Another Tab</Tabs.Trigger>
          </Tabs.List>
        </Tabs>
      </div>

      <div className="ui:p-4 ui:bg-accent ui:rounded-md">
        <h4 className="ui:font-semibold ui:mb-2">Keyboard Navigation</h4>
        <ul className="ui:text-sm ui:space-y-1">
          <li>
            {'• '}
            <kbd className="ui:px-2 ui:py-1 ui:bg-background ui:rounded ui:text-xs">
              ←
            </kbd>
            {' / '}
            <kbd className="ui:px-2 ui:py-1 ui:bg-background ui:rounded ui:text-xs">
              →
            </kbd>{' '}
            Navigate between tabs
          </li>
          <li>
            {'• '}
            <kbd className="ui:px-2 ui:py-1 ui:bg-background ui:rounded ui:text-xs">
              Home
            </kbd>{' '}
            Go to first tab
          </li>
          <li>
            {'• '}
            <kbd className="ui:px-2 ui:py-1 ui:bg-background ui:rounded ui:text-xs">
              End
            </kbd>{' '}
            Go to last tab
          </li>
        </ul>
      </div>
    </div>
  )
}

export const Showcase: Story = {
  render: () => <ShowcaseComponent />,
}
