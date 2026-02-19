import clsx from 'clsx'
import { useState } from 'react'

import { TabsContext } from './TabsContext'
import TabsList from './TabsList'
import TabsTrigger from './TabsTrigger'

import type { FC, HTMLAttributes } from 'react'

/** Tabs visual variant */
export type TabsVariant = 'underline' | 'pills'

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  /** Default active tab value (uncontrolled) */
  defaultValue?: string
  /** Controlled active tab value */
  value?: string
  /** Callback when tab changes */
  onValueChange?: (value: string) => void
  /** Visual variant */
  variant?: TabsVariant
}

/**
 * Tabs component for navigation between content sections.
 * Implements ARIA tabs pattern for accessibility.
 * Supports underline and pills variants.
 * Uses Compound Component pattern.
 */
const Tabs: FC<TabsProps> & {
  List: typeof TabsList
  Trigger: typeof TabsTrigger
} = ({
  defaultValue = '',
  value,
  onValueChange,
  variant = 'underline',
  className,
  children,
  ...rest
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue)

  const activeValue = value ?? internalValue
  const isControlled = value !== undefined

  const handleValueChange = (newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue)
    }
    onValueChange?.(newValue)
  }

  return (
    <TabsContext.Provider
      value={{ value: activeValue, onValueChange: handleValueChange, variant }}
    >
      <div className={clsx('ui:w-full', className)} {...rest}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

Tabs.List = TabsList
Tabs.Trigger = TabsTrigger

export default Tabs
