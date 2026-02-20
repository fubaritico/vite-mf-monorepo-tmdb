import {
  Container,
  Footer,
  Header,
  RootLayout,
  Section,
} from '@vite-mf-monorepo/layouts'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Layout/RootLayout',
  component: RootLayout,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Routes>
          <Route path="*" element={<Story />} />
        </Routes>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof RootLayout>

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

const SamplePage = () => (
  <Container className="ui:py-8">
    <Section title="Welcome" spacing="lg">
      <p className="ui:text-lg ui:text-muted-foreground">
        This is a sample page using the RootLayout component.
      </p>
    </Section>
    <Section title="Content" spacing="lg" variant="muted">
      <p className="ui:text-muted-foreground">
        The RootLayout provides a consistent structure with sticky header and
        footer.
      </p>
    </Section>
  </Container>
)

export const Default: Story = {
  render: () => (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="*" element={<SamplePage />} />
      </Route>
    </Routes>
  ),
}

export const CustomHeader: Story = {
  render: () => (
    <Routes>
      <Route
        element={
          <RootLayout
            header={
              <Header logo={<TMDBLogo />}>
                <nav className="ui:flex ui:gap-6">
                  <a href="#" className="ui:text-white hover:ui:text-primary">
                    Movies
                  </a>
                  <a href="#" className="ui:text-white hover:ui:text-primary">
                    TV Shows
                  </a>
                </nav>
              </Header>
            }
          />
        }
      >
        <Route path="*" element={<SamplePage />} />
      </Route>
    </Routes>
  ),
}

export const CustomFooter: Story = {
  render: () => (
    <Routes>
      <Route
        element={
          <RootLayout
            footer={
              <Footer>
                <div className="ui:flex ui:justify-between ui:items-center">
                  <p className="ui:text-sm ui:text-muted-foreground">
                    © 2026 TMDB Clone
                  </p>
                  <nav className="ui:flex ui:gap-4">
                    <a
                      href="#"
                      className="ui:text-sm ui:text-muted-foreground hover:ui:text-white"
                    >
                      About
                    </a>
                    <a
                      href="#"
                      className="ui:text-sm ui:text-muted-foreground hover:ui:text-white"
                    >
                      Privacy
                    </a>
                  </nav>
                </div>
              </Footer>
            }
          />
        }
      >
        <Route path="*" element={<SamplePage />} />
      </Route>
    </Routes>
  ),
}

export const NoHeader: Story = {
  render: () => (
    <Routes>
      <Route element={<RootLayout hideHeader />}>
        <Route path="*" element={<SamplePage />} />
      </Route>
    </Routes>
  ),
}

export const NoFooter: Story = {
  render: () => (
    <Routes>
      <Route element={<RootLayout hideFooter />}>
        <Route path="*" element={<SamplePage />} />
      </Route>
    </Routes>
  ),
}

export const ShortContent: Story = {
  render: () => (
    <Routes>
      <Route element={<RootLayout />}>
        <Route
          path="*"
          element={
            <Container className="ui:py-8">
              <p className="ui:text-lg">
                Short content - Footer stays at bottom thanks to flex-1 on main
              </p>
            </Container>
          }
        />
      </Route>
    </Routes>
  ),
}

export const LongContent: Story = {
  render: () => (
    <Routes>
      <Route element={<RootLayout />}>
        <Route
          path="*"
          element={
            <Container className="ui:py-8 ui:space-y-4">
              <h1 className="ui:text-3xl ui:font-bold">Long Content</h1>
              {Array.from({ length: 50 }).map((_, i) => (
                <p key={i} className="ui:text-muted-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. The
                  footer is pushed down by the content. Scroll to see the sticky
                  header behavior.
                </p>
              ))}
            </Container>
          }
        />
      </Route>
    </Routes>
  ),
}
