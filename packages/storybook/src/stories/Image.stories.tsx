import { Image } from '@vite-mf-monorepo/ui'
import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

const IMAGE_OPTIONS = {
  'Poster - Deadpool & Wolverine (w500)':
    'https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
  'Poster - Deadpool & Wolverine (original ~5MB)':
    'https://image.tmdb.org/t/p/original/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
  'Poster - Inside Out 2':
    'https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg',
  'Backdrop - Inside Out 2 (w1280)':
    'https://image.tmdb.org/t/p/w1280/stKGOm8UyhuLPR9sZLjs5AkmncA.jpg',
  'Backdrop - Inside Out 2 (original ~10MB)':
    'https://image.tmdb.org/t/p/original/stKGOm8UyhuLPR9sZLjs5AkmncA.jpg',
  'Broken Image': 'https://example.com/broken-image.jpg',
} as const

const SAMPLE_POSTER = IMAGE_OPTIONS['Poster - Deadpool & Wolverine (w500)']
const SAMPLE_POSTER_HEAVY =
  IMAGE_OPTIONS['Poster - Deadpool & Wolverine (original ~5MB)']
const SAMPLE_BACKDROP = IMAGE_OPTIONS['Backdrop - Inside Out 2 (w1280)']
const BROKEN_IMAGE = IMAGE_OPTIONS['Broken Image']

const meta: Meta<typeof Image> = {
  title: 'Components/Image',
  component: Image,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'select',
      options: Object.keys(IMAGE_OPTIONS),
      mapping: IMAGE_OPTIONS,
      description: 'Image source URL',
    },
    alt: {
      control: 'text',
      description: 'Alt text for accessibility',
    },
    autoBlur: {
      control: 'boolean',
      description: 'Auto-generate blur placeholder using Canvas API',
    },
    blurSize: {
      control: { type: 'range', min: 4, max: 32, step: 4 },
      description: 'Size of blur canvas (smaller = more blur)',
    },
    blurQuality: {
      control: { type: 'range', min: 0.1, max: 1, step: 0.1 },
      description: 'JPEG quality for blur (0-1)',
    },
    aspectRatio: {
      control: 'select',
      options: ['2/3', '16/9', '1/1', '4/3', '3/2'],
      description: 'Aspect ratio of the image container',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 300 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {
    src: SAMPLE_POSTER,
    alt: 'Movie poster',
    aspectRatio: '2/3',
  },
}

export const WithAutoBlur: Story = {
  args: {
    src: SAMPLE_POSTER,
    autoBlur: true,
    alt: 'Movie poster with auto blur placeholder',
    aspectRatio: '2/3',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Uses autoBlur to generate a blurred placeholder via Canvas API. Works with any image URL.',
      },
    },
  },
}

export const Backdrop: Story = {
  args: {
    src: SAMPLE_BACKDROP,
    autoBlur: true,
    alt: 'Movie backdrop',
    aspectRatio: '16/9',
  },
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100%', maxWidth: 800 }}>
        <Story />
      </div>
    ),
  ],
}

export const ErrorState: Story = {
  args: {
    src: BROKEN_IMAGE,
    alt: 'Broken image',
    aspectRatio: '2/3',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the default fallback when the image fails to load.',
      },
    },
  },
}

export const CustomFallback: Story = {
  args: {
    src: BROKEN_IMAGE,
    alt: 'Broken image with custom fallback',
    aspectRatio: '2/3',
    fallback: (
      <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-500">
        <span>No Image</span>
      </div>
    ),
  },
}

const BlurDemoComponent = () => {
  const [key, setKey] = useState(0)
  const [useHeavyImage, setUseHeavyImage] = useState(true)

  const handleReload = () => {
    setKey((prev) => prev + 1)
  }

  const baseUrl = useHeavyImage ? SAMPLE_POSTER_HEAVY : SAMPLE_POSTER
  const srcWithCacheBuster = `${baseUrl}?cb=${String(key)}`

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-gray-500">
        Click &quot;Reload&quot; to see the blur placeholder effect while the
        image loads.
      </p>
      <p className="text-xs text-gray-400">
        Using {useHeavyImage ? 'original (~5MB)' : 'w500 (~100KB)'} image.
        Enable throttling for better demo.
      </p>
      <div className="flex gap-2">
        <button
          onClick={handleReload}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          type="button"
        >
          Reload Image
        </button>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={useHeavyImage}
            onChange={(e) => {
              setUseHeavyImage(e.target.checked)
            }}
          />
          <span className="text-sm">Use heavy image (~5MB)</span>
        </label>
      </div>
      <div className="w-48">
        <Image
          key={key}
          src={srcWithCacheBuster}
          autoBlur
          blurSize={8}
          alt="Blur demo"
          aspectRatio="2/3"
        />
      </div>
    </div>
  )
}

export const BlurDemo: Story = {
  parameters: {
    layout: 'centered',
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Interactive demo to see the blur placeholder effect. Use DevTools Network throttling for a better demo.',
      },
    },
  },
  render: () => <BlurDemoComponent />,
}

export const Showcase: Story = {
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  render: () => (
    <div className="flex flex-col gap-8">
      {/* Aspect Ratios */}
      <section>
        <h3 className="mb-4 text-sm font-semibold text-gray-500">
          Aspect Ratios
        </h3>
        <div className="flex flex-wrap items-start gap-4">
          <div className="w-32">
            <Image src={SAMPLE_POSTER} alt="2/3 ratio" aspectRatio="2/3" />
            <p className="mt-1 text-center text-xs text-gray-500">
              2/3 (Poster)
            </p>
          </div>
          <div className="w-48">
            <Image src={SAMPLE_BACKDROP} alt="16/9 ratio" aspectRatio="16/9" />
            <p className="mt-1 text-center text-xs text-gray-500">
              16/9 (Backdrop)
            </p>
          </div>
          <div className="w-32">
            <Image src={SAMPLE_POSTER} alt="1/1 ratio" aspectRatio="1/1" />
            <p className="mt-1 text-center text-xs text-gray-500">
              1/1 (Square)
            </p>
          </div>
          <div className="w-40">
            <Image src={SAMPLE_BACKDROP} alt="4/3 ratio" aspectRatio="4/3" />
            <p className="mt-1 text-center text-xs text-gray-500">4/3</p>
          </div>
        </div>
      </section>

      {/* With Auto Blur */}
      <section>
        <h3 className="mb-4 text-sm font-semibold text-gray-500">
          With Auto Blur (Canvas API)
        </h3>
        <div className="flex gap-4">
          <div className="w-40">
            <Image
              src={SAMPLE_POSTER}
              autoBlur
              alt="With auto blur"
              aspectRatio="2/3"
            />
            <p className="mt-1 text-center text-xs text-gray-500">
              Poster with autoBlur
            </p>
          </div>
          <div className="w-64">
            <Image
              src={SAMPLE_BACKDROP}
              autoBlur
              alt="Backdrop with auto blur"
              aspectRatio="16/9"
            />
            <p className="mt-1 text-center text-xs text-gray-500">
              Backdrop with autoBlur
            </p>
          </div>
        </div>
      </section>

      {/* Error States */}
      <section>
        <h3 className="mb-4 text-sm font-semibold text-gray-500">
          Error States
        </h3>
        <div className="flex gap-4">
          <div className="w-32">
            <Image
              src={BROKEN_IMAGE}
              alt="Default fallback"
              aspectRatio="2/3"
            />
            <p className="mt-1 text-center text-xs text-gray-500">
              Default fallback
            </p>
          </div>
          <div className="w-32">
            <Image
              src={BROKEN_IMAGE}
              alt="Custom fallback"
              aspectRatio="2/3"
              fallback={
                <div className="flex h-full w-full items-center justify-center bg-amber-100 text-amber-600">
                  <span className="text-sm">🎬</span>
                </div>
              }
            />
            <p className="mt-1 text-center text-xs text-gray-500">
              Custom fallback
            </p>
          </div>
        </div>
      </section>
    </div>
  ),
}
