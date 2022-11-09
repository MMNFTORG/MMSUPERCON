import React from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'

import SignImage from '@assets/Landing/grafiti.png'

import './TopBanner.scss'

export const TopBanner = () => {
  return (
    <section className={'top-banner'}>
      <Container>
        <Row>
          <Col md={6}>
            <div className="top-banner__left">
              <h1 className="top-banner__title">
                <span>The Millionaire</span>
                <br />
                <span>Mentor NFT</span>
              </h1>
              <div className="top-banner__description">
                is a Web3 project from Jason Stone that combines multiple
                utility features, from curated in-person and virtual
                experiences, elite networking, a super conference and
                intellectual art.
              </div>
              <div className="top-banner__sign">
                <Image src={SignImage} alt={'sign'} />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
