import React from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import { generatePath } from 'react-router-dom'
import { RoutesPaths } from '@router/constants'

import { SiteButton } from '@/components'

import { useMediaDimensions } from '@hooks/useMediaDimensions'

import VideoImage from '@assets/super-conference/video-bg.png'

import './SuperConferenceBanner.scss'

interface ISuperConferenceBannerProps {
  withButton?: boolean
}

const SuperConferenceVideoBlock = () => (
  <div className="supper-conference-banner__video">
    <Image src={VideoImage} />
  </div>
)

export const SuperConferenceBanner = ({
  withButton
}: ISuperConferenceBannerProps) => {
  const { lg } = useMediaDimensions()

  return (
    <section className={'supper-conference-banner'}>
      <Container>
        <Row>
          <Col lg={6}>
            <div className="super-conference-left">
              <h2 className="section-title section-title--white">
                <div className="section-title__red-bg">
                  <span>MMNFT Super</span>
                  <br />
                  <span>Conference</span>
                </div>
                10,000 People <br /> 3 Day Event
              </h2>

              {withButton && (
                <div className="super-conference-left__button">
                  <SiteButton
                    size={'large'}
                    color={'TRANSPARENT'}
                    bordered
                    to={generatePath(RoutesPaths.SUPER_CONFERENCE)}
                  >
                    Read more
                  </SiteButton>
                </div>
              )}
            </div>
          </Col>
          <Col lg={6}>
            <SuperConferenceVideoBlock />
          </Col>
        </Row>
      </Container>

      <div className="supper-conference-banner__snake-line">
        <ul className={'sneak-peak-text'}>
          <li>Sales</li>
          <li>Marketing</li>
          <li>Personal Development</li>
          <li>Social Media</li>
          <li>Ecommerce</li>
          <li>Real Estate</li>
          <li>Real Estate</li>
          <li>Finance</li>
          <li>fitness</li>
        </ul>
      </div>
    </section>
  )
}
