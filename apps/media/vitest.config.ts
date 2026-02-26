import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    name: 'media',
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.test.tsx'],
    disableConsoleIntercept: true,
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json', 'html'],
    },
  },
})
