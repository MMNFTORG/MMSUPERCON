import React from 'react'
import { formatISO9075 } from 'date-fns'

import './TimePeriod.css'

interface ITimePeriod {
  opened?: Date
  closed?: Date
}

export const TimePeriod = ({ opened, closed }: ITimePeriod) => {
  return (
    <div className={'time-period time-period--double mt-5'}>
      <div className={'time-period__item'}>
        <dt className="time-period__name grey-text">Opened</dt>
        <dd className="time-period__value">
          {opened ? formatISO9075(opened) : 'TBA'}
        </dd>
      </div>
      <div className="time-period__separator" />
      <div className={'time-period__item'}>
        <dt className="time-period__name grey-text">Closed</dt>
        <dd className="time-period__value">
          {closed ? formatISO9075(closed) : 'TBA'}
        </dd>
      </div>
    </div>
  )
}
