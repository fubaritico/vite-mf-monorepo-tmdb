import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    projects: ['packages/*', 'apps/*'],
    setupFiles: ['./vitest.setup.ts'],
    disableConsoleIntercept: true,
    coverage: {
      provider: 'v8',
      include: [
        'packages/*/src/**/*',
        'apps/*/src/**/*',
      ],
      exclude: [
        '**/*.test.{ts,tsx}',
        '**/*.stories.{ts,tsx}',
        '**/node_modules/**',
        '**/dist/**',
        '**/*.d.ts',
        '**/main.tsx',
        '**/bootstrap.tsx',
        '**/remote-input.{ts,tsx}',
      ],
      reporter: ['text', 'json-summary', 'lcov'],
      reportsDirectory: './coverage',
    },
    reporters: ['json', 'default'],
    outputFile: './test-output.json',
    onConsoleLog(log: string, type: 'stdout' | 'stderr'): false | void {
      console.warn('log in test: ', log)
      if (log === 'message from third party library' && type === 'stdout') {
        return false
      }
    },
  },
})
