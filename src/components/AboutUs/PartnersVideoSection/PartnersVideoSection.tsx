import React from 'react'
import { Container } from 'react-bootstrap'

import { VideoBlock } from '@/components'

import './PartnersVideoSection.scss'

interface IPartnersVideoSectionProps {
  videoId: string
  partnersBlock: JSX.Element
  videoPoster: string
}

export const PartnersVideoSection = ({
  videoId,
  partnersBlock,
  videoPoster
}: IPartnersVideoSectionProps): JSX.Element => {
  return (
    <div className="partners-video-section">
      <Container>
        <div className="partners-video-section__partners">{partnersBlock}</div>
        <div className="partners-video-section__video">
          <VideoBlock videoId={videoId} posterImage={videoPoster} />
        </div>
      </Container>
    </div>
  )
}
