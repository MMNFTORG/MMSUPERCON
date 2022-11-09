import React, { useEffect, useRef } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import classNames from 'classnames'

import { EDUCATIONS } from '@/mocks/educations'

import { EducationItem } from '@components/Landing/ExploreEducationSection/EducationItem/EducationItem'

import { useMediaDimensions } from '@hooks/useMediaDimensions'
import useWindowScroll from '@hooks/useWindowScroll'

import './ExploreEducationSection.scss'

export const ExploreEducationSection = () => {
  const ref: any = useRef<HTMLDivElement>()
  const { y } = useWindowScroll()

  const { xl } = useMediaDimensions()

  let isOnTop = ref?.current?.getBoundingClientRect()?.top - 100 < 0
  let isOnBot =
    ref?.current?.getBoundingClientRect()?.top +
      ref.current?.clientHeight -
      220 -
      100 <
    0

  useEffect(() => {
    isOnTop = ref?.current?.getBoundingClientRect()?.top - 100 < 0
    isOnBot =
      ref?.current?.getBoundingClientRect()?.top +
        ref.current?.clientHeight -
        220 <
      0
  }, [y])

  return (
    <section className={'explore-education-section'}>
      <Container>
        <Row>
          <Col
            ref={ref}
            lg={3}
            className={classNames([
              { fixed: isOnTop && xl, 'fixed-bot': isOnBot && xl },
              'sticky-block'
            ])}
          >
            <h2 className="section-title section-title--white explore-education-section__title">
              <span className="section-title__bordered-text">Explore</span>
              <br />
              Education
            </h2>
          </Col>

          <Col lg={9}>
            <Row className={'align-items-stretch'}>
              {EDUCATIONS.map(({ ico, title, description }) => (
                <EducationItem
                  ico={ico}
                  title={title}
                  description={description}
                  key={title}
                />
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
