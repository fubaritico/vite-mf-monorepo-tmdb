/// <reference types="vite/client" />

/**
 * @fileoverview TMDB API client runtime configuration.
 *
 * This file is referenced by heyAPI during client generation via the
 * `runtimeConfigPath` option in `openapi-ts.config.ts`.
 *
 * It provides the base URL and authentication headers for all TMDB API requests.
 * The API token is read from the environment variable `VITE_TMDB_API_TOKEN`.
 *
 * @see https://heyapi.dev/openapi-ts/clients/fetch#runtime-api
 */
import type { Config } from './client/client/types.gen'

/**
 * TMDB API Bearer token from environment variables.
 * Must be set in `.env.local` at the monorepo root.
 */
const TMDB_API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN

/**
 * Creates the client configuration for TMDB API requests.
 *
 * This function is called by the generated `client.gen.ts` before
 * initializing the client instance. It sets:
 * - `baseUrl`: The TMDB API base URL
 * - `Authorization`: Bearer token for authentication
 *
 * @param config - The default configuration from heyAPI
 * @returns The merged configuration with TMDB-specific settings
 */
export const createClientConfig = <T extends Config>(config: T): T => {
  const existingHeaders =
    config.headers && !Array.isArray(config.headers)
      ? (config.headers as Record<string, string>)
      : {}

  return {
    ...config,
    baseUrl: 'https://api.themoviedb.org',
    headers: {
      ...existingHeaders,
      Authorization: `Bearer ${TMDB_API_TOKEN}`,
    },
  }
}
