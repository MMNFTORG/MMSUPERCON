import React from 'react'
import { Container, Image } from 'react-bootstrap'

import { PARTNERS } from '@/mocks/partners'

import './PartnerSection.scss'

interface IPartnerSectionProps {}

export const PartnerSection = ({}: IPartnerSectionProps): JSX.Element => {
  return (
    <section className="partner-section">
      <Container>
        <h2 className="section-title">
          <span className="section-title__bordered-text">Meet our </span>
          Partners
        </h2>
        <p className="section-under-title">
          We've partnered with some of the top brands in the space
        </p>

        <div className="partner-wrapper">
          {PARTNERS.map((partner) => (
            <a
              className={'partner-item'}
              key={partner.name}
              href={partner.url}
              target={'_blank'}
            >
              <Image
                src={partner.logo}
                title={partner.name}
                alt={partner.name}
              />
            </a>
          ))}
        </div>
      </Container>
    </section>
  )
}
