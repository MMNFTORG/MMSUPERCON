import React from 'react'
import { Container, Image } from 'react-bootstrap'

import { SUPER_CONFERENCE_PARTNERS } from '@/mocks/superConferencePartners'

import './ConferencePartners.scss'

interface IConferencePartnersProps {}

export const ConferencePartners =
  ({}: IConferencePartnersProps): JSX.Element => {
    return (
      <section className="conference-partners">
        <Container>
          <div className="conference-partners__title">
            <h3>
              <span>
                <span className={'section-title__bordered-text'}>We have </span>
                partnered with{' '}
                <span className={'section-title__bordered-text'}>
                  some of the
                </span>
              </span>{' '}
              <br />
              <span className={'text-big'}>top brands in the space</span>
            </h3>
          </div>

          <div className="conference-partners__wrapper">
            {SUPER_CONFERENCE_PARTNERS.map(({ image, id, name, link }) => (
              <a href={link} target={'_blank'} key={id}>
                <Image src={image} alt={name} />
              </a>
            ))}
          </div>
        </Container>
      </section>
    )
  }
