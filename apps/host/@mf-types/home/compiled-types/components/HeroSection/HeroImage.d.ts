import { FC } from 'react';
export interface HeroImageProps {
    backdropPath: string | null | undefined;
    title: string | null | undefined;
}
declare const HeroImage: FC<HeroImageProps>;
export default HeroImage;
