import clsx from 'clsx'
import { useRef } from 'react'

import { useTabsContext } from './TabsContext'
import { TabsListContext } from './TabsListContext'

import type { FC, HTMLAttributes } from 'react'

export type TabsListProps = HTMLAttributes<HTMLDivElement>

const TabsList: FC<TabsListProps> = ({ className, children, ...rest }) => {
  const { variant } = useTabsContext()
  const triggersRef = useRef<string[]>([])
  const disabledRef = useRef<Set<string>>(new Set())

  const registerTrigger = (value: string, disabled?: boolean) => {
    if (!triggersRef.current.includes(value)) {
      triggersRef.current.push(value)
    }
    if (disabled) {
      disabledRef.current.add(value)
    } else {
      disabledRef.current.delete(value)
    }
  }

  const unregisterTrigger = (value: string) => {
    triggersRef.current = triggersRef.current.filter((v) => v !== value)
    disabledRef.current.delete(value)
  }

  const getTriggers = () => triggersRef.current
  const isDisabled = (value: string) => disabledRef.current.has(value)

  return (
    <TabsListContext.Provider
      value={{ registerTrigger, unregisterTrigger, getTriggers, isDisabled }}
    >
      <div
        className={clsx(
          'ui:flex ui:gap-1',
          variant === 'underline' && 'ui:border-b ui:border-border',
          variant === 'pills' && 'ui:bg-muted ui:p-1 ui:rounded-lg ui:w-fit',
          className
        )}
        role="tablist"
        {...rest}
      >
        {children}
      </div>
    </TabsListContext.Provider>
  )
}

export default TabsList
