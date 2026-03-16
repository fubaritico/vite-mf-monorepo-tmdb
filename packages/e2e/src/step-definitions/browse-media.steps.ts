import { Then, When } from '@cucumber/cucumber'
import { expect } from '@playwright/test'

import { HomePage } from '../page-objects/HomePage'
import { MediaPage } from '../page-objects/MediaPage'
import { PhotosPage } from '../page-objects/PhotosPage'
import { E2EWorld } from '../support/world'

// --- Home ---

Then<E2EWorld>(
  'I see at least one carousel of posters',
  { timeout: 15_000 },
  async function () {
    const homePage = new HomePage(this.page)
    const items = homePage.getAllCarouselItems()
    await items.first().waitFor({ state: 'visible', timeout: 10_000 })
    const count = await items.count()
    expect(count).toBeGreaterThan(0)
  }
)

Then<E2EWorld>('each carousel has a visible title', async function () {
  const homePage = new HomePage(this.page)
  const titles = homePage.getCarouselTitles()
  const count = await titles.count()
  expect(count).toBeGreaterThan(0)
  for (let i = 0; i < count; i++) {
    await expect(titles.nth(i)).toBeVisible()
  }
})

// --- Navigation ---

When<E2EWorld>(
  'I click on the first poster in a carousel',
  { timeout: 15_000 },
  async function () {
    const homePage = new HomePage(this.page)
    const firstCard = homePage.getFirstCarouselItem()
    await firstCard.waitFor({ state: 'visible', timeout: 10_000 })
    await firstCard.click()
    await this.page.waitForURL(/\/(movie|tv)\/\d+/, { timeout: 10_000 })
  }
)

Then<E2EWorld>('I am on a detail page', { timeout: 15_000 }, async function () {
  await this.waitForRemote('media')
  const url = this.page.url()
  expect(url).toMatch(/\/(movie|tv)\/\d+/)
})

// --- Detail ---

Then<E2EWorld>('the title is visible', async function () {
  const mediaPage = new MediaPage(this.page)
  await expect(mediaPage.getTitle()).toBeVisible()
})

Then<E2EWorld>('the synopsis is visible', async function () {
  const mediaPage = new MediaPage(this.page)
  await expect(mediaPage.getOverview()).toBeVisible()
})

Then<E2EWorld>('the rating is visible', { timeout: 10_000 }, async function () {
  const mediaPage = new MediaPage(this.page)
  await expect(mediaPage.getRating()).toBeVisible({ timeout: 5_000 })
})

// --- Photos ---

When<E2EWorld>(
  'I click on a photo in the photos section',
  { timeout: 15_000 },
  async function () {
    const mediaPage = new MediaPage(this.page)
    await mediaPage.clickFirstPhoto()
    await this.page.waitForURL(/\/(movie|tv)\/\d+\/photos\//, {
      timeout: 10_000,
    })
  }
)

Then<E2EWorld>(
  'the photo viewer is open',
  { timeout: 15_000 },
  async function () {
    // Photos renders inside a <dialog> top layer — the wrapping div is not "visible"
    // in the DOM sense. Wait for the dialog[open] instead of the mf-ready sentinel.
    const photosPage = new PhotosPage(this.page)
    await photosPage.getDialog().waitFor({ state: 'visible', timeout: 10_000 })
  }
)

When<E2EWorld>(
  'I go to the next photo',
  { timeout: 10_000 },
  async function () {
    const photosPage = new PhotosPage(this.page)
    // Store current URL to compare after navigation
    this.previousUrl = photosPage.getCurrentUrl()
    await photosPage.navigateNext()
  }
)

Then<E2EWorld>('a different photo is displayed', async function () {
  const photosPage = new PhotosPage(this.page)
  // URL changes when navigating photos (index segment changes)
  await this.page.waitForURL((url) => url.toString() !== this.previousUrl, {
    timeout: 5_000,
  })
  const currentUrl = photosPage.getCurrentUrl()
  expect(currentUrl).not.toBe(this.previousUrl)
})

When<E2EWorld>(
  'I close the photo viewer',
  { timeout: 10_000 },
  async function () {
    const photosPage = new PhotosPage(this.page)
    await photosPage.close()
    // Wait for navigation back to detail page
    await this.page.waitForURL(/\/(movie|tv)\/\d+$/, { timeout: 10_000 })
  }
)
