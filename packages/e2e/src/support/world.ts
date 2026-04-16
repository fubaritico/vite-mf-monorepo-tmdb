import { World, setWorldConstructor } from '@cucumber/cucumber'

import type { Browser, BrowserContext, Locator, Page } from '@playwright/test'

export class E2EWorld extends World {
  browser!: Browser
  context!: BrowserContext
  page!: Page
  previousUrl!: string
  /** Stores a section locator for cross-step references (e.g. "in that section") */
  currentSection!: Locator
  /** Stores focused element labels from focus-trap Tab cycling */
  focusedElements!: string[]
  /** Stores elements that escaped the dialog focus trap */
  focusEscaped!: { label: string; insideDialog: boolean }[]

  /**
   * Waits for a Module Federation remote to be ready by checking for the
   * `[data-testid="mf-ready-{remoteName}"]` sentinel, then verifies no
   * error sentinel is present.
   *
   * NOTE: As of now, these data-testid sentinels do NOT exist in the app
   * code. They must be added to each remote's root component before this
   * helper will work. See `missing_accessors` in setup-output.json.
   */
  async waitForRemote(remoteName: string): Promise<void> {
    const readySelector = `[data-testid="mf-ready-${remoteName}"]`
    const errorSelector = `[data-testid="mf-error-${remoteName}"]`

    await this.page.waitForSelector(readySelector, { timeout: 10_000 })

    const errorElement = await this.page.$(errorSelector)
    if (errorElement) {
      throw new Error(
        `Module Federation remote "${remoteName}" loaded with error (found ${errorSelector})`
      )
    }
  }
}

setWorldConstructor(E2EWorld)
