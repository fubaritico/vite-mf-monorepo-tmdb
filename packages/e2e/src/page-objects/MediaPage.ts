import type { Locator, Page } from '@playwright/test'

export class MediaPage {
  constructor(private page: Page) {}

  async waitForReady(): Promise<void> {
    await this.page.waitForSelector('[data-testid="mf-ready-media"]', {
      timeout: 10_000,
    })
  }

  getTitle(): Locator {
    return this.page
      .locator('[data-testid="mf-ready-media"]')
      .locator('h1')
      .first()
  }

  getOverview(): Locator {
    return this.page
      .locator('[data-testid="mf-ready-media"]')
      .locator('p')
      .first()
  }

  getRating(): Locator {
    return this.page
      .locator('[data-testid="mf-ready-media"]')
      .locator('svg circle')
      .first()
  }

  getFirstPhoto(): Locator {
    return this.page.locator('a[aria-label="View photo 1"]')
  }

  async clickFirstPhoto(): Promise<void> {
    const photo = this.getFirstPhoto()
    await photo.waitFor({ state: 'visible', timeout: 10_000 })
    await photo.click()
  }
}
