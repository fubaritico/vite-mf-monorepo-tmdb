import clsx from 'clsx'
import { useCallback, useEffect, useRef, useState } from 'react'

import CarouselNavigation from './CarouselNavigation'
import CarouselPagination from './CarouselPagination'

import type { FC, ReactNode } from 'react'

export type CarouselVariant = 'standard' | 'hero'
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

  useEffect(() => {
    calculatePositions()
  }, [children, calculatePositions])

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

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    container.addEventListener('scroll', handleScroll)
    return () => {
      container.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  const scrollTo = useCallback(
    (index: number) => {
      const container = scrollRef.current
      if (!container) return

      const firstItem = container.children[0] as HTMLElement | undefined
      const itemWidth = isHero
        ? container.offsetWidth
        : (firstItem?.offsetWidth ?? 0)

      container.scrollTo({
        left: index * (itemWidth + gap),
        behavior: 'smooth',
      })
    },
    [gap, isHero]
  )

  const scrollPrev = useCallback(() => {
    if (currentIndex > 0) {
      scrollTo(currentIndex - 1)
    }
  }, [currentIndex, scrollTo])

  const scrollNext = useCallback(() => {
    if (currentIndex < totalPositions - 1) {
      scrollTo(currentIndex + 1)
    }
  }, [currentIndex, totalPositions, scrollTo])

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
