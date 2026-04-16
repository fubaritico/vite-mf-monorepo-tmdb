import { Given, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'

import { E2EWorld } from '../support/world'

Given<E2EWorld>('I set the viewport to mobile', async function () {
  // iPhone 12 Pro dimensions
  await this.page.setViewportSize({ width: 390, height: 844 })
})

Then<E2EWorld>('the header is visible', { timeout: 15_000 }, async function () {
  const header = this.page.locator('header').first()
  await expect(header).toBeVisible({ timeout: 10_000 })
})

Then<E2EWorld>(
  'carousel navigation arrows are hidden',
  { timeout: 10_000 },
  async function () {
    // On mobile, carousel nav buttons should not be visible
    const navButtons = this.page.locator(
      'button[aria-label="Previous"], button[aria-label="Next"]'
    )
    const count = await navButtons.count()
    for (let i = 0; i < count; i++) {
      await expect(navButtons.nth(i)).not.toBeVisible()
    }
  }
)
