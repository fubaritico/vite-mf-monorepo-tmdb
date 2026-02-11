import { fileURLToPath } from 'url'

import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx|mdx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...config.resolve.alias,
      '@vite-mf-monorepo/ui/styles.css': fileURLToPath(
        new URL('../../ui/src/styles.css', import.meta.url),
      ),
      '@vite-mf-monorepo/ui': fileURLToPath(
        new URL('../../ui/src', import.meta.url),
      ),
    }
    return config
  },
}

export default config
