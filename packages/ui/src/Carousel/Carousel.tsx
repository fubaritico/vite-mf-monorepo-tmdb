import clsx from 'clsx'
import { useCallback, useEffect, useRef, useState } from 'react'

import CarouselNavigation from './CarouselNavigation'
import CarouselPagination from './CarouselPagination'

import type { FC, ReactNode } from 'react'

/** Carousel visual variant */
export type CarouselVariant = 'standard' | 'hero'

/** Arrow position for navigation buttons */
export type CarouselArrowPosition = 'sides' | 'bottom-right'

export interface CarouselProps {
  /** Carousel items */
  children: ReactNode
  /** Visual variant */
  variant?: CarouselVariant
  /** Show pagination dots */
  showPagination?: boolean
  /** Show navigation arrows */
  showArrows?: boolean
  /** Arrow position */
  arrowPosition?: CarouselArrowPosition
  /** Gap between items in pixels */
  gap?: number
  /** Additional class name */
  className?: string
}

/**
 * Carousel component with horizontal scroll, pagination, and navigation.
 * Supports two variants: standard (multi-items) and hero (single panoramic item).
 * Pagination is responsive and recalculates on resize.
 */
const Carousel: FC<CarouselProps> = ({
  children,
  variant = 'standard',
  showPagination = true,
  showArrows = true,
  arrowPosition = 'sides',
  gap = 16,
  className,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [totalPositions, setTotalPositions] = useState(1)

  const isHero = variant === 'hero'

  /**
   * Calculates the total number of scroll positions based on container and item dimensions.
   * For hero variant: positions = number of items (one per slide).
   * For standard variant: positions = ceil(maxScrollLeft / itemWidth) + 1.
   */
  const calculatePositions = useCallback(() => {
    const container = scrollRef.current
    if (!container) return

    const items = container.children

    if (isHero) {
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
  }, [gap, isHero])

  /**
   * Effect: Recalculates positions when children or calculatePositions function changes.
   * Ensures pagination reflects the current number of items.
   */
  useEffect(() => {
    calculatePositions()
  }, [children, calculatePositions])

  /**
   * Effect: Sets up ResizeObserver to recalculate positions on viewport/container resize.
   * Critical for responsive pagination - updates totalPositions when window is resized.
   * Cleanup disconnects observer on unmount.
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
   * Handles scroll events to update the current index based on scroll position.
   * Uses item width to determine which position is currently active.
   */
  const handleScroll = useCallback(() => {
    const container = scrollRef.current
    if (!container) return

    const scrollLeft = container.scrollLeft
    const firstItem = container.children[0] as HTMLElement | undefined
    const itemWidth = isHero
      ? container.offsetWidth
      : (firstItem?.offsetWidth ?? 0)

    if (itemWidth > 0) {
      const index = Math.round(scrollLeft / (itemWidth + gap))
      setCurrentIndex(Math.min(index, totalPositions - 1))
    }
  }, [gap, isHero, totalPositions])

  /**
   * Effect: Attaches scroll event listener to sync current index with scroll position.
   * Updates pagination dots and navigation button states based on scroll.
   * Cleanup removes listener on unmount.
   */
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
   * @param index - The target position index to scroll to
   */
  const scrollTo = useCallback(
    (index: number) => {
      const container = scrollRef.current
      if (!container) return

      const firstItem = container.children[0] as HTMLElement | undefined
      const itemWidth = isHero
        ? container.offsetWidth
        : (firstItem?.offsetWidth ?? 0)

      // For the last position, scroll to the absolute end
      const isLastPosition = index === totalPositions - 1
      const scrollLeft = isLastPosition
        ? container.scrollWidth - container.offsetWidth
        : index * (itemWidth + gap)

      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth',
      })
    },
    [gap, isHero, totalPositions]
  )

  /** Scrolls to the previous position if available */
  const scrollPrev = useCallback(() => {
    if (currentIndex > 0) {
      scrollTo(currentIndex - 1)
    }
  }, [currentIndex, scrollTo])

  /** Scrolls to the next position if available */
  const scrollNext = useCallback(() => {
    if (currentIndex < totalPositions - 1) {
      scrollTo(currentIndex + 1)
    }
  }, [currentIndex, totalPositions, scrollTo])

  /** Whether previous navigation is available */
  const canScrollPrev = currentIndex > 0
  /** Whether next navigation is available */
  const canScrollNext = currentIndex < totalPositions - 1
  /** Whether to show controls (pagination/arrows) - hidden if all items visible */
  const showControls = totalPositions > 1

  return (
    <div className={clsx('ui:relative', className)}>
      {/* Scroll container */}
      <div
        ref={scrollRef}
        className={clsx(
          'ui:flex ui:overflow-x-auto ui:scroll-smooth ui:scrollbar-none',
          isHero && 'ui:snap-x ui:snap-mandatory'
        )}
        style={{ gap: `${String(gap)}px` }}
      >
        {children}
      </div>

      {/* Arrows - sides position (standard only) */}
      {showControls && showArrows && arrowPosition === 'sides' && !isHero && (
        <CarouselNavigation
          onPrev={scrollPrev}
          onNext={scrollNext}
          canPrev={canScrollPrev}
          canNext={canScrollNext}
          size="md"
          position="sides"
        />
      )}

      {/* Hero: Pagination centered, Arrows bottom-right */}
      {showControls && isHero && showPagination && (
        <div className="ui:absolute ui:bottom-4 ui:left-1/2 ui:-translate-x-1/2">
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
          onPrev={scrollPrev}
          onNext={scrollNext}
          canPrev={canScrollPrev}
          canNext={canScrollNext}
          size="sm"
          className="ui:absolute ui:bottom-4 ui:right-4"
        />
      )}

      {/* Standard: Pagination + Arrows below */}
      {showControls &&
      !isHero &&
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
              onPrev={scrollPrev}
              onNext={scrollNext}
              canPrev={canScrollPrev}
              canNext={canScrollNext}
              size="sm"
            />
          )}
        </div>
      ) : null}
    </div>
  )
}

export default Carousel
