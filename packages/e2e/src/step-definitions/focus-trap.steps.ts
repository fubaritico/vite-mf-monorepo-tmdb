import { Then, When } from '@cucumber/cucumber'

import { PhotosPage } from '../page-objects/PhotosPage'
import { E2EWorld } from '../support/world'

/**
 * Cycle Tab through the photo viewer dialog and record which elements
 * receive focus. We press Tab enough times to loop through the trap twice.
 */
When<E2EWorld>(
  'I cycle Tab through the photo viewer',
  { timeout: 30_000 },
  async function () {
    const photosPage = new PhotosPage(this.page)
    const dialog = photosPage.getDialog()
    await dialog.waitFor({ state: 'visible', timeout: 10_000 })

    const focusedElements: string[] = []

    for (let i = 0; i < 20; i++) {
      await this.page.keyboard.press('Tab')
      const info = await this.page.evaluate(() => {
        const el = document.activeElement
        if (!el) return 'null'
        const tag = el.tagName.toLowerCase()
        const label = el.getAttribute('aria-label') ?? ''
        return `${tag}${label ? `[${label}]` : ''}`
      })
      focusedElements.push(info)
    }

    // Store for the assertion step
    this.focusedElements = focusedElements
  }
)

Then<E2EWorld>('focus never leaves the dialog', function () {
  const elements = this.focusedElements
  // None of the focused elements should be BODY (which means focus escaped the dialog)
  const escaped = elements.filter((el) => el === 'body')
  if (escaped.length > 0) {
    throw new Error(
      `Focus escaped the dialog ${String(escaped.length)} time(s). Focused elements: ${elements.join(' → ')}`
    )
  }
})
