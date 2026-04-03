import { Menu } from '@vite-mf-monorepo/ui'
import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'
import type { MenuVariant } from '@vite-mf-monorepo/ui'

const meta = {
  title: 'Design System/Menu',
  component: Menu,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    selectedValue: {
      control: 'select',
      options: [undefined, 'apple', 'banana', 'cherry', 'grape', 'mango'],
    },
    variant: {
      control: 'select',
      options: ['light', 'dark'],
    },
  },
} satisfies Meta<typeof Menu>

export default meta
type Story = StoryObj<typeof meta>

const PlaygroundComponent = (args: {
  selectedValue?: string
  variant?: MenuVariant
  disabled?: boolean
}) => {
  const [selected, setSelected] = useState(args.selectedValue)
  return (
    <div style={{ width: 260 }}>
      <Menu
        variant={args.variant}
        selectedValue={selected}
        onSelect={(value) => {
          setSelected(value)
        }}
      >
        <Menu.Item index={0} value="apple">
          Apple
        </Menu.Item>
        <Menu.Item index={1} value="banana" disabled={args.disabled}>
          Banana
        </Menu.Item>
        <Menu.Item index={2} value="cherry">
          Cherry
        </Menu.Item>
        <Menu.Item index={3} value="grape">
          Grape
        </Menu.Item>
        <Menu.Item index={4} value="mango">
          Mango
        </Menu.Item>
      </Menu>
    </div>
  )
}

export const Playground: Story = {
  args: {
    selectedValue: undefined,
    variant: 'light',
  },
  argTypes: {
    selectedValue: {
      control: 'inline-radio',
      options: ['none', 'apple', 'banana', 'cherry', 'grape', 'mango'],
      mapping: { none: undefined },
    },
    variant: {
      control: 'inline-radio',
      options: ['light', 'dark'],
    },
  },
  render: (args) => (
    <PlaygroundComponent
      selectedValue={args.selectedValue}
      variant={args.variant}
    />
  ),
}

const ShowcaseComponent = () => {
  const [lightSelected, setLightSelected] = useState('banana')
  const [darkSelected, setDarkSelected] = useState('banana')

  return (
    <div className="ui:space-y-10" style={{ width: 800 }}>
      {/* Light row */}
      <div>
        <h2 className="ui:text-xl ui:font-bold ui:mb-4">Light</h2>
        <div className="ui:grid ui:grid-cols-3 ui:gap-6">
          <div>
            <h3 className="ui:text-sm ui:font-semibold ui:mb-2">Basic</h3>
            <Menu>
              <Menu.Item index={0} value="apple">
                Apple
              </Menu.Item>
              <Menu.Item index={1} value="banana">
                Banana
              </Menu.Item>
              <Menu.Item index={2} value="cherry">
                Cherry
              </Menu.Item>
            </Menu>
          </div>
          <div>
            <h3 className="ui:text-sm ui:font-semibold ui:mb-2">
              With Selection
            </h3>
            <Menu
              selectedValue={lightSelected}
              onSelect={(value) => {
                setLightSelected(value)
              }}
            >
              <Menu.Item index={0} value="apple">
                Apple
              </Menu.Item>
              <Menu.Item index={1} value="banana">
                Banana
              </Menu.Item>
              <Menu.Item index={2} value="cherry">
                Cherry
              </Menu.Item>
            </Menu>
          </div>
          <div>
            <h3 className="ui:text-sm ui:font-semibold ui:mb-2">Disabled</h3>
            <Menu>
              <Menu.Item index={0} value="apple">
                Apple
              </Menu.Item>
              <Menu.Item index={1} value="banana" disabled>
                Banana (disabled)
              </Menu.Item>
              <Menu.Item index={2} value="cherry">
                Cherry
              </Menu.Item>
              <Menu.Item index={3} value="grape" disabled>
                Grape (disabled)
              </Menu.Item>
              <Menu.Item index={4} value="mango">
                Mango
              </Menu.Item>
            </Menu>
          </div>
        </div>
      </div>

      {/* Dark row */}
      <div>
        <h2 className="ui:text-xl ui:font-bold ui:mb-4">Dark</h2>
        <div className="ui:grid ui:grid-cols-3 ui:gap-6">
          <div>
            <h3 className="ui:text-sm ui:font-semibold ui:mb-2">Basic</h3>
            <Menu variant="dark">
              <Menu.Item index={0} value="apple">
                Apple
              </Menu.Item>
              <Menu.Item index={1} value="banana">
                Banana
              </Menu.Item>
              <Menu.Item index={2} value="cherry">
                Cherry
              </Menu.Item>
            </Menu>
          </div>
          <div>
            <h3 className="ui:text-sm ui:font-semibold ui:mb-2">
              With Selection
            </h3>
            <Menu
              variant="dark"
              selectedValue={darkSelected}
              onSelect={(value) => {
                setDarkSelected(value)
              }}
            >
              <Menu.Item index={0} value="apple">
                Apple
              </Menu.Item>
              <Menu.Item index={1} value="banana">
                Banana
              </Menu.Item>
              <Menu.Item index={2} value="cherry">
                Cherry
              </Menu.Item>
            </Menu>
          </div>
          <div>
            <h3 className="ui:text-sm ui:font-semibold ui:mb-2">Disabled</h3>
            <Menu variant="dark">
              <Menu.Item index={0} value="apple">
                Apple
              </Menu.Item>
              <Menu.Item index={1} value="banana" disabled>
                Banana (disabled)
              </Menu.Item>
              <Menu.Item index={2} value="cherry">
                Cherry
              </Menu.Item>
              <Menu.Item index={3} value="grape" disabled>
                Grape (disabled)
              </Menu.Item>
              <Menu.Item index={4} value="mango">
                Mango
              </Menu.Item>
            </Menu>
          </div>
        </div>
      </div>

      {/* Extras row */}
      <div>
        <h2 className="ui:text-xl ui:font-bold ui:mb-4">Extras</h2>
        <div className="ui:grid ui:grid-cols-3 ui:gap-6">
          <div>
            <h3 className="ui:text-sm ui:font-semibold ui:mb-2">Scrollable</h3>
            <Menu>
              {Array.from({ length: 15 }, (_, i) => (
                <Menu.Item key={i} index={i} value={`item-${String(i)}`}>
                  Item {String(i + 1)}
                </Menu.Item>
              ))}
            </Menu>
          </div>
          <div>
            <h3 className="ui:text-sm ui:font-semibold ui:mb-2">
              Rich Content
            </h3>
            <Menu>
              <Menu.Item index={0} value="profile">
                <div className="ui:flex ui:items-center ui:gap-3">
                  <div className="ui:h-8 ui:w-8 ui:rounded-full ui:bg-primary/20" />
                  <div>
                    <div className="ui:font-medium">Profile</div>
                    <div className="ui:text-xs ui:text-muted-foreground">
                      View your profile
                    </div>
                  </div>
                </div>
              </Menu.Item>
              <Menu.Item index={1} value="settings">
                <div className="ui:flex ui:items-center ui:gap-3">
                  <div className="ui:h-8 ui:w-8 ui:rounded-full ui:bg-primary/20" />
                  <div>
                    <div className="ui:font-medium">Settings</div>
                    <div className="ui:text-xs ui:text-muted-foreground">
                      Manage preferences
                    </div>
                  </div>
                </div>
              </Menu.Item>
              <Menu.Item index={2} value="logout" disabled>
                <div className="ui:flex ui:items-center ui:gap-3">
                  <div className="ui:h-8 ui:w-8 ui:rounded-full ui:bg-destructive/20" />
                  <div>
                    <div className="ui:font-medium">Logout</div>
                    <div className="ui:text-xs ui:text-muted-foreground">
                      Sign out (disabled)
                    </div>
                  </div>
                </div>
              </Menu.Item>
            </Menu>
          </div>
          <div>
            <h3 className="ui:text-sm ui:font-semibold ui:mb-2">
              Dark Rich Content
            </h3>
            <Menu variant="dark">
              <Menu.Item index={0} value="profile">
                <div className="ui:flex ui:items-center ui:gap-3">
                  <div className="ui:h-8 ui:w-8 ui:rounded-full ui:bg-primary/20" />
                  <div>
                    <div className="ui:font-medium">Profile</div>
                    <div className="ui:text-xs ui:text-neutral-400">
                      View your profile
                    </div>
                  </div>
                </div>
              </Menu.Item>
              <Menu.Item index={1} value="settings">
                <div className="ui:flex ui:items-center ui:gap-3">
                  <div className="ui:h-8 ui:w-8 ui:rounded-full ui:bg-primary/20" />
                  <div>
                    <div className="ui:font-medium">Settings</div>
                    <div className="ui:text-xs ui:text-neutral-400">
                      Manage preferences
                    </div>
                  </div>
                </div>
              </Menu.Item>
              <Menu.Item index={2} value="logout" disabled>
                <div className="ui:flex ui:items-center ui:gap-3">
                  <div className="ui:h-8 ui:w-8 ui:rounded-full ui:bg-destructive/20" />
                  <div>
                    <div className="ui:font-medium">Logout</div>
                    <div className="ui:text-xs ui:text-neutral-400">
                      Sign out (disabled)
                    </div>
                  </div>
                </div>
              </Menu.Item>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Showcase: Story = {
  render: () => <ShowcaseComponent />,
  parameters: {
    controls: { disable: true },
  },
}
