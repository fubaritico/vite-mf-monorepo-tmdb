import clsx from 'clsx'
import { useContext, useEffect, useRef } from 'react'

import { MenuContext } from './MenuContext'

import type { FC, LiHTMLAttributes, ReactNode } from 'react'

export interface MenuItemProps
  extends Omit<LiHTMLAttributes<HTMLLIElement>, 'children'> {
  /** Unique value identifying this item, passed to onSelect */
  value: string
  /** Whether the item is non-interactive */
  disabled?: boolean
  /** Item content (text or rich JSX) */
  children: ReactNode
  /** Position index for keyboard navigation ordering */
  index: number
}

const MenuItem: FC<MenuItemProps> = ({
  value,
  disabled = false,
  children,
  index,
  className,
  ...rest
}) => {
  const context = useContext(MenuContext)
  if (!context) throw new Error('Menu.Item must be used within Menu')

  const {
    activeIndex,
    selectedValue,
    variant,
    onSelect,
    registerItem,
    unregisterItem,
    getItemId,
  } = context
  const isDark = variant === 'dark'
  const ref = useRef<HTMLLIElement>(null)

  const isActive = activeIndex === index
  const isSelected = selectedValue === value
  const itemId = getItemId(index)

  useEffect(() => {
    registerItem(index, value, disabled)
    return () => {
      unregisterItem(index)
    }
  }, [index, value, disabled, registerItem, unregisterItem])

  useEffect(() => {
    if (isActive && ref.current && 'scrollIntoView' in ref.current) {
      ref.current.scrollIntoView({ block: 'nearest' })
    }
  }, [isActive])

  /** Selects this item on click (no-op when disabled) */
  const handleClick = () => {
    if (!disabled) onSelect(value)
  }

  return (
    <li
      ref={ref}
      id={itemId}
      role="option"
      aria-selected={isSelected}
      aria-disabled={disabled || undefined}
      data-active={isActive || undefined}
      className={clsx(
        'ui:cursor-pointer ui:select-none ui:rounded ui:px-3 ui:py-2 ui:text-sm ui:font-roboto ui:transition-colors',
        isDark ? 'ui:text-neutral-200' : 'ui:text-foreground',
        disabled && 'ui:pointer-events-none ui:opacity-50',
        !disabled &&
          !isActive &&
          !isSelected &&
          (isDark
            ? 'ui:hover:bg-neutral-800 ui:hover:text-white'
            : 'ui:hover:bg-secondary ui:hover:text-secondary-foreground'),
        isActive &&
          !disabled &&
          (isDark
            ? 'ui:bg-primary/25 ui:text-white'
            : 'ui:bg-primary/20 ui:text-primary-foreground'),
        isSelected &&
          !isActive &&
          (isDark
            ? 'ui:bg-primary/15 ui:font-medium ui:text-primary'
            : 'ui:bg-primary/10 ui:font-medium ui:text-primary-hover'),
        className
      )}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </li>
  )
}

export default MenuItem
