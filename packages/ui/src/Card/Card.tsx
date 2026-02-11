import clsx from 'clsx'

import type { FC, HTMLAttributes } from 'react'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Visual variant of the card */
  variant?: 'default' | 'outline'
}

const Card: FC<CardProps> = ({
  className,
  variant = 'default',
  children,
  ...rest
}) => {
  return (
    <div
      className={clsx(
        'ui:rounded ui:p-4',
        {
          'ui:bg-card ui:text-card-foreground ui:shadow-md':
            variant === 'default',
          'ui:border ui:border-border ui:bg-transparent': variant === 'outline',
        },
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

export default Card
