import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    name: 'home',
    environment: 'jsdom',
    include: ['src/**/*.test.tsx'],
    disableConsoleIntercept: true,
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json', 'html'],
    },
  },
})
