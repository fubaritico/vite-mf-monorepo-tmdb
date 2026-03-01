import { Button, Modal } from '@vite-mf-monorepo/ui'
import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Design System/Modal',
  component: Modal,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    'aria-label': { control: 'text' },
    className: { control: 'text' },
    onClose: { action: 'onClose' },
    children: { control: false },
  },
  args: {
    'aria-label': 'Modal',
    isOpen: false,
    onClose: () => {
      console.warn('Modal closed')
    },
    children: null,
  },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

/** Interactive modal with trigger button and controlled open/close state. */
export const Playground: Story = {
  args: {
    'aria-label': 'Demo modal',
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isOpen, setIsOpen] = useState(args.isOpen)
    return (
      <>
        <Button
          onClick={() => {
            setIsOpen(true)
          }}
        >
          Open Modal
        </Button>
        <Modal
          {...args}
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false)
          }}
        >
          <div className="ui:flex ui:items-center ui:justify-center ui:w-full ui:h-full">
            <div className="ui:bg-white ui:rounded-md ui:p-8 ui:max-w-md ui:w-full ui:mx-4 ui:flex ui:flex-col ui:gap-4">
              <h2 className="ui:text-xl ui:font-semibold">Modal title</h2>
              <p className="ui:text-sm ui:text-gray-600">
                Modal content goes here. Click the backdrop or press ESC to
                close.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsOpen(false)
                }}
              >
                Close
              </Button>
            </div>
          </div>
        </Modal>
      </>
    )
  },
}

/** Full-screen dark overlay — typical lightbox usage pattern. */
export const Lightbox: Story = {
  args: {
    'aria-label': 'Image viewer',
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isOpen, setIsOpen] = useState(args.isOpen)
    return (
      <>
        <Button
          onClick={() => {
            setIsOpen(true)
          }}
        >
          Open Lightbox
        </Button>
        <Modal
          {...args}
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false)
          }}
        >
          <div className="ui:relative ui:flex ui:items-center ui:justify-center ui:w-full ui:h-full">
            <button
              onClick={() => {
                setIsOpen(false)
              }}
              className="ui:absolute ui:top-4 ui:right-4 ui:text-white ui:text-2xl ui:font-bold ui:leading-none ui:z-10 ui:cursor-pointer"
              aria-label="Close"
            >
              ✕
            </button>
            <img
              src="https://placehold.co/900x500/1a1a2e/white?text=Photo+Viewer"
              alt="Placeholder"
              className="ui:max-w-full ui:max-h-[80vh] ui:rounded-lg"
            />
          </div>
        </Modal>
      </>
    )
  },
}
