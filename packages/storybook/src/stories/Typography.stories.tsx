import { Typography } from '@vite-mf-monorepo/ui'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Design System/Typography',
  component: Typography,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const AllVariants: Story = {
  render: () => (
    <div className="ui:space-y-8">
      <div>
        <Typography variant="h1">Heading 1</Typography>
        <Typography variant="caption" className="ui:block ui:mt-2">
          variant="h1" - 36px, bold, tight leading
        </Typography>
      </div>

      <div>
        <Typography variant="h2">Heading 2</Typography>
        <Typography variant="caption" className="ui:block ui:mt-2">
          variant="h2" - 30px, bold, tight leading
        </Typography>
      </div>

      <div>
        <Typography variant="h3">Heading 3</Typography>
        <Typography variant="caption" className="ui:block ui:mt-2">
          variant="h3" - 24px, semibold, snug leading
        </Typography>
      </div>

      <div>
        <Typography variant="h4">Heading 4</Typography>
        <Typography variant="caption" className="ui:block ui:mt-2">
          variant="h4" - 20px, semibold, snug leading
        </Typography>
      </div>

      <div>
        <Typography variant="h5">Heading 5</Typography>
        <Typography variant="caption" className="ui:block ui:mt-2">
          variant="h5" - 18px, medium, normal leading
        </Typography>
      </div>

      <div>
        <Typography variant="h6">Heading 6</Typography>
        <Typography variant="caption" className="ui:block ui:mt-2">
          variant="h6" - 16px, medium, normal leading
        </Typography>
      </div>

      <div>
        <Typography variant="body">
          Body text - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
        <Typography variant="caption" className="ui:block ui:mt-2">
          variant="body" - 16px, normal weight, relaxed leading
        </Typography>
      </div>

      <div>
        <Typography variant="body-lg">
          Large body text - Lorem ipsum dolor sit amet, consectetur adipiscing
          elit.
        </Typography>
        <Typography variant="caption" className="ui:block ui:mt-2">
          variant="body-lg" - 18px, normal weight, relaxed leading
        </Typography>
      </div>

      <div>
        <Typography variant="body-sm">
          Small body text - Lorem ipsum dolor sit amet, consectetur adipiscing
          elit.
        </Typography>
        <Typography variant="caption" className="ui:block ui:mt-2">
          variant="body-sm" - 14px, normal weight, relaxed leading
        </Typography>
      </div>

      <div>
        <Typography variant="lead">
          Lead text - This is an introductory paragraph that stands out from
          regular body text.
        </Typography>
        <Typography variant="caption" className="ui:block ui:mt-2">
          variant="lead" - 20px, muted color, relaxed leading
        </Typography>
      </div>

      <div>
        <Typography variant="label">Label text</Typography>
        <Typography variant="caption" className="ui:block ui:mt-2">
          variant="label" - 14px, medium weight (for form labels)
        </Typography>
      </div>

      <div>
        <Typography variant="caption">Caption or helper text</Typography>
        <Typography variant="caption" className="ui:block ui:mt-2">
          variant="caption" - 14px, muted color (for small text)
        </Typography>
      </div>

      <div>
        <Typography variant="muted">
          Muted text - Secondary information
        </Typography>
        <Typography variant="caption" className="ui:block ui:mt-2">
          variant="muted" - 14px, muted color
        </Typography>
      </div>

      <div>
        <Typography variant="blockquote">
          "This is a blockquote. It has a left border and italic styling to
          distinguish it from regular text."
        </Typography>
        <Typography variant="caption" className="ui:block ui:mt-2">
          variant="blockquote" - border-left, italic, muted color
        </Typography>
      </div>
    </div>
  ),
}

export const H1: Story = {
  args: {
    variant: 'h1',
    children: 'The quick brown fox jumps over the lazy dog',
  },
}

export const H2: Story = {
  args: {
    variant: 'h2',
    children: 'The quick brown fox jumps over the lazy dog',
  },
}

export const H3: Story = {
  args: {
    variant: 'h3',
    children: 'The quick brown fox jumps over the lazy dog',
  },
}

export const Body: Story = {
  args: {
    variant: 'body',
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
  },
}

export const WithCustomTag: Story = {
  render: () => (
    <div className="ui:space-y-4">
      <Typography variant="h1" as="p">
        This looks like H1 but is a paragraph tag
      </Typography>
      <Typography variant="caption" className="ui:block">
        Using as="p" to override the default h1 tag
      </Typography>
    </div>
  ),
}

export const WithCustomClasses: Story = {
  render: () => (
    <div className="ui:space-y-4">
      <Typography variant="body" className="ui:text-center ui:text-primary">
        Centered text with primary color
      </Typography>
      <Typography variant="h2" className="ui:underline ui:text-destructive">
        Underlined heading with destructive color
      </Typography>
    </div>
  ),
}

export const Composition: Story = {
  render: () => (
    <div className="ui:space-y-4 ui:max-w-2xl">
      <Typography variant="h1">Article Title</Typography>
      <Typography variant="lead">
        This is a lead paragraph that introduces the article content. It stands
        out from the regular body text.
      </Typography>
      <Typography variant="body">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </Typography>
      <Typography variant="h2">Section Heading</Typography>
      <Typography variant="body">
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Typography>
      <Typography variant="blockquote">
        "This is an important quote that adds context to the article."
      </Typography>
      <Typography variant="muted">Last updated: February 24, 2026</Typography>
    </div>
  ),
}
