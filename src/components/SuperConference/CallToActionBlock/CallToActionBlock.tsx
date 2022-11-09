import React from 'react'
import { Container } from 'react-bootstrap'

import { SiteButton } from '@/components'

import './CallToActionBlock.scss'

interface ICallToActionBlockProps {}

export const CallToActionBlock = ({}: ICallToActionBlockProps): JSX.Element => {
  return (
    <div className="call-to-action-block">
      <Container>
        <div className="call-to-action-block__description">
          MM Super Conference is a multi-day conference where only MMNFT ticket
          holders will experience an extraordinary lineup of speakers from all
          verticals of entrepreneurship.
        </div>

        <div className="call-to-action-block__button-wrapper d-flex justify-content-center">
          <SiteButton color={'TRANSPARENT'} bordered size={'large'}>
            RSVP Now
          </SiteButton>
          <SiteButton color={'RED'} size={'large'}>
            Buy Ticket
          </SiteButton>
        </div>
      </Container>
    </div>
  )
}
