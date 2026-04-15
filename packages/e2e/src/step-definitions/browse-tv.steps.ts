import { Then, When } from '@cucumber/cucumber'
import { expect } from '@playwright/test'

import { MediaPage } from '../page-objects/MediaPage'
import { E2EWorld } from '../support/world'

// --- Home: Popular section tab + click ---

When<E2EWorld>(
  'I click the {string} tab in the {string} section',
  { timeout: 15_000 },
  async function (tabLabel: string, sectionTitle: string) {
    // Find the section by its h2 heading, then locate the tab within it
    const section = this.page.locator('section', {
      has: this.page.locator('h2', { hasText: sectionTitle }),
    })
    // Scroll the section into view — Popular is often below the fold
    await section.scrollIntoViewIfNeeded({ timeout: 10_000 })
    const tab = section.locator('button[role="tab"]', { hasText: tabLabel })
    await tab.click()
    // Wait for cards in the ACTIVE tab panel (not the hidden one from the previous tab)
    const activePanel = section.locator('[role="tabpanel"]:not([hidden])')
    await activePanel
      .locator('[data-testid^="movie-card-"]')
      .first()
      .waitFor({ state: 'visible', timeout: 10_000 })
    // Store the section for "in that section" steps
    this.currentSection = section
  }
)

When<E2EWorld>(
  'I click the first poster in that section',
  { timeout: 15_000 },
  async function () {
    // Use the section stored by the previous tab-click step
    const activePanel = this.currentSection.locator(
      '[role="tabpanel"]:not([hidden])'
    )
    const firstCard = activePanel
      .locator('[data-testid^="movie-card-"]')
      .first()
    await firstCard.waitFor({ state: 'visible', timeout: 10_000 })
    await firstCard.click()
    await this.page.waitForURL(/\/(movie|tv)\/\d+/, { timeout: 10_000 })
  }
)

// --- URL assertion ---

Then<E2EWorld>(
  'the URL contains {string}',
  { timeout: 15_000 },
  async function (fragment: string) {
    await this.page.waitForURL(`**/*${fragment}*`, { timeout: 10_000 })
  }
)

// --- Media detail sections ---

Then<E2EWorld>(
  'the hero section is visible',
  { timeout: 15_000 },
  async function () {
    const mediaPage = new MediaPage(this.page)
    const title = mediaPage.getTitle()
    await expect(title).toBeVisible({ timeout: 10_000 })
  }
)

Then<E2EWorld>(
  'the synopsis section is visible',
  { timeout: 15_000 },
  async function () {
    const heading = this.page
      .locator('[data-testid="mf-ready-media"]')
      .locator('h2', { hasText: 'Synopsis' })
    await expect(heading).toBeVisible({ timeout: 10_000 })
  }
)

Then<E2EWorld>(
  'the cast section is visible',
  { timeout: 15_000 },
  async function () {
    const heading = this.page
      .locator('[data-testid="mf-ready-media"]')
      .locator('h2', { hasText: 'Cast' })
    await expect(heading).toBeVisible({ timeout: 10_000 })
  }
)
