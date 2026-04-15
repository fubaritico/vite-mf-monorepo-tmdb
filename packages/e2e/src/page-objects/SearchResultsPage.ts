import type { Locator, Page } from '@playwright/test'

export class SearchResultsPage {
  constructor(private page: Page) {}

  getHeading(): Locator {
    return this.page
      .locator('[data-testid="mf-ready-search"]')
      .locator('h1')
      .first()
  }

  getSectionByTitle(title: string): Locator {
    return this.page
      .locator('[data-testid="mf-ready-search"]')
      .locator('h2', { hasText: title })
  }

  getSearchBarInput(): Locator {
    return this.page.locator('[data-testid="search-bar"]').locator('input')
  }

  getSearchBarSubmit(): Locator {
    return this.page
      .locator('[data-testid="search-bar"]')
      .locator('button[type="submit"]')
  }

  /**
   * Returns all links within the section that follows the given h2 title.
   * SearchMedia renders: <h2>Title</h2> <div>...<Link>...</Link>...</div>
   */
  getItemInSection(title: string, itemText: string): Locator {
    // Find the section (Container) that contains the h2 with the given title,
    // then locate a link with the matching text inside it.
    return this.page
      .locator('[data-testid="mf-ready-search"]')
      .locator('section', { has: this.page.locator('h2', { hasText: title }) })
      .locator('a', { hasText: itemText })
      .first()
  }
}
