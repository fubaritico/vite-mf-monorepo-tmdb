import { Header } from '@vite-mf-monorepo/layouts'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Layout/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['extended', 'compact'],
      description: 'Header size variant',
    },
    autoCompact: {
      control: 'boolean',
      description: 'Enable automatic transition to compact on scroll',
    },
    scrollThreshold: {
      control: 'number',
      description: 'Scroll threshold in pixels for auto-compact',
    },
  },
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

const TMDBLogo = () => (
  <div className="ui:flex ui:items-center ui:gap-2">
    <div className="ui:w-8 ui:h-8 ui:bg-primary ui:rounded ui:flex ui:items-center ui:justify-center ui:font-bold ui:text-white">
      T
    </div>
    <span className="ui:text-white ui:font-bold ui:text-xl">TMDB</span>
  </div>
)

export const Extended: Story = {
  args: {
    variant: 'extended',
    logo: <TMDBLogo />,
  },
}

export const Compact: Story = {
  args: {
    variant: 'compact',
    logo: <TMDBLogo />,
  },
}

export const WithNavigation: Story = {
  args: {
    variant: 'extended',
    logo: <TMDBLogo />,
    children: (
      <nav className="ui:flex ui:gap-6">
        <a
          href="#"
          className="ui:text-white hover:ui:text-primary ui:transition-colors"
        >
          Movies
        </a>
        <a
          href="#"
          className="ui:text-white hover:ui:text-primary ui:transition-colors"
        >
          TV Shows
        </a>
        <a
          href="#"
          className="ui:text-white hover:ui:text-primary ui:transition-colors"
        >
          People
        </a>
      </nav>
    ),
  },
}

export const AutoCompact: Story = {
  args: {
    variant: 'extended',
    autoCompact: true,
    scrollThreshold: 50,
    logo: <TMDBLogo />,
  },
  render: (args) => (
    <div>
      <Header {...args} />
      <div className="ui:p-8 ui:space-y-4">
        <p className="ui:text-lg ui:font-semibold">
          Scroll down to see the header compact
        </p>
        {Array.from({ length: 50 }).map((_, i) => (
          <p key={i} className="ui:text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scroll to
            see the header transition from extended (80px) to compact (64px).
          </p>
        ))}
      </div>
    </div>
  ),
}
