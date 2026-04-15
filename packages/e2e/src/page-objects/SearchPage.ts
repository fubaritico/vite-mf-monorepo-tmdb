import type { Locator, Page } from '@playwright/test'

export class SearchPage {
  constructor(private page: Page) {}

  getSearchInput(): Locator {
    return this.page.locator('input[role="combobox"][placeholder="Search..."]')
  }

  getResultItems(): Locator {
    return this.page.locator('[role="option"]:not([aria-disabled="true"])')
  }

  getResultByText(text: string): Locator {
    return this.getResultItems().filter({ hasText: text })
  }
}
