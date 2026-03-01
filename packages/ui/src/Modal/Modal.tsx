import clsx from 'clsx'
import { useEffect, useRef } from 'react'

import type { FC, MouseEvent, ReactNode } from 'react'

export interface ModalProps {
  /** Whether the modal is open */
  isOpen: boolean
  /** Callback when modal should close (ESC key, backdrop click) */
  onClose: () => void
  /** Modal content */
  children: ReactNode
  /** Accessible label for screen readers (required) */
  'aria-label': string
  /** Additional class name for the dialog element */
  className?: string
}

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  'aria-label': ariaLabel,
  className,
}) => {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return

    if (isOpen) {
      dialog.showModal()
      document.body.style.overflow = 'hidden'
    } else {
      dialog.close()
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Close on backdrop click — fires only when clicking the <dialog> itself, not its content
  const handleClick = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === ref.current) onClose()
  }

  // Sync native ESC close event with onClose callback
  const handleClose = () => {
    onClose()
  }

  return (
    <dialog
      ref={ref}
      aria-label={ariaLabel}
      aria-modal="true"
      onClick={handleClick}
      onClose={handleClose}
      className={clsx(
        'ui:backdrop:bg-black/80',
        'ui:bg-transparent ui:border-0 ui:p-0',
        'ui:max-w-none ui:max-h-none ui:w-full ui:h-full',
        className
      )}
    >
      {children}
    </dialog>
  )
}

export default Modal
