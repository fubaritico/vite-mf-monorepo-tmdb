import type { Page } from '@playwright/test'

const BASE_URL = process.env.E2E_BASE_URL ?? 'http://localhost:3000'

export class HomePage {
  constructor(private page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto(BASE_URL, { waitUntil: 'networkidle' })
  }

  getFirstCarouselItem() {
    return this.page.locator('[data-testid^="movie-card-"]').first()
  }

  getAllCarouselItems() {
    return this.page.locator('[data-testid^="movie-card-"]')
  }

  getCarouselTitles() {
    return this.page.locator('h2')
  }
}
