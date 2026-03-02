import { Modal } from '@vite-mf-monorepo/ui'
import { useNavigate, useRouteError } from 'react-router-dom'

import '../../remote.css'

import type { FC } from 'react'

const PhotosErrorBoundary: FC = () => {
  const error = useRouteError() as Error
  const navigate = useNavigate()

  const onClose = () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    navigate(-1)
  }

  return (
    <Modal isOpen onClose={onClose} aria-label="Erreur">
      <div className="ph:flex ph:items-center ph:justify-center ph:w-full ph:h-full">
        <div className="ph:text-white ph:text-center">
          <h2 className="ph:text-2xl ph:mb-4">Erreur</h2>
          <p>{error.message}</p>
        </div>
      </div>
    </Modal>
  )
}

export default PhotosErrorBoundary
