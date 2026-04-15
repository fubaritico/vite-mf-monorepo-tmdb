import { Then, When } from '@cucumber/cucumber'
import { expect } from '@playwright/test'

import { SearchPage } from '../page-objects/SearchPage'
import { SearchResultsPage } from '../page-objects/SearchResultsPage'
import { E2EWorld } from '../support/world'

// --- Search submission via Enter ---

When<E2EWorld>(
  'I press Enter in the search field',
  { timeout: 15_000 },
  async function () {
    const searchPage = new SearchPage(this.page)
    const input = searchPage.getSearchInput()
    // Wait for actual results to appear — guarantees the debounced onSearch
    // has fired and searchQuery state is set (aria-expanded alone is not enough
    // because the menu opens immediately while onSearch is still debouncing).
    await searchPage
      .getResultItems()
      .first()
      .waitFor({ state: 'visible', timeout: 10_000 })
    await input.press('Enter')
    await this.page.waitForURL(/\/search\//, { timeout: 10_000 })
  }
)

// --- Search results page assertions ---

Then<E2EWorld>(
  'I am on the search results page for {string}',
  { timeout: 15_000 },
  async function (query: string) {
    await this.waitForRemote('search')
    const url = this.page.url()
    expect(url).toContain(`/search/${encodeURIComponent(query)}`)
  }
)

Then<E2EWorld>(
  'I see the heading {string}',
  { timeout: 15_000 },
  async function (text: string) {
    const resultsPage = new SearchResultsPage(this.page)
    const heading = resultsPage.getHeading()
    await expect(heading).toBeVisible({ timeout: 10_000 })
    await expect(heading).toContainText(text)
  }
)

Then<E2EWorld>(
  'I see the section {string}',
  { timeout: 15_000 },
  async function (title: string) {
    const resultsPage = new SearchResultsPage(this.page)
    const section = resultsPage.getSectionByTitle(title)
    await expect(section).toBeVisible({ timeout: 10_000 })
  }
)

// --- Search bar on results page ---

When<E2EWorld>(
  'I type {string} in the search bar on the results page',
  { timeout: 15_000 },
  async function (query: string) {
    const resultsPage = new SearchResultsPage(this.page)
    const input = resultsPage.getSearchBarInput()
    await input.waitFor({ state: 'visible', timeout: 10_000 })
    await input.clear()
    await input.fill(query)
  }
)

When<E2EWorld>(
  'I submit the search bar',
  { timeout: 15_000 },
  async function () {
    const resultsPage = new SearchResultsPage(this.page)
    await resultsPage.getSearchBarSubmit().click()
    await this.page.waitForURL(/\/search\//, { timeout: 10_000 })
  }
)

// --- Result items ---

Then<E2EWorld>(
  '{string} is in the {string} section',
  { timeout: 15_000 },
  async function (itemText: string, sectionTitle: string) {
    const resultsPage = new SearchResultsPage(this.page)
    const item = resultsPage.getItemInSection(sectionTitle, itemText)
    await expect(item).toBeVisible({ timeout: 10_000 })
  }
)

When<E2EWorld>(
  'I click on {string} in the {string} section',
  { timeout: 15_000 },
  async function (itemText: string, sectionTitle: string) {
    const resultsPage = new SearchResultsPage(this.page)
    const item = resultsPage.getItemInSection(sectionTitle, itemText)
    await item.waitFor({ state: 'visible', timeout: 10_000 })
    await item.click()
    await this.page.waitForURL(/\/(movie|tv)\/\d+/, { timeout: 10_000 })
  }
)
