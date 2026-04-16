import { Then, When } from '@cucumber/cucumber'

import { PhotosPage } from '../page-objects/PhotosPage'
import { E2EWorld } from '../support/world'

/**
 * Cycle Tab through the photo viewer dialog and record whether each
 * focused element is inside the dialog. We press Tab enough times to
 * loop through the trap twice.
 */
When<E2EWorld>(
  'I cycle Tab through the photo viewer',
  { timeout: 30_000 },
  async function () {
    const photosPage = new PhotosPage(this.page)
    const dialog = photosPage.getDialog()
    await dialog.waitFor({ state: 'visible', timeout: 10_000 })

    const results: { label: string; insideDialog: boolean }[] = []

    for (let i = 0; i < 20; i++) {
      await this.page.keyboard.press('Tab')
      const info = await this.page.evaluate(() => {
        const el = document.activeElement
        if (!el) return { label: 'null', insideDialog: false }
        const tag = el.tagName.toLowerCase()
        const ariaLabel = el.getAttribute('aria-label') ?? ''
        const label = `${tag}${ariaLabel ? `[${ariaLabel}]` : ''}`
        // body is a transient state during focus trap wrap — not a real escape
        if (tag === 'body') return { label, insideDialog: true }
        const insideDialog = el.closest('dialog') !== null
        return { label, insideDialog }
      })
      results.push(info)
    }

    this.focusedElements = results.map((r) => r.label)
    this.focusEscaped = results.filter((r) => !r.insideDialog)
  }
)

Then<E2EWorld>('focus never leaves the dialog', function () {
  const escaped = this.focusEscaped as {
    label: string
    insideDialog: boolean
  }[]
  if (escaped.length > 0) {
    const labels = escaped.map((e) => e.label).join(', ')
    throw new Error(
      `Focus escaped the dialog to: ${labels}. Full cycle: ${this.focusedElements.join(' → ')}`
    )
  }
})
