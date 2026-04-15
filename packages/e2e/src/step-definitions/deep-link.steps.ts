import { Given, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'

import { SearchResultsPage } from '../page-objects/SearchResultsPage'
import { E2EWorld } from '../support/world'

const BASE_URL = process.env.E2E_BASE_URL ?? 'http://localhost:3000'

Given<E2EWorld>(
  'I navigate directly to {string}',
  { timeout: 15_000 },
  async function (path: string) {
    await this.page.goto(`${BASE_URL}${path}`, { waitUntil: 'networkidle' })
  }
)

Then<E2EWorld>(
  'the search remote is loaded',
  { timeout: 15_000 },
  async function () {
    await this.waitForRemote('search')
  }
)

Then<E2EWorld>('I see search results', { timeout: 15_000 }, async function () {
  const resultsPage = new SearchResultsPage(this.page)
  const heading = resultsPage.getHeading()
  await expect(heading).toBeVisible({ timeout: 10_000 })
})
