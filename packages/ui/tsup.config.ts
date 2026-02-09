import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/Button/index.ts',
    'src/Card/index.ts',
    'src/styles.css',
  ],
  format: ['esm'],
  dts: true,
  clean: true,
  treeshake: true,
  splitting: true,
  sourcemap: true,
  external: ['react', 'react-dom'],
  esbuildOptions(options) {
    options.jsx = 'automatic'
  },
})
