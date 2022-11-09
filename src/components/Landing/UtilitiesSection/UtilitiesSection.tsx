import React from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'

import { UTILITIES } from '@/mocks/utilities'

import './UtilitiesSection.scss'

export const UtilitiesSection = () => {
  return (
    <section className={'utilities-section'}>
      <Container>
        <h2 className={'section-title'}>Utilities</h2>

        <Row>
          {UTILITIES.map(({ image, title, description }, index) => (
            <Col
              xl={4}
              lg={6}
              md={12}
              key={title}
              className={'d-flex justify-content-center'}
            >
              <div className="utility-card">
                <div className="utility-card__image">
                  <Image src={image} alt={'utility'} />
                </div>

                <div className="utility-card__body">
                  <h4 className="utility-card__title">{title}</h4>
                  <span className="utility-card__description">
                    {description}
                  </span>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}
