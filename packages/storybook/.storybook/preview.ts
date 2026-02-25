import { initialize, mswLoader } from 'msw-storybook-addon'

import type { Preview } from '@storybook/react'

import { withQueryClient } from './decorators/withQueryClient'
import { withRouter } from './decorators/withRouter'

import '@vite-mf-monorepo/layouts/styles.css'
import '@vite-mf-monorepo/ui/styles.css'
import '../src/styles.css'
import '../../../apps/home/src/remote.css'
import '../../../apps/movie/src/remote.css'

// Initialize MSW
initialize({
  onUnhandledRequest: 'bypass',
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  loaders: [mswLoader],
  decorators: [withQueryClient, withRouter],
}

export default preview
