import React from 'react'
import { Col, Image, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { IArtistData, IEventData } from '@components/Calendar/types'

import arrowRight from '@assets/right_arrow.svg'

import './Event.scss'

export interface IEventProps extends IEventData {}

export const ArtistComponent = ({ name, image }: IArtistData): JSX.Element => (
  <div className={'artist-component'}>
    <div className={'artist-component__label'}>Artists</div>
    <div className={'d-flex align-items-center'}>
      <div className="artist-component__image">
        <Image src={image} alt={'artist'} />
      </div>

      <div className="artist-component__name">{name}</div>
    </div>
  </div>
)

export const Event = ({
  date,
  name,
  description,
  link,
  image,
  artist
}: IEventProps): JSX.Element => {
  return (
    <Row>
      <Col lg={{ span: 9, offset: 3 }}>
        <div className={'event-card'}>
          <div className="event-card__day">{new Date(date).getDate()}</div>
          <div className="event-card__image">
            <Image src={image} />
          </div>
          <div className="event-card__body">
            <div>
              <h2 className="event-card__title">{name}</h2>
              <div className="event-card__description">{description}</div>
            </div>

            <footer className="event-card__artist">
              <ArtistComponent {...artist} />
            </footer>

            <Link to={link} className={'event-card__link'}>
              <Image src={arrowRight} alt={'arrow'} />
            </Link>
          </div>
        </div>
      </Col>
    </Row>
  )
}
