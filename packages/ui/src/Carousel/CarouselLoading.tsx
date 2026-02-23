import Skeleton from '../Skeleton/Skeleton'

import type { FC } from 'react'

export interface CarouselLoadingProps {
  /** Number of skeleton cards to display */
  count?: number
  /** Width of each card in pixels */
  cardWidth?: number
  /** Height of each card in pixels */
  cardHeight?: number
  /** Show skeleton for title */
  showTitle?: boolean
  /** Show skeleton for subtitle/date */
  showSubtitle?: boolean
}

/**
 * CarouselLoading - Loading state for carousel with skeleton cards
 *
 * Displays a horizontal scrollable list of skeleton placeholders
 * matching the structure of MovieCard components.
 */
const CarouselLoading: FC<CarouselLoadingProps> = ({
  count = 6,
  cardWidth = 150,
  cardHeight = 225,
  showTitle = true,
  showSubtitle = true,
}) => {
  return (
    <div className="ui:overflow-x-auto ui:flex ui:gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{ width: cardWidth, minWidth: cardWidth, maxWidth: cardWidth }}
        >
          <div style={{ width: cardWidth, height: cardHeight }}>
            <Skeleton
              variant="rectangle"
              width="ui:w-full"
              height="ui:h-full"
            />
          </div>
          {(showTitle || showSubtitle) && (
            <div
              style={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              {showTitle && (
                <div style={{ width: cardWidth, height: 16 }}>
                  <Skeleton
                    variant="line"
                    width="ui:w-full"
                    height="ui:h-full"
                  />
                </div>
              )}
              {showSubtitle && (
                <div style={{ width: cardWidth * 0.75, height: 12 }}>
                  <Skeleton
                    variant="line"
                    width="ui:w-full"
                    height="ui:h-full"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default CarouselLoading
