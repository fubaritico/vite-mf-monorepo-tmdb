import clsx from 'clsx'
import { useEffect } from 'react'

import { useTabsContext } from './TabsContext'
import { useTabsListContext } from './TabsListContext'

import type { ButtonHTMLAttributes, FC, KeyboardEvent, ReactNode } from 'react'

export interface TabsTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Value that identifies this tab */
  value: string
  /** Optional icon component */
  icon?: ReactNode
}

const TabsTrigger: FC<TabsTriggerProps> = ({
  value,
  icon,
  disabled,
  className,
  children,
  ...rest
}) => {
  const { value: activeValue, onValueChange, variant } = useTabsContext()
  const { registerTrigger, unregisterTrigger, getTriggers, isDisabled } =
    useTabsListContext()

  const isActive = value === activeValue

  useEffect(() => {
    registerTrigger(value, disabled)
    return () => {
      unregisterTrigger(value)
    }
  }, [value, disabled, registerTrigger, unregisterTrigger])

  const handleClick = () => {
    if (!disabled) {
      onValueChange(value)
    }
  }

  const findNextEnabledTab = (
    triggers: string[],
    startIndex: number,
    direction: 1 | -1
  ): number => {
    const length = triggers.length
    let index = startIndex

    for (let i = 0; i < length; i++) {
      index = (index + direction + length) % length
      if (!isDisabled(triggers[index])) {
        return index
      }
    }
    return startIndex
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return

    const triggers = getTriggers()
    const currentIndex = triggers.indexOf(value)
    let newIndex = currentIndex

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault()
        newIndex = findNextEnabledTab(triggers, currentIndex, -1)
        break
      case 'ArrowRight':
        event.preventDefault()
        newIndex = findNextEnabledTab(triggers, currentIndex, 1)
        break
      case 'Home':
        event.preventDefault()
        newIndex = 0
        while (newIndex < triggers.length && isDisabled(triggers[newIndex])) {
          newIndex++
        }
        break
      case 'End':
        event.preventDefault()
        newIndex = triggers.length - 1
        while (newIndex >= 0 && isDisabled(triggers[newIndex])) {
          newIndex--
        }
        break
      default:
        return
    }

    const newValue = triggers[newIndex]
    if (newValue && newValue !== value) {
      onValueChange(newValue)
    }
  }

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-controls={`tabpanel-${value}`}
      id={`tab-${value}`}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      className={clsx(
        'ui:px-4 ui:py-2 ui:font-roboto ui:text-sm ui:font-medium',
        'ui:flex ui:items-center ui:gap-2',
        'ui:transition-colors ui:duration-200',
        'focus-visible:ui:outline-none focus-visible:ui:ring-2 focus-visible:ui:ring-ring focus-visible:ui:ring-offset-2',
        !disabled && 'ui:cursor-pointer',
        variant === 'underline' && [
          'ui:relative ui:border-b-2 ui:border-transparent ui:-mb-px',
          isActive
            ? 'ui:text-primary ui:border-primary'
            : 'ui:text-muted-foreground hover:ui:text-foreground',
          disabled &&
            'ui:text-muted-foreground/50 ui:cursor-not-allowed hover:ui:text-muted-foreground/50',
        ],
        variant === 'pills' && [
          'ui:rounded-md',
          isActive
            ? 'ui:bg-primary ui:text-white ui:shadow-sm'
            : 'ui:text-muted-foreground hover:ui:text-foreground',
          disabled &&
            'ui:text-muted-foreground/50 ui:cursor-not-allowed hover:ui:text-muted-foreground/50',
        ],
        className
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {icon && icon}
      {children}
    </button>
  )
}

export default TabsTrigger
