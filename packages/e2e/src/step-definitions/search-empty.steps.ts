import { Then, When } from '@cucumber/cucumber'
import { expect } from '@playwright/test'

import { SearchPage } from '../page-objects/SearchPage'
import { E2EWorld } from '../support/world'

/**
 * Press Enter in the search field without waiting for typeahead results.
 * Used for queries that return no results (e.g. gibberish).
 */
When<E2EWorld>(
  'I submit the search directly',
  { timeout: 15_000 },
  async function () {
    const searchPage = new SearchPage(this.page)
    const input = searchPage.getSearchInput()
    // Wait for debounce to fire (searchQuery state must be set before Enter works)
    await this.page.waitForTimeout(500)
    await input.press('Enter')
    await this.page.waitForURL(/\/search\//, { timeout: 10_000 })
  }
)

Then<E2EWorld>(
  'I see no result sections',
  { timeout: 15_000 },
  async function () {
    // There should be no h2 section headings (Movies, TV Shows, Actors, Directors)
    const sections = this.page
      .locator('[data-testid="mf-ready-search"]')
      .locator('h2')
    await expect(sections).toHaveCount(0, { timeout: 10_000 })
  }
)
