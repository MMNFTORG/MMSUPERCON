import React from 'react'

import { Event } from '@/components'

import { IEventData } from '@components/Calendar/types'

import './MonthComponent.scss'

interface IMonthComponentProps {
  name: string
  events: IEventData[]
}

export const MonthComponent = ({
  name,
  events
}: IMonthComponentProps): JSX.Element => {
  return (
    <div className={'calendar-month'}>
      <div className="calendar-month__name">{name}</div>

      <div className="calendar-month__event-list">
        {events.map(
          ({ name, image, artist, description, link, date }: IEventData) => (
            <Event
              date={date}
              image={image}
              link={link}
              name={name}
              artist={artist}
              description={description}
            />
          )
        )}
      </div>
    </div>
  )
}
