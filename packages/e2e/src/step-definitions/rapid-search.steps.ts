import { Then, When } from '@cucumber/cucumber'
import { expect } from '@playwright/test'

import { SearchPage } from '../page-objects/SearchPage'
import { E2EWorld } from '../support/world'

When<E2EWorld>(
  'I type {string} rapidly in the search field',
  { timeout: 15_000 },
  async function (query: string) {
    const searchPage = new SearchPage(this.page)
    const input = searchPage.getSearchInput()
    await input.waitFor({ state: 'visible', timeout: 10_000 })
    // Type very fast — no delay between keystrokes to stress the debounce
    await input.pressSequentially(query, { delay: 10 })
  }
)

Then<E2EWorld>(
  'I see at least one search result',
  { timeout: 15_000 },
  async function () {
    const searchPage = new SearchPage(this.page)
    const items = searchPage.getResultItems()
    await items.first().waitFor({ state: 'visible', timeout: 10_000 })
    const count = await items.count()
    expect(count).toBeGreaterThan(0)
  }
)

Then<E2EWorld>(
  'the page does not have any errors',
  { timeout: 5_000 },
  async function () {
    // Check that no error overlay or crash message is visible
    const errorOverlay = this.page.locator('vite-error-overlay')
    await expect(errorOverlay).toHaveCount(0)
    // Check no React error boundary rendered (generic fallback text)
    const errorBoundary = this.page.locator('[data-testid^="mf-error-"]')
    await expect(errorBoundary).toHaveCount(0)
  }
)
