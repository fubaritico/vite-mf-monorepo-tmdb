import * as Sentry from '@sentry/react'

if (!Sentry.isInitialized()) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    environment: import.meta.env.VITE_SENTRY_ENVIRONMENT ?? 'production',
    release: `search@${String(import.meta.env.VITE_GIT_SHA ?? 'local')}`,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],
    tracesSampleRate: import.meta.env.PROD ? 0.1 : 1.0,
    tracePropagationTargets: [],
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    initialScope: { tags: { app: 'search' } },
    beforeSend(event) {
      if (event.exception?.values?.[0]?.type === 'ChunkLoadError') return null
      return event
    },
  })
}
