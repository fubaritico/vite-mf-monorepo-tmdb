import { QueryClient } from '@tanstack/react-query'
import { createBrowserRouter } from 'react-router-dom'

import Photos from './components/Photos'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
  },
})

export const router = createBrowserRouter([
  {
    path: 'movie/:id/photos/:index',
    element: <Photos />,
  },
  {
    path: '*',
    element: (
      <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <p>Photos standalone dev</p>
        <a href="/movie/278/photos/0">Open PhotoViewer — movie 278, photo 0</a>
      </div>
    ),
  },
])
