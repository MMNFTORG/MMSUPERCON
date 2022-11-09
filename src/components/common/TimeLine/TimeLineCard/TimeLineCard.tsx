import React from 'react'
import { Col, Row } from 'react-bootstrap'
import classNames from 'classnames'

import DefaultTimelineBackgroundImage from '@assets/timeline/timeline-item-bg.png'

import { ITimeLineItem } from '../types'

import './TimeLineCard.css'

interface ITimeLineCardProps extends ITimeLineItem {
  direction?: 'left' | 'right'
}

export const TimeLineCard = ({
  year,
  timePeriod,
  title,
  description,
  direction = 'right',
  image
}: ITimeLineCardProps) => {
  return (
    <Row>
      <Col xl={{ span: 6, offset: direction === 'left' ? 0 : 6 }}>
        <div
          className={classNames([
            'timeline-item',
            { 'timeline-item--left': direction === 'left' }
          ])}
        >
          <div className="timeline-item__date">
            <span>{timePeriod}</span>
            <span>{year}</span>
          </div>
          <div className="timeline-item__card">
            <div
              className="timeline-item__background"
              style={{
                backgroundImage: `url(${
                  image || DefaultTimelineBackgroundImage
                })`
              }}
            />
            <h4 className="timeline-item__title">{title}</h4>
            <p className="timeline-item__description">{description}</p>
          </div>
        </div>
      </Col>
    </Row>
  )
}
