import { Talent } from '@vite-mf-monorepo/ui'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Design System/Talent',
  component: Talent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Talent>

export default meta
type Story = StoryObj<typeof meta>

export const VerticalWithImage: Story = {
  args: {
    name: 'Frank Darabont',
    role: 'Director',
    imageSrc: 'https://image.tmdb.org/t/p/w185/7LqmE3p1XTwCdNCOmBxovq210Qk.jpg',
    variant: 'vertical',
  },
}

export const VerticalWithoutImage: Story = {
  args: {
    name: 'Christopher Nolan',
    role: 'Screenplay',
    variant: 'vertical',
  },
}

export const HorizontalWithImage: Story = {
  args: {
    name: 'Frank Darabont',
    role: 'Director',
    imageSrc: 'https://image.tmdb.org/t/p/w185/7LqmE3p1XTwCdNCOmBxovq210Qk.jpg',
    variant: 'horizontal',
  },
}

export const HorizontalWithoutImage: Story = {
  args: {
    name: 'Christopher Nolan',
    role: 'Screenplay',
    variant: 'horizontal',
  },
}

export const LongNames: Story = {
  args: {
    name: 'Jean-Pierre Jeunet',
    role: 'Director & Screenplay',
    variant: 'vertical',
  },
}
