import { Carousel, CarouselItem, IconButton, Modal } from '@vite-mf-monorepo/ui'

import type { MovieImagesResponse } from '@vite-mf-monorepo/tmdb-client'
import type { FC, MouseEvent } from 'react'

const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p'

type Backdrop = NonNullable<MovieImagesResponse['backdrops']>[number]

interface PhotosModalProps {
  images: Backdrop[]
  initialIndex: number
  onClose: () => void
  onPrev?: () => void
  onNext?: () => void
}

const PhotosModal: FC<PhotosModalProps> = ({
  images,
  initialIndex,
  onClose,
  onPrev,
  onNext,
}) => {
  /**
   * On carrousel item click, if user clicks outside the picture, the modals closes.
   * Mimics a click on backdrop element which doesn't exist in native dialog tag
   */
  const handleCarrouselItemClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    if (!(e.target instanceof HTMLImageElement)) onClose()
  }

  return (
    <Modal isOpen onClose={onClose} aria-label="PhotosModal viewer">
      <Carousel
        key={initialIndex}
        variant="lightbox"
        gap={0}
        rounded={false}
        showPagination={false}
        initialIndex={initialIndex}
        disableAnimation
        disableScroll
        onPrev={onPrev}
        onNext={onNext}
      >
        {images.map((image, i) => (
          <CarouselItem
            key={image.file_path}
            isLightbox
            onClick={handleCarrouselItemClick}
          >
            <img
              src={`${BASE_IMAGE_URL}/w1280${image.file_path ?? ''}`}
              alt={`Backdrop ${String(i + 1)}`}
              className="ph:max-w-full ph:max-h-viewer ph:object-contain"
            />
          </CarouselItem>
        ))}
      </Carousel>
      <IconButton
        icon="XMark"
        aria-label="Close"
        onClick={onClose}
        className="ui:absolute ui:top-4 ui:left-4 ui:text-white hover:ui:bg-white/10 ui:z-10 ui:focus:border-none"
      />
    </Modal>
  )
}

export default PhotosModal
