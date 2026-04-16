import { Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'

import { E2EWorld } from '../support/world'

Then<E2EWorld>(
  'the {string} tab is active in the {string} section',
  { timeout: 10_000 },
  async function (tabLabel: string, sectionTitle: string) {
    const section = this.page.locator('section', {
      has: this.page.locator('h2', { hasText: sectionTitle }),
    })
    const activeTab = section.locator(
      'button[role="tab"][aria-selected="true"]',
      { hasText: tabLabel }
    )
    await expect(activeTab).toHaveCount(1, { timeout: 5_000 })
  }
)

Then<E2EWorld>(
  'I see posters in the active panel',
  { timeout: 15_000 },
  async function () {
    // currentSection is set by "I click the {string} tab in the {string} section"
    const activePanel = this.currentSection.locator(
      '[role="tabpanel"]:not([hidden])'
    )
    const posters = activePanel.locator('[data-testid^="movie-card-"]')
    await posters.first().waitFor({ state: 'visible', timeout: 10_000 })
    const count = await posters.count()
    expect(count).toBeGreaterThan(0)
  }
)
