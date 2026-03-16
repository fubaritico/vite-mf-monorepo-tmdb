import { After, AfterAll, Before, Status } from '@cucumber/cucumber'
import { chromium } from '@playwright/test'

import { E2EWorld } from './world'

import type { Browser } from '@playwright/test'

const isHeadless = (process.env.E2E_HEADLESS ?? 'true') !== 'false'
const isTrace = process.env.E2E_TRACE === 'true'

let browser: Browser | undefined

Before<E2EWorld>(async function () {
  browser ??= await chromium.launch({
    headless: isHeadless,
  })
  this.browser = browser
  this.context = await browser.newContext()
  this.page = await this.context.newPage()

  if (isTrace) {
    await this.context.tracing.start({
      screenshots: true,
      snapshots: true,
      sources: true,
    })
  }
})

After<E2EWorld>(async function (scenario) {
  if (isTrace) {
    const tracePath = `src/traces/trace-${String(Date.now())}.zip`
    await this.context.tracing.stop({ path: tracePath })
  }
  if (scenario.result?.status === Status.FAILED) {
    const screenshot = await this.page.screenshot()
    this.attach(screenshot, 'image/png')
  }
  await this.context.close()
})

AfterAll(async function () {
  if (browser) {
    await browser.close()
    browser = undefined
  }
})
