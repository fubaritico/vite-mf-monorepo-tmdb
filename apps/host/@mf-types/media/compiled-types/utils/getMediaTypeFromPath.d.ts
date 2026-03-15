import { MediaType } from '../hooks/useMediaDetails.ts';
/**
 * Extract media type from route pathname by checking all segments
 * @param pathname - Route pathname (e.g., '/movie/278', '/tv/94722')
 * @returns 'movie' | 'tv'
 * @throws Error if neither 'movie' nor 'tv' is found in pathname
 */
export declare const getMediaTypeFromPath: (pathname: string) => MediaType;
