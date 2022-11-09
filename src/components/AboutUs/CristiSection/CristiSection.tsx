import React from 'react'
import { Container, Image } from 'react-bootstrap'

import { DynamicImage } from '@/components'

import CristyImage from '@assets/about-us/cristi-image.png'

import './CristiSection.scss'

interface ICristiSectionProps {}

export const CristiSection = ({}: ICristiSectionProps): JSX.Element => {
  return (
    <div className="cristi-section">
      <Container>
        <div className="cristi-section__wrapper">
          <div className="cristi-section__info">
            <h2 className="section-title">
              Hello
              <div className="section-title__red-bg">
                <span>I'm Cristi Stone</span>
              </div>
            </h2>

            <p>
              Cristi is a mommy of 2, a wife, entrepreneur, business owner,
              speaker, and mentor. She leads an organization of over 11 thousand
              women, helping them build confidence and getting them on the road
              to financial freedom. Christi's goal is to have a positive impact
              on anyone she crosses paths with. Always encouraging people step
              out of their comfort zones and search for the ability to live a
              life of abundance & freedom.
            </p>

            <div className="cristi-section__inst">
              <a href={'https://instagram.com/cristi__stone'} target={'_blank'}>
                <DynamicImage path={'about-us/socials/inst.svg'} />
                cristi__stone
              </a>
            </div>
          </div>

          <div className="cristi-section__image">
            <Image src={CristyImage} />
          </div>
        </div>
      </Container>
    </div>
  )
}
