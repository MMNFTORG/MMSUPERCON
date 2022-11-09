import React from 'react'
import classNames from 'classnames'

import { DynamicImage } from '@/components'
import { IRoadmapItem } from '@/mocks/roadmap'

import './RoadmapItem.scss'

interface IRoadmapItemProps extends IRoadmapItem {}

export const RoadmapItem = ({ id, status, title }: IRoadmapItemProps) => {
  return (
    <div
      className={classNames([
        'roadmap-item',
        {
          'roadmap-item--passed': status === 'passed',
          'roadmap-item--active': status === 'active'
        }
      ])}
      key={id}
    >
      <div className="roadmap-item__icon">
        <DynamicImage path={`roadmap/${title}.svg`} />
      </div>
      <div className="roadmap-item__title">{title}</div>
    </div>
  )
}
