import { Then, When } from '@cucumber/cucumber'
import { expect } from '@playwright/test'

import { MediaPage } from '../page-objects/MediaPage'
import { PhotosPage } from '../page-objects/PhotosPage'
import { SearchPage } from '../page-objects/SearchPage'
import { E2EWorld } from '../support/world'

// --- Search ---

When<E2EWorld>(
  'I type {string} in the search field',
  { timeout: 15_000 },
  async function (query: string) {
    const searchPage = new SearchPage(this.page)
    const input = searchPage.getSearchInput()
    await input.waitFor({ state: 'visible', timeout: 10_000 })
    await input.fill(query)
  }
)

When<E2EWorld>(
  'I wait for search results to appear',
  { timeout: 15_000 },
  async function () {
    const searchPage = new SearchPage(this.page)
    // Wait for at least one non-disabled option to appear in the dropdown
    await searchPage
      .getResultItems()
      .first()
      .waitFor({ state: 'visible', timeout: 10_000 })
  }
)

When<E2EWorld>(
  'I select {string} from the search results',
  { timeout: 15_000 },
  async function (label: string) {
    const searchPage = new SearchPage(this.page)
    const item = searchPage.getResultByText(label).first()
    await item.waitFor({ state: 'visible', timeout: 5_000 })
    await item.click()
    await this.page.waitForURL(/\/(movie|tv)\/\d+/, { timeout: 10_000 })
  }
)

Then<E2EWorld>(
  'I am on the movie page for {string}',
  { timeout: 15_000 },
  async function (title: string) {
    await this.waitForRemote('media')
    const mediaPage = new MediaPage(this.page)
    const heading = mediaPage.getTitle()
    await expect(heading).toBeVisible({ timeout: 10_000 })
    await expect(heading).toContainText(title)
  }
)

// --- Photos (prev) ---

When<E2EWorld>(
  'I go to the previous photo',
  { timeout: 15_000 },
  async function () {
    const photosPage = new PhotosPage(this.page)
    const prevButton = photosPage.getPrevButton()
    await prevButton.waitFor({ state: 'visible', timeout: 10_000 })
    await prevButton.click()
  }
)

// --- Close via backdrop ---

When<E2EWorld>(
  'I close the photo viewer by clicking the backdrop',
  { timeout: 15_000 },
  async function () {
    const photosPage = new PhotosPage(this.page)
    const dialog = photosPage.getDialog()
    await dialog.waitFor({ state: 'visible', timeout: 5_000 })
    // Click the dialog element at position (1, 1) — the top-left corner
    // is outside the carousel content, so e.target === dialog triggers onClose.
    await dialog.click({ position: { x: 1, y: 1 } })
    await this.page.waitForURL(/\/(movie|tv)\/\d+$/, { timeout: 10_000 })
  }
)
