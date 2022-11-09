import React from 'react'

import { TimeLineCard } from './TimeLineCard'
import { ITimeLineItem } from './types'

import './TimeLine.css'

interface ITimeLineProps {
  timelineData: ITimeLineItem[]
}

export const TimeLine = ({ timelineData }: ITimeLineProps) => {
  return (
    <div className={'timeline'}>
      {timelineData.map((item, index) => (
        <TimeLineCard
          {...item}
          direction={(index + 1) % 2 ? 'right' : 'left'}
          key={`${item.title}${item.timePeriod}`}
        />
      ))}
    </div>
  )
}
