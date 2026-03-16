import { Given, Then, When } from '@cucumber/cucumber'

import { E2EWorld } from '../support/world'

const BASE_URL = process.env.E2E_BASE_URL ?? 'http://localhost:3000'

Given<E2EWorld>('I open the application', async function () {
  await this.page.goto(BASE_URL, { waitUntil: 'networkidle' })
})

Then<E2EWorld>(
  'the home page is visible',
  { timeout: 15_000 },
  async function () {
    await this.waitForRemote('home')
  }
)

Then<E2EWorld>('no remote is in error', async function () {
  const remotes = ['home', 'media', 'photos']
  for (const remote of remotes) {
    const errorSelector = `[data-testid="mf-error-${remote}"]`
    const errorElement = await this.page.$(errorSelector)
    if (errorElement) {
      throw new Error(
        `Module Federation remote "${remote}" is in error state (found ${errorSelector})`
      )
    }
  }
})

When<E2EWorld>(
  'I navigate to the detail page',
  { timeout: 15_000 },
  async function () {
    // Click the first movie card on the home page (never hardcode TMDB IDs)
    const firstCard = this.page.locator('[data-testid^="movie-card-"]').first()
    await firstCard.waitFor({ state: 'visible', timeout: 10_000 })
    await firstCard.click()
    await this.page.waitForURL(/\/(movie|tv)\/\d+/, { timeout: 10_000 })
  }
)

Then<E2EWorld>(
  'the media remote is loaded',
  { timeout: 15_000 },
  async function () {
    await this.waitForRemote('media')
  }
)
