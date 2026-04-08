import { Drawer } from '@vite-mf-monorepo/ui'
import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'
import type { DrawerVariant } from '@vite-mf-monorepo/ui'

const meta = {
  title: 'Design System/Drawer',
  component: Drawer,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['light', 'dark'],
    },
    overlay: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>

const PlaygroundComponent = (args: {
  variant?: DrawerVariant
  overlay?: boolean
}) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        className="ui:rounded ui:bg-primary ui:px-4 ui:py-2 ui:text-primary-foreground"
        onClick={() => {
          setOpen(true)
        }}
      >
        Open Drawer
      </button>
      <Drawer
        open={open}
        onClose={() => {
          setOpen(false)
        }}
        variant={args.variant}
        overlay={args.overlay}
      >
        <Drawer.Header>Drawer Title</Drawer.Header>
        <Drawer.Body>
          <p className="ui:text-sm">
            This is the drawer body content. It scrolls when the content
            overflows the max height.
          </p>
        </Drawer.Body>
      </Drawer>
    </>
  )
}

export const Playground: Story = {
  args: {
    open: true,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onClose: () => {},
    variant: 'light',
    overlay: true,
    children: null,
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['light', 'dark'],
    },
    overlay: {
      control: 'boolean',
    },
    open: { table: { disable: true } },
    onClose: { table: { disable: true } },
    children: { table: { disable: true } },
  },
  render: (args) => (
    <PlaygroundComponent variant={args.variant} overlay={args.overlay} />
  ),
}

const ShowcaseComponent = () => {
  const [lightOpen, setLightOpen] = useState(false)
  const [darkOpen, setDarkOpen] = useState(false)
  const [overlayOpen, setOverlayOpen] = useState(false)
  const [scrollOpen, setScrollOpen] = useState(false)

  return (
    <div className="ui:space-y-6" style={{ width: 500 }}>
      <h2 className="ui:text-xl ui:font-bold">Variants</h2>
      <div className="ui:flex ui:gap-4">
        <button
          className="ui:rounded ui:bg-primary ui:px-4 ui:py-2 ui:text-primary-foreground"
          onClick={() => {
            setLightOpen(true)
          }}
        >
          Light
        </button>
        <button
          className="ui:rounded ui:bg-neutral-800 ui:px-4 ui:py-2 ui:text-neutral-200"
          onClick={() => {
            setDarkOpen(true)
          }}
        >
          Dark
        </button>
        <button
          className="ui:rounded ui:bg-primary ui:px-4 ui:py-2 ui:text-primary-foreground"
          onClick={() => {
            setOverlayOpen(true)
          }}
        >
          With Overlay
        </button>
        <button
          className="ui:rounded ui:bg-primary ui:px-4 ui:py-2 ui:text-primary-foreground"
          onClick={() => {
            setScrollOpen(true)
          }}
        >
          Scrollable
        </button>
      </div>

      <Drawer
        open={lightOpen}
        onClose={() => {
          setLightOpen(false)
        }}
      >
        <Drawer.Header>Light Drawer</Drawer.Header>
        <Drawer.Body>
          <p className="ui:text-sm">
            Light variant with no overlay. Press Escape or click the close
            button to dismiss.
          </p>
        </Drawer.Body>
      </Drawer>

      <Drawer
        open={darkOpen}
        onClose={() => {
          setDarkOpen(false)
        }}
        variant="dark"
      >
        <Drawer.Header>Dark Drawer</Drawer.Header>
        <Drawer.Body>
          <p className="ui:text-sm">
            Dark variant using neutral-900 background with light text.
          </p>
        </Drawer.Body>
      </Drawer>

      <Drawer
        open={overlayOpen}
        onClose={() => {
          setOverlayOpen(false)
        }}
        overlay
      >
        <Drawer.Header>With Overlay</Drawer.Header>
        <Drawer.Body>
          <p className="ui:text-sm">
            Click the backdrop overlay or press Escape to close.
          </p>
        </Drawer.Body>
      </Drawer>

      <Drawer
        open={scrollOpen}
        onClose={() => {
          setScrollOpen(false)
        }}
        overlay
        variant="dark"
      >
        <Drawer.Header>Scrollable Content</Drawer.Header>
        <Drawer.Body>
          {Array.from({ length: 20 }, (_, i) => (
            <p
              key={i}
              className="ui:py-2 ui:text-sm ui:border-b ui:border-neutral-700"
            >
              Item {String(i + 1)} — scroll to see more content below
            </p>
          ))}
        </Drawer.Body>
      </Drawer>
    </div>
  )
}

export const Showcase: Story = {
  render: () => <ShowcaseComponent />,
  parameters: {
    controls: { disable: true },
  },
}
