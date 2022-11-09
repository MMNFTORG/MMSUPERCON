import React from 'react'
import { Container, Image } from 'react-bootstrap'

import JasonSign from '@assets/about-us/person-sign1.png'
import SebastianSign from '@assets/about-us/person-sign2.png'
import JasonImage from '@assets/about-us/top-banner-person1.png'
import SebastianImage from '@assets/about-us/top-banner-person2.png'

import './AboutUsTopBanner.scss'

interface IAboutUsTopBannerProps {}

export const AboutUsTopBanner = ({}: IAboutUsTopBannerProps): JSX.Element => {
  return (
    <div className="about-us-top-banner">
      <Container>
        <h2 className="section-title section-title--white">who we are</h2>
        <div className="about-us-top-banner__description">
          The Super Conference is a Web3 project from Jason Stone that combines
          multiple utility features, from curated in-person and virtual
          experiences, elite networking, a super conference and intellectual
          art.
          <br />
          <br />
          We are building a community of the coolest people in Web3
        </div>

        <div className="about-us-top-banner__images">
          <div className="about-us-person-image">
            <Image src={JasonImage} />
            <div className="about-us-person-image__desc">Founder, CEO</div>
            <div className="about-us-person-image__sign">
              <Image src={JasonSign} />
            </div>
          </div>
          <div className="about-us-person-image">
            <Image src={SebastianImage} />
            <div className="about-us-person-image__desc">Artist</div>
            <div className="about-us-person-image__sign">
              <Image src={SebastianSign} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
