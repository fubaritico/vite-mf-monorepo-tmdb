import type { Preview } from '@storybook/react'

import '@vite-mf-monorepo/layouts/styles.css'
import '@vite-mf-monorepo/ui/styles.css'
import '../src/styles.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
