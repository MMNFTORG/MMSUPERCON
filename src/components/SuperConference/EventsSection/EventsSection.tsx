import React from 'react'
import { Container } from 'react-bootstrap'

import { SiteButton } from '@/components'
import { CONFERENCE_EVENTS } from '@/mocks/eventsScedule'

import './EventsSection.scss'

interface IEventsSectionProps {}

export const EventsSection = ({}: IEventsSectionProps): JSX.Element => {
  return (
    <section className="events-section">
      <Container>
        <h3 className="events-section__title">Event</h3>

        <ul className="events-section__timeline">
          {CONFERENCE_EVENTS.map(({ id, title, day }) => (
            <li key={id} className={'event-item'}>
              <div className="event-item__day">Day {day}</div>

              <div className="event-item__title">{title}</div>
            </li>
          ))}
        </ul>

        <div className="events-section__buttons-wrapper">
          <SiteButton color={'TRANSPARENT'} bordered size={'large'}>
            RSVP Now
          </SiteButton>
          <SiteButton color={'RED'} size={'large'}>
            Buy Ticket
          </SiteButton>
        </div>
      </Container>
    </section>
  )
}
