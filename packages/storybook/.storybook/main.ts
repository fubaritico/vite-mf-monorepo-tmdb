import { fileURLToPath } from 'url'

import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx|mdx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  staticDirs: ['../public'],
  viteFinal: async (config) => {
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...config.resolve.alias,
      '@vite-mf-monorepo/ui/styles.css': fileURLToPath(
        new URL('../../../packages/ui/src/styles.css', import.meta.url),
      ),
      '@vite-mf-monorepo/ui': fileURLToPath(
        new URL('../../../packages/ui/src/index.ts', import.meta.url),
      ),
      '@vite-mf-monorepo/home': fileURLToPath(
        new URL('../../../apps/home/src/index.ts', import.meta.url),
      ),
    }
    config.resolve.extensions = [
      '.mjs',
      '.js',
      '.mts',
      '.ts',
      '.jsx',
      '.tsx',
      '.json',
    ]
    return config
  },
}

export default config
