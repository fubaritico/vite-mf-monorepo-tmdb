import clsx from 'clsx'

import { Icon } from '../Icon'

import type { IconName, IconSize } from '../Icon'
import type { ButtonHTMLAttributes, FC } from 'react'

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Icon name to display */
  icon: IconName
  /** Visual variant of the button */
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  /** Size of the button */
  size?: 'sm' | 'md' | 'lg'
  /** Accessible label for screen readers */
  'aria-label': string
}

const sizeMap: Record<'sm' | 'md' | 'lg', { button: string; icon: IconSize }> =
  {
    sm: { button: 'ui:h-8 ui:w-8', icon: 16 },
    md: { button: 'ui:h-10 ui:w-10', icon: 20 },
    lg: { button: 'ui:h-12 ui:w-12', icon: 24 },
  }

const IconButton: FC<IconButtonProps> = ({
  className,
  icon,
  variant = 'ghost',
  size = 'md',
  disabled,
  ...rest
}) => {
  const { button: buttonSize, icon: iconSize } = sizeMap[size]

  return (
    <button
      className={clsx(
        'ui:inline-flex ui:items-center ui:justify-center ui:cursor-pointer ui:rounded-full ui:transition-colors',
        'ui:focus:outline-none ui:focus:ring-2 ui:focus:ring-ring ui:focus:ring-offset-2',
        'ui:disabled:pointer-events-none ui:disabled:opacity-50',
        {
          'ui:bg-primary ui:text-primary-foreground ui:hover:bg-primary/90':
            variant === 'primary',
          'ui:bg-secondary ui:text-secondary-foreground ui:hover:bg-secondary/80':
            variant === 'secondary',
          'ui:hover:bg-accent ui:hover:text-accent-foreground':
            variant === 'ghost',
          'ui:border ui:border-input ui:bg-background ui:hover:bg-accent ui:hover:text-accent-foreground':
            variant === 'outline',
        },
        buttonSize,
        className
      )}
      disabled={disabled}
      {...rest}
    >
      <Icon name={icon} size={iconSize} />
    </button>
  )
}

export default IconButton
