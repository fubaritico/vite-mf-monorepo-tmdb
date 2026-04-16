import { Then, When } from '@cucumber/cucumber'
import { expect } from '@playwright/test'

import { SearchResultsPage } from '../page-objects/SearchResultsPage'
import { E2EWorld } from '../support/world'

// ---------------------------------------------------------------------------
// Generic keyboard actions
// ---------------------------------------------------------------------------

When<E2EWorld>(
  'I press Enter on the focused element',
  { timeout: 15_000 },
  async function () {
    await this.page.keyboard.press('Enter')
  }
)

When<E2EWorld>('I press Escape', { timeout: 15_000 }, async function () {
  await this.page.keyboard.press('Escape')
  // Wait for dialog close / dropdown dismiss / navigation
  await this.page.waitForTimeout(1000)
})

// ---------------------------------------------------------------------------
// Tab navigation
// ---------------------------------------------------------------------------

When<E2EWorld>(
  'I tab to the first poster link',
  { timeout: 15_000 },
  async function () {
    // Tab through the page until we reach a link containing a movie card
    for (let i = 0; i < 50; i++) {
      await this.page.keyboard.press('Tab')
      const focused = this.page.locator(':focus')
      const hasCard = await focused.evaluate(
        (el) =>
          el.matches('[data-testid^="movie-card-"]') ||
          el.querySelector('[data-testid^="movie-card-"]') !== null ||
          el.closest('[data-testid^="movie-card-"]') !== null
      )
      if (hasCard) return
    }
    throw new Error('Could not tab to a poster link within 50 Tab presses')
  }
)

When<E2EWorld>(
  'I tab to the button labeled {string}',
  { timeout: 30_000 },
  async function (label: string) {
    // Wait for the button to be visible and enabled before tabbing
    await this.page
      .locator(
        `button[aria-label="${label}"]:not([disabled]), button:has-text("${label}"):not([disabled])`
      )
      .first()
      .waitFor({ state: 'visible', timeout: 10_000 })

    // Try forward Tab first (enters dialog focus trap), then Shift+Tab
    for (const key of ['Tab', 'Shift+Tab']) {
      for (let i = 0; i < 15; i++) {
        await this.page.keyboard.press(key)
        const info = await this.page.evaluate(() => {
          const el = document.activeElement
          return {
            ariaLabel: el?.getAttribute('aria-label'),
            text:
              el?.tagName === 'BUTTON' || el?.tagName === 'A'
                ? el.textContent?.trim()
                : null,
          }
        })
        if (info.ariaLabel === label || info.text === label) return
      }
    }
    throw new Error(
      `Could not tab to button labeled "${label}" within 30 Tab presses`
    )
  }
)

When<E2EWorld>(
  'I tab to {string} in the results',
  { timeout: 15_000 },
  async function (text: string) {
    for (let i = 0; i < 50; i++) {
      await this.page.keyboard.press('Tab')
      const focused = this.page.locator(':focus')
      const content = await focused.textContent()
      if (content?.includes(text)) return
    }
    throw new Error(
      `Could not tab to "${text}" in the results within 50 Tab presses`
    )
  }
)

// ---------------------------------------------------------------------------
// Search input — keyboard only
// ---------------------------------------------------------------------------

When<E2EWorld>(
  'I tab to the search input',
  { timeout: 15_000 },
  async function () {
    for (let i = 0; i < 30; i++) {
      await this.page.keyboard.press('Tab')
      const focused = this.page.locator(':focus')
      const role = await focused.getAttribute('role')
      if (role === 'combobox') return
    }
    throw new Error(
      'Could not tab to the search combobox within 30 Tab presses'
    )
  }
)

When<E2EWorld>(
  'I type {string} using the keyboard',
  { timeout: 15_000 },
  async function (text: string) {
    await this.page.keyboard.type(text, { delay: 50 })
  }
)

When<E2EWorld>(
  'I tab to the search bar input on the results page',
  { timeout: 15_000 },
  async function () {
    const resultsPage = new SearchResultsPage(this.page)
    const input = resultsPage.getSearchBarInput()
    await input.focus()
    await expect(input).toBeFocused()
  }
)

When<E2EWorld>(
  'I clear and type {string} using the keyboard',
  { timeout: 15_000 },
  async function (text: string) {
    // Select all + delete, then type
    await this.page.keyboard.press('Control+a')
    await this.page.keyboard.press('Backspace')
    await this.page.keyboard.type(text, { delay: 50 })
  }
)

// ---------------------------------------------------------------------------
// Typeahead arrow navigation
// ---------------------------------------------------------------------------

When<E2EWorld>(
  'I press ArrowDown to highlight the first result',
  { timeout: 15_000 },
  async function () {
    await this.page.keyboard.press('ArrowDown')
  }
)

When<E2EWorld>(
  'I press ArrowDown until {string} is highlighted',
  { timeout: 15_000 },
  async function (text: string) {
    for (let i = 0; i < 20; i++) {
      // Check if the currently highlighted option contains the target text
      const activeId = await this.page
        .locator('input[role="combobox"]')
        .getAttribute('aria-activedescendant')
      if (activeId) {
        const activeItem = this.page.locator(`[id="${activeId}"]`)
        const content = await activeItem.textContent()
        if (content?.includes(text)) return
      }
      await this.page.keyboard.press('ArrowDown')
    }
    throw new Error(`Could not highlight "${text}" within 20 ArrowDown presses`)
  }
)

// ---------------------------------------------------------------------------
// Tabs — arrow key navigation
// ---------------------------------------------------------------------------

When<E2EWorld>(
  'I tab to the {string} tab in the {string} section',
  { timeout: 15_000 },
  async function (tabLabel: string, sectionTitle: string) {
    const section = this.page.locator('section', {
      has: this.page.locator('h2', { hasText: sectionTitle }),
    })
    await section.scrollIntoViewIfNeeded({ timeout: 10_000 })
    const tab = section.locator('button[role="tab"]', { hasText: tabLabel })
    await tab.focus()
    await expect(tab).toBeFocused()
  }
)

When<E2EWorld>(
  'I press ArrowRight to switch to the next tab',
  async function () {
    await this.page.keyboard.press('ArrowRight')
  }
)

Then<E2EWorld>(
  'the {string} tab is active',
  { timeout: 10_000 },
  async function (tabLabel: string) {
    const tab = this.page.locator('button[role="tab"][aria-selected="true"]', {
      hasText: tabLabel,
    })
    await expect(tab).toHaveCount(1, { timeout: 5_000 })
  }
)

When<E2EWorld>(
  'I tab to the first poster in the active panel',
  { timeout: 15_000 },
  async function () {
    // From the focused tab, Tab moves into the active panel content
    for (let i = 0; i < 10; i++) {
      await this.page.keyboard.press('Tab')
      const focused = this.page.locator(':focus')
      const hasCard = await focused.evaluate(
        (el) =>
          el.matches('[data-testid^="movie-card-"]') ||
          el.querySelector('[data-testid^="movie-card-"]') !== null ||
          el.closest('[data-testid^="movie-card-"]') !== null
      )
      if (hasCard) return
    }
    throw new Error(
      'Could not tab to a poster in the active panel within 10 Tab presses'
    )
  }
)
