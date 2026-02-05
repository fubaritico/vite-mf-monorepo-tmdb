import { useRouteError } from 'react-router-dom'

import './DetailErrorBoundary.css'

const DetailErrorBoundary = () => {
  const error = useRouteError() as Error

  return (
    <div className="detail-error">
      <h2>Movie Not Found</h2>
      <p>{error.message}</p>
      <a href="/">← Back to movie list</a>
    </div>
  )
}

export default DetailErrorBoundary
