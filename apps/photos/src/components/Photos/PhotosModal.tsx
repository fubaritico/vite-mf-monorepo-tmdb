import { Carousel, CarouselItem, Modal } from '@vite-mf-monorepo/ui'

import type { MovieImagesResponse } from '@vite-mf-monorepo/tmdb-client'
import type { FC } from 'react'

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
  return (
    <Modal isOpen onClose={onClose} aria-label="PhotosModal viewer">
      <Carousel
        key={initialIndex}
        variant="lightbox"
        gap={0}
        rounded={false}
        showPagination={false}
        initialIndex={initialIndex}
        onPrev={onPrev}
        onNext={onNext}
      >
        {images.map((image, i) => (
          <CarouselItem key={i} isLightbox>
            <img
              src={`${BASE_IMAGE_URL}/w1280${image.file_path ?? ''}`}
              alt={`Backdrop ${String(i + 1)}`}
              className="ph:max-w-full ph:max-h-screen ph:object-contain"
            />
          </CarouselItem>
        ))}
      </Carousel>
    </Modal>
  )
}

export default PhotosModal
