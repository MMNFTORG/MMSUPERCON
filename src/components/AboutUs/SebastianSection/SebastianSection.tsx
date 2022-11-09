import React from 'react'
import { Container, Image } from 'react-bootstrap'

import SebastianImage from '@assets/about-us/sebastian-image.png'

import './SebastianSection.scss'

interface ISebastianSectionProps {}

export const SebastianSection = ({}: ISebastianSectionProps): JSX.Element => {
  return (
    <div className="sebastian-section">
      <Container>
        <div className="sebastian-section__wrapper">
          <div className="sebastian-section__info">
            <h2 className="section-title">
              My name is
              <div className="section-title__red-bg">
                <span>Sebastian Kovacs</span>
              </div>
            </h2>

            <p>
              I went from painting the streets to helping billion dollar brands
              bring their wildest visions to life through my art and content.
            </p>
            <p>
              Now, I travel the world creating the most badass artwork I
              possibly can while teaching others the secrets of professional
              branding in the modern age.
            </p>
            <p>
              Sebastian Kovacs — a street artist turned professional artist, and
              now he helps companies bring their wildest visions into reality
              through his work!
            </p>
          </div>

          <div className="sebastian-section__image">
            <Image src={SebastianImage} />
          </div>
        </div>
      </Container>
    </div>
  )
}
