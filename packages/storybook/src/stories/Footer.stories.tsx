import { Footer } from '@vite-mf-monorepo/layouts'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Layout/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Footer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <div className="ui:text-center">
        <p className="ui:text-sm ui:text-muted-foreground">
          © 2026 TMDB Clone. All rights reserved.
        </p>
      </div>
    ),
  },
}

export const WithLinks: Story = {
  args: {
    children: (
      <div className="ui:flex ui:flex-col md:ui:flex-row ui:justify-between ui:items-center ui:gap-4">
        <div>
          <p className="ui:text-sm ui:text-muted-foreground">
            © 2026 TMDB Clone. All rights reserved.
          </p>
        </div>
        <nav className="ui:flex ui:gap-6">
          <a
            href="#"
            className="ui:text-sm ui:text-muted-foreground hover:ui:text-white ui:transition-colors"
          >
            About
          </a>
          <a
            href="#"
            className="ui:text-sm ui:text-muted-foreground hover:ui:text-white ui:transition-colors"
          >
            Privacy
          </a>
          <a
            href="#"
            className="ui:text-sm ui:text-muted-foreground hover:ui:text-white ui:transition-colors"
          >
            Terms
          </a>
          <a
            href="#"
            className="ui:text-sm ui:text-muted-foreground hover:ui:text-white ui:transition-colors"
          >
            Contact
          </a>
        </nav>
      </div>
    ),
  },
}

export const WithSocialLinks: Story = {
  args: {
    children: (
      <div className="ui:space-y-4">
        <div className="ui:flex ui:justify-center ui:gap-4">
          <a
            href="#"
            className="ui:text-muted-foreground hover:ui:text-white ui:transition-colors"
          >
            Twitter
          </a>
          <a
            href="#"
            className="ui:text-muted-foreground hover:ui:text-white ui:transition-colors"
          >
            Facebook
          </a>
          <a
            href="#"
            className="ui:text-muted-foreground hover:ui:text-white ui:transition-colors"
          >
            Instagram
          </a>
        </div>
        <div className="ui:text-center">
          <p className="ui:text-sm ui:text-muted-foreground">
            © 2026 TMDB Clone. All rights reserved.
          </p>
        </div>
      </div>
    ),
  },
}

export const MultiColumn: Story = {
  args: {
    children: (
      <div className="ui:grid ui:grid-cols-1 md:ui:grid-cols-4 ui:gap-8">
        <div>
          <h3 className="ui:font-semibold ui:mb-4">About</h3>
          <ul className="ui:space-y-2">
            <li>
              <a
                href="#"
                className="ui:text-sm ui:text-muted-foreground hover:ui:text-white ui:transition-colors"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="ui:text-sm ui:text-muted-foreground hover:ui:text-white ui:transition-colors"
              >
                Careers
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="ui:font-semibold ui:mb-4">Support</h3>
          <ul className="ui:space-y-2">
            <li>
              <a
                href="#"
                className="ui:text-sm ui:text-muted-foreground hover:ui:text-white ui:transition-colors"
              >
                Help Center
              </a>
            </li>
            <li>
              <a
                href="#"
                className="ui:text-sm ui:text-muted-foreground hover:ui:text-white ui:transition-colors"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="ui:font-semibold ui:mb-4">Legal</h3>
          <ul className="ui:space-y-2">
            <li>
              <a
                href="#"
                className="ui:text-sm ui:text-muted-foreground hover:ui:text-white ui:transition-colors"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="ui:text-sm ui:text-muted-foreground hover:ui:text-white ui:transition-colors"
              >
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="ui:font-semibold ui:mb-4">Follow Us</h3>
          <ul className="ui:space-y-2">
            <li>
              <a
                href="#"
                className="ui:text-sm ui:text-muted-foreground hover:ui:text-white ui:transition-colors"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href="#"
                className="ui:text-sm ui:text-muted-foreground hover:ui:text-white ui:transition-colors"
              >
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>
    ),
  },
}
