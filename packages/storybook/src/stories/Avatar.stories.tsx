import { Avatar } from '@vite-mf-monorepo/ui'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Avatar> = {
  title: 'Design System/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    src: {
      control: 'text',
    },
    initials: {
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const SAMPLE_AVATAR =
  'https://image.tmdb.org/t/p/w185/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg'

export const Playground: Story = {
  args: {
    src: SAMPLE_AVATAR,
    alt: 'Tom Hanks',
    size: 'md',
  },
  argTypes: {
    src: { table: { disable: true } },
  },
}

export const Showcase: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div className="flex flex-col gap-8">
      {/* Sizes with Image */}
      <section>
        <h3 className="mb-4 text-sm font-semibold text-gray-500">
          Sizes with Image
        </h3>
        <div className="flex items-end gap-4">
          <Avatar src={SAMPLE_AVATAR} alt="XS" size="xs" />
          <Avatar src={SAMPLE_AVATAR} alt="SM" size="sm" />
          <Avatar src={SAMPLE_AVATAR} alt="MD" size="md" />
          <Avatar src={SAMPLE_AVATAR} alt="LG" size="lg" />
          <Avatar src={SAMPLE_AVATAR} alt="XL" size="xl" />
        </div>
      </section>

      {/* Sizes with Initials */}
      <section>
        <h3 className="mb-4 text-sm font-semibold text-gray-500">
          Sizes with Initials
        </h3>
        <div className="flex items-end gap-4">
          <Avatar alt="XS" size="xs" initials="XS" />
          <Avatar alt="SM" size="sm" initials="SM" />
          <Avatar alt="MD" size="md" initials="MD" />
          <Avatar alt="LG" size="lg" initials="LG" />
          <Avatar alt="XL" size="xl" initials="XL" />
        </div>
      </section>

      {/* Sizes with Fallback */}
      <section>
        <h3 className="mb-4 text-sm font-semibold text-gray-500">
          Sizes with Fallback
        </h3>
        <div className="flex items-end gap-4">
          <Avatar alt="XS" size="xs" />
          <Avatar alt="SM" size="sm" />
          <Avatar alt="MD" size="md" />
          <Avatar alt="LG" size="lg" />
          <Avatar alt="XL" size="xl" />
        </div>
      </section>
    </div>
  ),
}

export const CastList: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <Avatar src={SAMPLE_AVATAR} alt="Tom Hanks" size="md" />
        <div>
          <p className="font-medium">Tom Hanks</p>
          <p className="text-sm text-gray-500">Forrest Gump</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Avatar alt="Robin Wright" size="md" initials="RW" />
        <div>
          <p className="font-medium">Robin Wright</p>
          <p className="text-sm text-gray-500">Jenny Curran</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Avatar alt="Unknown Actor" size="md" />
        <div>
          <p className="font-medium">Unknown Actor</p>
          <p className="text-sm text-gray-500">Supporting Role</p>
        </div>
      </div>
    </div>
  ),
}
