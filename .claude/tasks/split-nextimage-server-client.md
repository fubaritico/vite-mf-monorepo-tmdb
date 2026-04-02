# Task: Split NextImage into Server and Client variants

## Context

`NextImage` is currently a `'use client'` component that uses `useState('loading')` to set `opacity-0` on all images during SSR. Without JavaScript, images are invisible forever — the `useEffect`/`onLoad` callbacks never fire to switch to `opacity-100`. This breaks SSR image rendering for the downstream project (`nextjs-multizone-tmdb`).

## Goal

Split `NextImage` into two components:

1. **`NextImage`** (Server-compatible, **no** `'use client'`) — the default, used for images present at page load
2. **`NextImageClient`** (`'use client'`) — used for images that appear after user interaction

## File locations

All files in `packages/ui/src/next/Image/` unless noted otherwise.

---

## 1. `NextImage.tsx` — Server variant (rewrite)

- **Remove** `'use client'` directive
- **Remove** all React hooks: `useState`, `useEffect`, `useRef`, `useCallback`
- **Remove** the custom opacity state machine (`state === 'loaded' ? opacity-100 : opacity-0`)
- **Remove** `onLoad`/`onError` callback handling
- **Remove** `data-state` attribute on wrapper
- **Remove** `fallback` prop usage (no error state in server variant)
- **Keep** the wrapper `<div>` with `className`, `style`, `aspectRatio` support
- **Keep** `imageClassName` prop (applied to the `<Image>` element)
- **Delegate blur placeholder to Next.js natively**: when `blurDataURL` is provided, pass `placeholder="blur"` + `blurDataURL` to `next/image`
- The `<Image>` element renders with **full opacity** — visible immediately in SSR HTML

```tsx
import clsx from 'clsx'
import Image from 'next/image'

import type { NextImageProps } from './NextImage.types'

function NextImage({
  aspectRatio,
  blurDataURL,
  className,
  imageClassName,
  style,
  ...rest
}: Readonly<NextImageProps>) {
  return (
    <div
      className={clsx('ui:relative ui:overflow-hidden ui:bg-muted', className)}
      style={aspectRatio ? { aspectRatio, ...style } : style}
    >
      <Image
        {...rest}
        className={imageClassName}
        placeholder={blurDataURL ? 'blur' : 'empty'}
        blurDataURL={blurDataURL}
      />
    </div>
  )
}

export default NextImage
```

## 2. `NextImageClient.tsx` — Client variant (new file)

- **Has** `'use client'` directive
- **Contains** all the removed logic: `useState`, `useEffect`, `useRef`, `useCallback`
- **Contains** the fade-in transition (`opacity-0` to `opacity-100`)
- **Contains** error handling with `fallback` prop and default Photo icon fallback
- **Contains** `onLoad`/`onError` callback forwarding
- **Contains** `data-state` attribute on wrapper
- Essentially the **current** `NextImage.tsx` code, renamed

```tsx
'use client'

import clsx from 'clsx'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

import { Icon } from '../../Icon'

import type { NextImageClientProps } from './NextImageClient.types'
import type { ImageState } from '../../Image'
import type { SyntheticEvent } from 'react'

function NextImageClient({
  fallback,
  aspectRatio,
  blurDataURL,
  className,
  imageClassName,
  onLoad,
  onError,
  style,
  ...rest
}: Readonly<NextImageClientProps>) {
  // ... current NextImage.tsx logic unchanged
}

export default NextImageClient
```

## 3. `NextImageClient.types.ts` — Client types (new file)

Same as current `NextImageProps` but keeps `fallback`, `onLoad`, `onError`:

```tsx
import type { ImageProps } from 'next/image'
import type { ReactNode } from 'react'

export interface NextImageClientProps extends Omit<ImageProps, 'placeholder'> {
  /** Custom fallback content on error (default: Photo icon) */
  fallback?: ReactNode
  /** Container aspect ratio (e.g. '2/3', '16/9') */
  aspectRatio?: string
  /** Base64 blur data URL — auto-sets placeholder="blur" when provided */
  blurDataURL?: string
  /** Classes applied directly to the `<Image>` element */
  imageClassName?: string
}
```

## 4. `NextImage.types.ts` — Server types (update)

Remove `fallback` prop (no error handling in server variant):

```tsx
import type { ImageProps } from 'next/image'

export interface NextImageProps extends Omit<ImageProps, 'placeholder'> {
  /** Container aspect ratio (e.g. '2/3', '16/9') */
  aspectRatio?: string
  /** Base64 blur data URL — auto-sets placeholder="blur" when provided */
  blurDataURL?: string
  /** Classes applied directly to the `<Image>` element */
  imageClassName?: string
}
```

## 5. `index.ts` — Barrel export (update)

Export both components:

```tsx
export { default as NextImage } from './NextImage'
export { default as NextImageClient } from './NextImageClient'
export type { NextImageProps } from './NextImage.types'
export type { NextImageClientProps } from './NextImageClient.types'
```

## 6. `HeroImage.tsx` — Update to use server NextImage

File: `packages/ui/src/next/HeroImage/HeroImage.tsx`

- **Remove** `'use client'` directive (HeroImage becomes server-compatible)
- **Remove** `fallback` prop from `NextImage` usage (no longer exists on server variant)
- **Remove** `Skeleton` import (was only used as fallback)
- **Replace** `preload` with `priority` (standard Next.js prop for LCP images)
- **Replace** `original` with `w1280` in TMDB URL (reduce ~2-5MB to ~200KB)
- **Remove** `imageClassName="ui:h-auto! ui:w-full"` (conflicts with `fill` layout)
- **Add** `blurDataURL` prop to `NextHeroImageProps` — passed from the consuming zone app
- **Keep** the gradient overlay div
- **Keep** the Skeleton for the `!src` case (no backdrop path at all)

```tsx
import { Skeleton } from '../../Skeleton'
import { NextImage } from '../Image'

export interface NextHeroImageProps {
  /** Backdrop path from TMDB API (e.g. "/abc123.jpg") */
  backdropPath?: string | null
  /** Alt text for the image */
  title?: string | null
  /** Base64 blur data URL for instant placeholder */
  blurDataURL?: string
}

function HeroImage({ backdropPath, title, blurDataURL }: Readonly<NextHeroImageProps>) {
  const src = backdropPath
    ? `https://image.tmdb.org/t/p/w1280${backdropPath}`
    : undefined

  return (
    <>
      {src ? (
        <NextImage
          src={src}
          alt={title ?? 'Unknown'}
          fill
          priority
          sizes="100vw"
          className="ui:relative ui:h-full ui:w-full ui:z-0"
          blurDataURL={blurDataURL}
        />
      ) : (
        <Skeleton
          data-testid="hero-image-skeleton"
          variant="rectangle"
          width="ui:relative ui:w-full ui:h-auto ui:aspect-[21/9] ui:lg:max-h-[440px] ui:z-0"
          aspectRatio="21/9"
          rounded={false}
        />
      )}
      {/* Gradient Overlay */}
      <div className="ui:absolute ui:inset-0 ui:bg-gradient-to-t ui:from-black/80 ui:via-black/40 ui:to-transparent ui:z-1 ui:top-0 ui:left-0 ui:right-0 ui:bottom-0" />
    </>
  )
}

export default HeroImage
```

## 7. `MovieCardContent.tsx` — Update to use server NextImage

File: `packages/ui/src/next/MovieCard/MovieCardContent.tsx`

- Remove `fallback` prop if passed to `NextImage`
- **Keep** `blurDataURL` prop pass-through (consuming zone generates it)
- Image is now visible immediately in SSR HTML

## 8. Top-level `next/index.ts` barrel — Update

Ensure `NextImageClient` and `NextImageClientProps` are exported from the package's `/next` entry point.

---

## Testing

- Existing `NextImage` tests should be **moved/renamed** to test `NextImageClient` (same behavior)
- Add a simple test for the new server `NextImage`: renders an `<img>` without `opacity-0`, no error state
- HeroImage tests: update to match removed `fallback`/`preload` props, added `blurDataURL`/`priority`

## Breaking changes

- `NextImage` no longer has `fallback` prop — consumers using error fallback must switch to `NextImageClient`
- `NextImage` no longer fires `onLoad`/`onError` callbacks with state management — consumers relying on these must switch to `NextImageClient`
- `HeroImage` now accepts `blurDataURL` prop — consuming zone apps should generate and pass it
- `HeroImage` no longer has `'use client'` — can be used in Server Components directly

## Version bump

Breaking changes on `NextImage` behavior. Publish as minor if all downstream consumers (`nextjs-multizone-tmdb`) are updated simultaneously.

## Downstream follow-up (nextjs-multizone-tmdb)

After publishing the new version:

1. Add a `getBlurDataURL(tmdbPath: string): Promise<string>` utility using `sharp` — fetches TMDB image, resizes to ~10px, returns base64 data URL
2. Call it in page.tsx Server Components alongside `prefetchQuery`, pass `blurDataURL` down through sections to `HeroImage` and `MovieCard`
3. Bump `@vite-mf-monorepo/ui` version
