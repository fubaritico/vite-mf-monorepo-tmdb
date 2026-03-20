import { defineConfig } from 'tsup'

export default defineConfig((options) => ({
  entry: ['src/**/*.{ts,tsx}', '!src/**/*.test.*'],
  format: ['esm'],
  bundle: false,
  dts: true,
  clean: !options.watch,
  sourcemap: true,
  external: ['react', 'react-dom', 'react-router-dom', 'next'],
  esbuildOptions(esbuildOpts) {
    esbuildOpts.jsx = 'automatic'
  },
}))