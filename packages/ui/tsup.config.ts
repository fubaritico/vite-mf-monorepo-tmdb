import { defineConfig } from 'tsup'

export default defineConfig((options) => ({
  entry: [
    'src/index.ts',
    'src/Button/index.ts',
    'src/Card/index.ts',
    'src/Icon/index.ts',
    'src/react-router/index.ts',
    'src/next/index.ts',
  ],
  format: ['esm'],
  dts: true,
  clean: !options.watch,
  treeshake: true,
  splitting: true,
  sourcemap: true,
  external: ['react', 'react-dom', 'react-router-dom', 'next', 'next/link'],
  esbuildOptions(esbuildOpts) {
    esbuildOpts.jsx = 'automatic'
  },
}))
