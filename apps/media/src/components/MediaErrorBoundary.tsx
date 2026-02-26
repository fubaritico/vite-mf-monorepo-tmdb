import { useRouteError } from 'react-router-dom'

import type { FC } from 'react'

import '../remote.css'

const MediaErrorBoundary: FC = () => {
  const error = useRouteError() as Error

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center p-8 text-center">
      <h2 className="mb-4 text-2xl text-destructive">Movie Not Found</h2>
      <p className="mb-8 text-muted-foreground">{error.message}</p>
      <a href="/" className="text-primary underline-offset-4 hover:underline">
        ← Back to movie list
      </a>
    </div>
  )
}

export default MediaErrorBoundary
