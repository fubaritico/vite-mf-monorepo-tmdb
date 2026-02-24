import { defineConfig } from 'tsup'

export default defineConfig((options) => ({
  entry: [
    'src/index.ts',
    'src/Container/index.ts',
    'src/Header/index.ts',
    'src/Footer/index.ts',
    'src/RootLayout/index.ts',
    'src/Section/index.ts',
  ],
  format: ['esm'],
  dts: true,
  clean: !options.watch,
  treeshake: true,
  splitting: true,
  sourcemap: true,
  external: ['react', 'react-dom', 'react-router-dom'],
  esbuildOptions(esbuildOpts) {
    esbuildOpts.jsx = 'automatic'
  },
}))
