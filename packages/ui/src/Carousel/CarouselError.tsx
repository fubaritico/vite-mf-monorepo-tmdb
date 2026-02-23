import { Icon } from '../Icon'

import type { FC } from 'react'

export interface CarouselErrorProps {
  message?: string
}

const CarouselError: FC<CarouselErrorProps> = ({
  message = 'Failed to load data',
}) => {
  return (
    <div className="ui:flex ui:flex-col ui:items-center ui:justify-center ui:gap-3 ui:rounded-lg ui:border ui:border-red-200 ui:bg-red-50 ui:p-8 ui:text-center">
      <Icon name="ExclamationTriangle" size={48} className="ui:text-red-500" />
      <div className="ui:flex ui:flex-col ui:gap-1">
        <p className="ui:text-sm ui:font-semibold ui:text-red-900">
          Failed to fetch data
        </p>
        <p className="ui:text-sm ui:text-red-700">{message}</p>
      </div>
    </div>
  )
}

export default CarouselError
