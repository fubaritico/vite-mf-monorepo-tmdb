import { defineConfig } from 'tsup'

export default defineConfig((options) => ({
  entry: [
    'src/index.ts',
    'src/Button/index.ts',
    'src/Card/index.ts',
    'src/styles.css',
  ],
  format: ['esm'],
  dts: true,
  clean: !options.watch,
  treeshake: true,
  splitting: true,
  sourcemap: true,
  external: ['react', 'react-dom'],
  esbuildOptions(esbuildOpts) {
    esbuildOpts.jsx = 'automatic'
  },
}))
