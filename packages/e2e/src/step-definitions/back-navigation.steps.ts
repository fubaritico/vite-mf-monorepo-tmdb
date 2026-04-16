import { When } from '@cucumber/cucumber'

import { E2EWorld } from '../support/world'

When<E2EWorld>(
  'I press the browser back button',
  { timeout: 15_000 },
  async function () {
    await this.page.goBack({ waitUntil: 'networkidle' })
  }
)
