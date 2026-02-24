import clsx from 'clsx'
import { createElement } from 'react'

import type { ElementType, FC, HTMLAttributes, ReactNode } from 'react'

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body'
  | 'body-sm'
  | 'body-lg'
  | 'lead'
  | 'caption'
  | 'caption-xs'
  | 'label'
  | 'muted'
  | 'blockquote'

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  /** Visual style variant */
  variant: TypographyVariant
  /** Override semantic HTML tag */
  as?: ElementType
  /** Additional CSS classes */
  className?: string
  /** Content */
  children: ReactNode
}

const variantStyles: Record<TypographyVariant, string> = {
  h1: 'ui:text-4xl ui:font-bold ui:leading-tight ui:text-foreground',
  h2: 'ui:text-3xl ui:font-bold ui:leading-tight ui:text-foreground',
  h3: 'ui:text-2xl ui:font-semibold ui:leading-snug ui:text-foreground',
  h4: 'ui:text-xl ui:font-semibold ui:leading-snug ui:text-foreground',
  h5: 'ui:text-lg ui:font-medium ui:leading-normal ui:text-foreground',
  h6: 'ui:text-base ui:font-medium ui:leading-normal ui:text-foreground',
  body: 'ui:text-base ui:leading-relaxed ui:text-foreground',
  'body-sm': 'ui:text-sm ui:leading-relaxed ui:text-foreground',
  'body-lg': 'ui:text-lg ui:leading-relaxed ui:text-foreground',
  lead: 'ui:text-xl ui:leading-relaxed ui:text-muted-foreground',
  caption: 'ui:text-sm ui:text-muted-foreground',
  'caption-xs': 'ui:text-xs ui:text-muted-foreground',
  label: 'ui:text-sm ui:font-medium ui:text-foreground',
  muted: 'ui:text-sm ui:text-muted-foreground',
  blockquote:
    'ui:border-l-4 ui:border-border ui:pl-4 ui:italic ui:text-muted-foreground',
}

const variantToTag: Record<TypographyVariant, ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body: 'p',
  'body-sm': 'p',
  'body-lg': 'p',
  lead: 'p',
  caption: 'span',
  'caption-xs': 'span',
  label: 'label',
  muted: 'p',
  blockquote: 'blockquote',
}

const Typography: FC<TypographyProps> = ({
  variant,
  as,
  className,
  children,
  ...rest
}) => {
  const Component = as ?? variantToTag[variant]

  return createElement(
    Component,
    { className: clsx(variantStyles[variant], className), ...rest },
    children
  )
}

export default Typography
