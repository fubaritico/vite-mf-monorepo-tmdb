import { RouterProvider, createMemoryRouter } from 'react-router-dom'

import type { Decorator } from '@storybook/react'

export const withRouter = (route = '/'): Decorator => {
  return (Story) => {
    const router = createMemoryRouter(
      [
        {
          path: route,
          element: <Story />,
        },
      ],
      {
        initialEntries: [route],
      }
    )

    return <RouterProvider router={router} />
  }
}
