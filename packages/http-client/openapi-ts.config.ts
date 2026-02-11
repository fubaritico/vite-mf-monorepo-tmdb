/**
 * @fileoverview heyAPI OpenAPI-to-TypeScript configuration.
 *
 * This configuration file tells heyAPI how to generate the TMDB API client.
 *
 * ## Generated files (in `./src/client/`):
 * - `types.gen.ts` - TypeScript interfaces for all API types
 * - `sdk.gen.ts` - SDK functions for each API endpoint
 * - `client.gen.ts` - HTTP client instance
 * - `tanstack-query.gen.ts` - TanStack Query options and hooks
 *
 * ## Plugins used:
 * - `@hey-api/typescript` - Generates TypeScript types from OpenAPI schemas
 * - `@hey-api/sdk` - Generates SDK functions (e.g., `moviePopularList()`)
 * - `@hey-api/client-fetch` - Fetch API-based HTTP client
 * - `@tanstack/react-query` - TanStack Query integration
 *
 * ## Usage:
 * Run `pnpm generate` to regenerate the client after OpenAPI spec changes.
 *
 * @see https://heyapi.dev/openapi-ts/configuration
 */
import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
  input: 'https://developer.themoviedb.org/openapi/tmdb-api.json',
  output: {
    path: './src/client',
    format: 'prettier',
  },
  plugins: [
    '@hey-api/typescript',
    '@hey-api/sdk',
    {
      name: '@hey-api/client-fetch',
      runtimeConfigPath: './src/tmdb-config.ts',
    },
    {
      name: '@tanstack/react-query',
      queryOptions: true,
      mutationOptions: true,
    },
  ],
})
