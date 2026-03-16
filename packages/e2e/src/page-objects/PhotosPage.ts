import type { Locator, Page } from '@playwright/test'

export class PhotosPage {
  constructor(private page: Page) {}

  async waitForReady(): Promise<void> {
    await this.page.waitForSelector('[data-testid="mf-ready-photos"]', {
      timeout: 10_000,
    })
  }

  getDialog(): Locator {
    return this.page.locator('dialog[open]')
  }

  getCloseButton(): Locator {
    return this.getDialog().locator('button[aria-label="Close"]')
  }

  getNextButton(): Locator {
    return this.getDialog().locator('button[aria-label="Next"]')
  }

  getPrevButton(): Locator {
    return this.getDialog().locator('button[aria-label="Previous"]')
  }

  getCurrentImage(): Locator {
    return this.getDialog().locator('img[alt^="Backdrop"]').first()
  }

  async navigateNext(): Promise<void> {
    await this.getNextButton().click()
  }

  async close(): Promise<void> {
    await this.getCloseButton().click()
  }

  getCurrentUrl(): string {
    return this.page.url()
  }
}
