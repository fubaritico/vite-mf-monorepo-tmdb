import { Icon } from '@vite-mf-monorepo/ui'

import type { Meta, StoryObj } from '@storybook/react'
import type { IconName } from '@vite-mf-monorepo/ui'

const allIconNames: IconName[] = [
  'ArrowLeft',
  'ArrowRight',
  'ArrowTopRightOnSquare',
  'Bars3',
  'Bookmark',
  'Check',
  'ChevronDown',
  'ChevronLeft',
  'ChevronRight',
  'ChevronUp',
  'EllipsisVertical',
  'ExclamationCircle',
  'ExclamationTriangle',
  'Film',
  'Heart',
  'InformationCircle',
  'Link',
  'MagnifyingGlass',
  'Minus',
  'Play',
  'PlayCircle',
  'Plus',
  'Share',
  'Star',
  'Tv',
  'User',
  'Users',
  'XMark',
]

const meta: Meta<typeof Icon> = {
  title: 'Design System/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: allIconNames,
    },
    size: {
      control: { type: 'number', min: 12, max: 64, step: 4 },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {
    name: 'ArrowRight',
    size: 24,
  },
}

export const Showcase: Story = {
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  render: () => (
    <div className="flex flex-col gap-8">
      {/* All Icons Grid */}
      <section>
        <h3 className="mb-4 text-sm font-semibold text-gray-500">
          Available Icons ({allIconNames.length})
        </h3>
        <div className="grid grid-cols-7 gap-4">
          {allIconNames.map((name) => (
            <div
              key={name}
              className="flex flex-col items-center gap-2 rounded border border-gray-200 p-3"
            >
              <Icon name={name} size={24} />
              <span className="text-center text-xs text-gray-500">{name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Sizes */}
      <section>
        <h3 className="mb-4 text-sm font-semibold text-gray-500">Sizes</h3>
        <div className="flex items-end gap-6">
          <div className="flex flex-col items-center gap-2">
            <Icon name="Star" size={16} />
            <span className="text-xs text-gray-500">16px (micro)</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon name="Star" size={20} />
            <span className="text-xs text-gray-500">20px (mini)</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon name="Star" size={24} />
            <span className="text-xs text-gray-500">24px (outline)</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon name="Star" size={32} />
            <span className="text-xs text-gray-500">32px</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon name="Star" size={48} />
            <span className="text-xs text-gray-500">48px</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon name="Star" size={64} />
            <span className="text-xs text-gray-500">64px</span>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section>
        <h3 className="mb-4 text-sm font-semibold text-gray-500">
          By Category
        </h3>
        <div className="flex flex-col gap-4">
          <div>
            <span className="mb-2 block text-xs text-gray-400">Navigation</span>
            <div className="flex gap-4">
              <Icon name="ArrowLeft" size={24} />
              <Icon name="ArrowRight" size={24} />
              <Icon name="ChevronLeft" size={24} />
              <Icon name="ChevronRight" size={24} />
              <Icon name="ChevronUp" size={24} />
              <Icon name="ChevronDown" size={24} />
            </div>
          </div>
          <div>
            <span className="mb-2 block text-xs text-gray-400">Actions</span>
            <div className="flex gap-4">
              <Icon name="Plus" size={24} />
              <Icon name="Minus" size={24} />
              <Icon name="Check" size={24} />
              <Icon name="XMark" size={24} />
              <Icon name="MagnifyingGlass" size={24} />
              <Icon name="Share" size={24} />
            </div>
          </div>
          <div>
            <span className="mb-2 block text-xs text-gray-400">Media</span>
            <div className="flex gap-4">
              <Icon name="Play" size={24} />
              <Icon name="PlayCircle" size={24} />
              <Icon name="Film" size={24} />
              <Icon name="Tv" size={24} />
              <Icon name="Star" size={24} />
              <Icon name="Heart" size={24} />
              <Icon name="Bookmark" size={24} />
            </div>
          </div>
          <div>
            <span className="mb-2 block text-xs text-gray-400">Status</span>
            <div className="flex gap-4">
              <Icon name="InformationCircle" size={24} />
              <Icon name="ExclamationCircle" size={24} />
              <Icon name="ExclamationTriangle" size={24} />
            </div>
          </div>
        </div>
      </section>
    </div>
  ),
}
