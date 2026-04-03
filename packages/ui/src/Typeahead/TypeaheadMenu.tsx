import clsx from 'clsx'
import { useContext } from 'react'

import { ListboxList } from '../Listbox'

import { TypeaheadContext } from './TypeaheadContext'

import type { ComponentProps, FC } from 'react'

/** Props for Typeahead.Menu — omits variant (managed by context) */
export type TypeaheadMenuProps = Omit<
  ComponentProps<typeof ListboxList>,
  'variant'
>

/**
 * Dropdown listbox for the Typeahead compound component.
 *
 * Renders an absolutely-positioned `<ul role="listbox">` below the input
 * when the menu is open. Styled with light/dark variant from context.
 * Contains `Typeahead.Item` and/or `Typeahead.Empty` children.
 *
 * Must be used within a `<Typeahead>` provider.
 */
const TypeaheadMenu: FC<TypeaheadMenuProps> = ({
  className,
  children,
  ...rest
}) => {
  const context = useContext(TypeaheadContext)
  if (!context) throw new Error('Typeahead.Menu must be used within Typeahead')

  const { isOpen, menuId, variant } = context

  if (!isOpen) return null

  return (
    <ListboxList
      variant={variant}
      id={menuId}
      role="listbox"
      className={clsx(
        'ui:absolute ui:left-0 ui:z-50 ui:mt-1 ui:w-full',
        className
      )}
      {...rest}
    >
      {children}
    </ListboxList>
  )
}

export default TypeaheadMenu
