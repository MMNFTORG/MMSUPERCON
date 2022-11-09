import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'

import { MonthComponent } from '@/components'
import { EVENTS_DATA } from '@/mocks/calendar'

import { IEventData, IMonthData } from '@components/Calendar/types'

import { groupDateByMonth } from '@utils/date'

import './Calendar.scss'

export const Calendar = () => {
  const [calendarData, setCalendarData] = useState<IMonthData<IEventData>>({})

  useEffect(() => {
    const mappedData = groupDateByMonth<IEventData>(EVENTS_DATA)
    setCalendarData(mappedData)
  }, [EVENTS_DATA])

  return (
    <main className={'page calendar-page'}>
      <Container>
        <h1 className={'title'}>Upcoming Drops</h1>

        {Object.keys(calendarData).map((key: string) => (
          <MonthComponent key={key} events={calendarData[key]} name={key} />
        ))}
      </Container>
    </main>
  )
}
