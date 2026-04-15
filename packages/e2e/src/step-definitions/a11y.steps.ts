import AxeBuilder from '@axe-core/playwright'
import { Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'

import { E2EWorld } from '../support/world'

/**
 * Runs an axe-core accessibility audit on the current page.
 * WCAG 2.1 AA standard — flags critical, serious, and moderate violations.
 */
Then<E2EWorld>(
  'the page should have no accessibility violations',
  { timeout: 30_000 },
  async function () {
    const results = await new AxeBuilder({ page: this.page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()

    const violations = results.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    )

    if (violations.length > 0) {
      const summary = violations
        .map(
          (v) =>
            `[${String(v.impact)}] ${v.id}: ${v.description} (${String(v.nodes.length)} elements)`
        )
        .join('\n')
      this.attach(summary, 'text/plain')
    }

    expect(
      violations,
      `Found ${String(violations.length)} a11y violation(s):\n${violations
        .map((v) => `  - ${v.id}: ${v.help}`)
        .join('\n')}`
    ).toHaveLength(0)
  }
)

/** Maps user-friendly region names to CSS selectors */
const regionSelectors: Record<string, string> = {
  'photo viewer': '[data-testid="mf-ready-photos"]',
  'search results': '[data-testid="mf-ready-search"]',
  'media page': '[data-testid="mf-ready-media"]',
  'home page': '[data-testid="mf-ready-home"]',
}

/**
 * Runs an axe-core audit scoped to a named region of the page.
 */
Then<E2EWorld>(
  'the {string} should have no accessibility violations',
  { timeout: 30_000 },
  async function (regionName: string) {
    const selector = regionSelectors[regionName]
    if (!selector) {
      throw new Error(
        `Unknown region "${regionName}". Known: ${Object.keys(regionSelectors).join(', ')}`
      )
    }

    const results = await new AxeBuilder({ page: this.page })
      .include(selector)
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()

    const violations = results.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    )

    if (violations.length > 0) {
      const summary = violations
        .map(
          (v) =>
            `[${String(v.impact)}] ${v.id}: ${v.description} (${String(v.nodes.length)} elements)`
        )
        .join('\n')
      this.attach(summary, 'text/plain')
    }

    expect(
      violations,
      `Found ${String(violations.length)} a11y violation(s) in "${regionName}":\n${violations
        .map((v) => `  - ${v.id}: ${v.help}`)
        .join('\n')}`
    ).toHaveLength(0)
  }
)
