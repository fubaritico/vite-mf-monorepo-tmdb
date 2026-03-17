# E2E Tests (WIP)

End-to-end tests for the vite-mf-monorepo using **Cucumber.js** (Gherkin BDD scenarios) + **Playwright** (browser automation).

Gherkin's plain-English syntax lets QA and product stakeholders read, write, and validate scenarios without touching code — bridging the gap between business requirements and automated tests.

## Prerequisites

```bash
pnpm install
```

Playwright browsers are installed automatically on first run. To install them manually:

```bash
pnpm --filter @vite-mf-monorepo/e2e test:install-browsers
```

## Run Modes

All commands are self-contained: they kill busy ports, install browsers if needed, build and start all 4 MF apps, poll until every server responds, run Cucumber, then shut everything down.

| Command | Description | Browser | Tracing |
|---------|-------------|---------|---------|
| `pnpm test:e2e` | Headless run (default) | Hidden | No |
| `pnpm test:e2e:smoke` | Headless, `@smoke` scenarios only | Hidden | No |
| `pnpm test:e2e:ui` | Headed — see the browser in action | Visible | No |
| `pnpm test:e2e:trace` | Headed + trace recording | Visible | Yes |
| `pnpm test:e2e:codegen` | Opens Playwright Codegen | Visible | No |
| `pnpm test:e2e:ci` | Headless + retry on failure | Hidden | No |

All commands above are run from the **monorepo root**. You can also run directly from this package:

```bash
pnpm test           # same as pnpm test:e2e from root
pnpm test:smoke     # same as pnpm test:e2e:smoke from root
pnpm test:ui        # headed mode
pnpm test:trace     # headed + tracing
pnpm test:codegen   # Playwright Codegen
```

### When to use which mode?

- **`test`** — quick validation, CI, pre-push check
- **`test:smoke`** — fast sanity check (2 scenarios, ~3s)
- **`test:ui`** — development, watch the browser execute your steps
- **`test:trace`** — debugging a failing test, need DOM snapshots and network logs
- **`test:codegen`** — writing new steps, need to identify the right selectors

## Trace Viewer

After running with `test:trace`, traces are saved as `.zip` files in `src/traces/`. Open them with:

```bash
pnpm --filter @vite-mf-monorepo/e2e test:show-trace
```

The Trace Viewer provides:
- **Timeline** of actions with DOM snapshots at each step
- **Network** tab showing all HTTP requests
- **Console** logs from the browser
- **Pick locator** tool to identify selectors interactively

You can also drag & drop a `.zip` file directly into the viewer, or open a specific trace:

```bash
npx playwright show-trace src/traces/trace-*.zip
```

## Playwright Codegen

Codegen records your actions in a real browser and generates Playwright selectors.

```bash
pnpm test:codegen
```

This starts all 4 MF servers, then opens Codegen on `http://localhost:3000`. Navigate the app normally — Codegen records every action. Copy the generated selectors into your Cucumber step definitions.

**Important**: Codegen generates Playwright code, not Gherkin. Use it to **identify selectors**, then manually create your Cucumber steps.

## Structure

```
packages/e2e/
├── scripts/
│   ├── run-e2e.mjs          # Orchestration: ports, browsers, servers, Cucumber, shutdown
│   └── run-codegen.mjs      # Same lifecycle but opens Playwright Codegen
├── src/
│   ├── features/             # Gherkin .feature files
│   │   ├── smoke.feature     # @smoke — health checks (2 scenarios)
│   │   └── browse-media.feature  # @e2e — full user journeys (6 scenarios)
│   ├── step-definitions/     # Step implementations (TypeScript)
│   │   ├── smoke.steps.ts
│   │   └── browse-media.steps.ts
│   ├── page-objects/         # Page Object pattern — selectors and actions, no assertions
│   │   ├── HomePage.ts
│   │   ├── MediaPage.ts
│   │   └── PhotosPage.ts
│   ├── support/
│   │   ├── world.ts          # Custom Cucumber World with Playwright page + waitForRemote()
│   │   └── hooks.ts          # Before/After hooks: browser lifecycle, tracing, screenshots
│   ├── reports/              # Generated HTML/JSON reports (gitignored)
│   ├── traces/               # Playwright trace .zip files (gitignored)
│   └── cucumber.config.cjs   # Cucumber configuration
├── tsconfig.json
└── package.json
```

## Writing New Tests

### 1. Write a Gherkin scenario

Create or edit a `.feature` file in `src/features/`:

```gherkin
@e2e
Feature: Search movies

  Scenario: Searching for a movie by title
    Given I open the application
    When I search for "Inception"
    Then I see results containing "Inception"
```

### 2. Identify selectors with Codegen

```bash
pnpm test:codegen
```

Navigate to the search feature in the browser. Codegen shows you the best selectors.

### 3. Create a Page Object (if needed)

```typescript
// src/page-objects/SearchPage.ts
import type { Locator, Page } from '@playwright/test'

export class SearchPage {
  constructor(private page: Page) {}

  getSearchInput(): Locator {
    return this.page.locator('[data-testid="search-input"]')
  }

  getResults(): Locator {
    return this.page.locator('[data-testid^="search-result-"]')
  }
}
```

Rules:
- No assertions in Page Objects — only selectors and actions
- Scope selectors to the nearest unique container (avoid strict mode violations)
- For `<dialog>` overlays, use `dialog[open]` as the scope

### 4. Implement step definitions

```typescript
// src/step-definitions/search.steps.ts
import { When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'

import { SearchPage } from '../page-objects/SearchPage'
import { E2EWorld } from '../support/world'

When<E2EWorld>('I search for {string}', { timeout: 10_000 }, async function (query) {
  const searchPage = new SearchPage(this.page)
  await searchPage.getSearchInput().fill(query)
  await searchPage.getSearchInput().press('Enter')
})

Then<E2EWorld>('I see results containing {string}', async function (text) {
  const searchPage = new SearchPage(this.page)
  const results = searchPage.getResults()
  await results.first().waitFor({ state: 'visible', timeout: 10_000 })
  const count = await results.count()
  expect(count).toBeGreaterThan(0)
})
```

### 5. Run your test

```bash
pnpm test:ui    # see it in the browser
```

## MF Sentinels

Each remote wraps its root component with test IDs for observability:

| Sentinel | Meaning |
|----------|---------|
| `data-testid="mf-ready-{name}"` | Remote loaded successfully |
| `data-testid="mf-error-{name}"` | Remote failed to load |
| `data-testid="mf-loading-{name}"` | Remote is loading |

The `waitForRemote(name)` helper in `world.ts` waits for the ready sentinel and verifies no error sentinel is present. Use it in any step that expects a remote to be loaded:

```typescript
await this.waitForRemote('home')   // waits for [data-testid="mf-ready-home"]
await this.waitForRemote('media')  // waits for [data-testid="mf-ready-media"]
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `E2E_BASE_URL` | `http://localhost:3000` | Host URL used in step definitions |
| `E2E_HEADLESS` | `true` | `false` to see the browser |
| `E2E_TRACE` | `false` | `true` to record Playwright traces |
| `E2E_SKIP_BROWSER_INSTALL` | `false` | `true` to skip automatic Chromium install |
| `E2E_POLL_INTERVAL` | `1000` | Polling interval (ms) when waiting for servers |
| `E2E_SERVICE_BOOT_TIMEOUT` | `120000` | Max wait time (ms) for servers to start |

## Troubleshooting

### EMFILE: too many open files (macOS)

```bash
ulimit -n 65536
# Or permanently: echo "ulimit -n 65536" >> ~/.zshrc
```

### Tests time out waiting for a remote

MF remotes on cold start can be slow. Steps that wait for cross-remote navigation need explicit timeouts:

```typescript
Then<E2EWorld>('the home page is visible', { timeout: 15_000 }, async function () {
  await this.waitForRemote('home')
})
```

### `dialog[open]` instead of sentinel for Photos

The Photos remote uses native `<dialog>` shown via `showModal()`. Playwright considers the wrapping sentinel div "hidden" because dialog content is in the top layer. Wait for `dialog[open]` instead:

```typescript
await photosPage.getDialog().waitFor({ state: 'visible', timeout: 10_000 })
```

### Strict mode violation on ambiguous selectors

Scope selectors to the relevant container to avoid matching elements behind overlays:

```typescript
// Bad: matches all "Next" buttons
this.page.locator('button[aria-label="Next"]')
// Good: scoped to dialog
this.getDialog().locator('button[aria-label="Next"]')
```
