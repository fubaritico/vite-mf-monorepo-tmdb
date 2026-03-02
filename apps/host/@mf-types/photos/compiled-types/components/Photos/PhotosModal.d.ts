import type { MovieImagesResponse } from '@vite-mf-monorepo/tmdb-client';
import type { FC } from 'react';
type Backdrop = NonNullable<MovieImagesResponse['backdrops']>[number];
interface PhotosModalProps {
    images: Backdrop[];
    initialIndex: number;
    onClose: () => void;
    onPrev?: () => void;
    onNext?: () => void;
}
declare const PhotosModal: FC<PhotosModalProps>;
export default PhotosModal;
