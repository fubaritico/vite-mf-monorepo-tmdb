import clsx from 'clsx'
import { useCallback, useEffect, useRef, useState } from 'react'

import CarouselCounter from './CarouselCounter'
import CarouselError from './CarouselError'
import CarouselNavigation from './CarouselNavigation'
import CarouselPagination from './CarouselPagination'

import type { FC, ReactNode } from 'react'

/** Carousel visual variant */
export type CarouselVariant = 'standard' | 'hero' | 'lightbox'

/** Arrow position for navigation buttons */
export type CarouselArrowPosition = 'sides' | 'bottom-right'

export interface CarouselProps {
  /** Carousel items */
  children?: ReactNode
  /** Visual variant */
  variant?: CarouselVariant
  /** Show pagination dots (ignored for lightbox — counter is shown instead) */
  showPagination?: boolean
  /** Show navigation arrows */
  showArrows?: boolean
  /** Arrow position */
  arrowPosition?: CarouselArrowPosition
  /** Gap between items in pixels */
  gap?: number
  /** Additional class name */
  className?: string
  /** Error message to display instead of carousel content */
  errorMessage?: string
  /** Apply rounded corners to viewport */
  rounded?: boolean
  /**
   * Initial scroll index — jumps to this item on mount without animation.
   * Use with key={index} on Carousel for URL-based navigation (lightbox).
   */
  initialIndex?: number
  /**
   * Override internal prev navigation (e.g. navigate to previous URL in lightbox).
   * When provided, replaces internal scrollPrev.
   */
  onPrev?: () => void
  /**
   * Override internal next navigation (e.g. navigate to next URL in lightbox).
   * When provided, replaces internal scrollNext.
   */
  onNext?: () => void
}

/**
 * Carousel component with horizontal scroll, pagination, and navigation.
 * Supports three variants:
 * - standard: multi-items horizontal scroll
 * - hero: single panoramic item with snap
 * - lightbox: single item per view, ghost arrows, counter (for PhotoViewer)
 */
const Carousel: FC<CarouselProps> = ({
  children,
  variant = 'standard',
  showPagination = true,
  showArrows = true,
  arrowPosition = 'sides',
  gap = 16,
  className,
  errorMessage,
  rounded = true,
  initialIndex,
  onPrev,
  onNext,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [totalPositions, setTotalPositions] = useState(1)

  const isHero = variant === 'hero'
  const isLightbox = variant === 'lightbox'
  /** Hero and lightbox both use container width for per-item scroll calculation */
  const isFullWidth = isHero || isLightbox

  /**
   * Calculates the total number of scroll positions based on container and item dimensions.
   * For hero/lightbox: positions = number of items (one per slide).
   * For standard: positions = ceil(maxScrollLeft / itemWidth) + 1.
   */
  const calculatePositions = useCallback(() => {
    const container = scrollRef.current
    if (!container) return

    const items = container.children

    if (isFullWidth) {
      setTotalPositions(items.length)
      return
    }

    const firstItem = items[0] as HTMLElement | undefined
    if (!firstItem) {
      setTotalPositions(1)
      return
    }

    const itemWidth = firstItem.offsetWidth
    const maxScrollLeft = container.scrollWidth - container.offsetWidth

    if (maxScrollLeft <= 0) {
      setTotalPositions(1)
    } else if (itemWidth > 0) {
      const positions = Math.round(maxScrollLeft / (itemWidth + gap)) + 1
      setTotalPositions(Math.max(1, positions))
    }
  }, [gap, isFullWidth])

  /**
   * Effect: Recalculates positions when children or calculatePositions function changes.
   */
  useEffect(() => {
    calculatePositions()
  }, [children, calculatePositions])

  /**
   * Effect: Sets up ResizeObserver to recalculate positions on viewport/container resize.
   */
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const resizeObserver = new ResizeObserver(() => {
      calculatePositions()
    })

    resizeObserver.observe(container)
    return () => {
      resizeObserver.disconnect()
    }
  }, [calculatePositions])

  /**
   * Effect: Jumps to initialIndex on mount (no animation).
   * Consumed by lightbox via key={index} remounting — refs avoid stale closure.
   */
  const initialScrollRef = useRef({
    index: initialIndex ?? 0,
    isFullWidth,
    gap,
  })
  useEffect(() => {
    const { index, isFullWidth: fw, gap: g } = initialScrollRef.current
    if (index <= 0) return
    const container = scrollRef.current
    if (!container) return
    const firstItem = container.children[0] as HTMLElement | undefined
    const itemWidth = fw ? container.offsetWidth : (firstItem?.offsetWidth ?? 0)
    container.scrollLeft = index * (itemWidth + (fw ? 0 : g))
  }, [])

  /**
   * Handles scroll events to update the current index based on scroll position.
   */
  const handleScroll = useCallback(() => {
    const container = scrollRef.current
    if (!container) return

    const scrollLeft = container.scrollLeft
    const firstItem = container.children[0] as HTMLElement | undefined
    const itemWidth = isFullWidth
      ? container.offsetWidth
      : (firstItem?.offsetWidth ?? 0)

    if (itemWidth > 0) {
      const index = Math.round(scrollLeft / (itemWidth + gap))
      setCurrentIndex(Math.min(index, totalPositions - 1))
    }
  }, [gap, isFullWidth, totalPositions])

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    container.addEventListener('scroll', handleScroll)
    return () => {
      container.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  /**
   * Scrolls to a specific position index with smooth animation.
   */
  const scrollTo = useCallback(
    (index: number) => {
      const container = scrollRef.current
      if (!container) return

      const firstItem = container.children[0] as HTMLElement | undefined
      const itemWidth = isFullWidth
        ? container.offsetWidth
        : (firstItem?.offsetWidth ?? 0)

      const isLastPosition = index === totalPositions - 1
      const scrollLeft = isLastPosition
        ? container.scrollWidth - container.offsetWidth
        : index * (itemWidth + gap)

      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth',
      })
    },
    [gap, isFullWidth, totalPositions]
  )

  /** Scrolls to the previous position (internal fallback when onPrev is not provided) */
  const scrollPrev = useCallback(() => {
    if (currentIndex > 0) {
      scrollTo(currentIndex - 1)
    }
  }, [currentIndex, scrollTo])

  /** Scrolls to the next position (internal fallback when onNext is not provided) */
  const scrollNext = useCallback(() => {
    if (currentIndex < totalPositions - 1) {
      scrollTo(currentIndex + 1)
    }
  }, [currentIndex, totalPositions, scrollTo])

  /** Effective prev handler: external callback takes priority over internal scroll */
  const handlePrev = onPrev ?? scrollPrev
  /** Effective next handler: external callback takes priority over internal scroll */
  const handleNext = onNext ?? scrollNext

  if (errorMessage) {
    return <CarouselError message={errorMessage} />
  }

  const canScrollPrev = currentIndex > 0
  const canScrollNext = currentIndex < totalPositions - 1
  const showControls = totalPositions > 1

  return (
    <div className={clsx('ui:relative', className)}>
      {/* Scroll container */}
      <div
        ref={scrollRef}
        className={clsx(
          'ui:flex ui:overflow-x-auto ui:scroll-smooth ui:scrollbar-none',
          isFullWidth && 'ui:snap-x ui:snap-mandatory',
          rounded && 'ui:rounded-lg ui:overflow-hidden'
        )}
        style={{ gap: `${String(gap)}px` }}
      >
        {children}
      </div>

      {/* Standard: Arrows on sides */}
      {showControls &&
        showArrows &&
        arrowPosition === 'sides' &&
        !isHero &&
        !isLightbox && (
          <CarouselNavigation
            onPrev={handlePrev}
            onNext={handleNext}
            canPrev={canScrollPrev}
            canNext={canScrollNext}
            size="md"
            position="sides"
          />
        )}

      {/* Hero: Pagination centered, Arrows bottom-right */}
      {showControls && isHero && showPagination && (
        <div className="ui:absolute ui:bottom-4 ui:left-1/2 ui:-translate-x-1/2 ui:z-10">
          <CarouselPagination
            total={totalPositions}
            current={currentIndex}
            onSelect={scrollTo}
            light
          />
        </div>
      )}
      {showControls && isHero && showArrows && (
        <CarouselNavigation
          onPrev={handlePrev}
          onNext={handleNext}
          canPrev={canScrollPrev}
          canNext={canScrollNext}
          size="sm"
          className="ui:absolute ui:bottom-4 ui:right-4 ui:z-10"
        />
      )}

      {/* Standard: Pagination + Arrows below */}
      {showControls &&
      !isHero &&
      !isLightbox &&
      ((showArrows && arrowPosition === 'bottom-right') || showPagination) ? (
        <div
          className={clsx(
            'ui:mt-4 ui:flex ui:items-center',
            arrowPosition === 'bottom-right'
              ? 'ui:justify-end ui:gap-4'
              : 'ui:justify-center'
          )}
        >
          {showPagination && (
            <CarouselPagination
              total={totalPositions}
              current={currentIndex}
              onSelect={scrollTo}
            />
          )}
          {showArrows && arrowPosition === 'bottom-right' && (
            <CarouselNavigation
              onPrev={handlePrev}
              onNext={handleNext}
              canPrev={canScrollPrev}
              canNext={canScrollNext}
              size="sm"
            />
          )}
        </div>
      ) : null}

      {/* Lightbox: Counter top-right, ghost arrows on sides */}
      {showControls && isLightbox && (
        <div className="ui:absolute ui:top-4 ui:right-4 ui:z-10">
          <CarouselCounter current={currentIndex} total={totalPositions} />
        </div>
      )}
      {showControls && isLightbox && showArrows && (
        <CarouselNavigation
          onPrev={handlePrev}
          onNext={handleNext}
          canPrev={canScrollPrev}
          canNext={canScrollNext}
          size="md"
          position="sides-inset"
          iconVariant="ghost"
        />
      )}
    </div>
  )
}

export default Carousel
