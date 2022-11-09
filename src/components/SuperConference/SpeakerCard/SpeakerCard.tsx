import React from 'react'

import { DynamicImage } from '@/components'
import { ISpeaker } from '@/mocks/speakers'

import './SpeakerCard.scss'

interface ISpeakerCardProps extends ISpeaker {}

export const SpeakerCard = ({
  id,
  topic,
  avatar,
  name,
  socialMedia
}: ISpeakerCardProps) => {
  return (
    <div className={'speaker-card'}>
      <div className="speaker-card__img">
        <DynamicImage path={`super-conference/speakers/${avatar}`} />
      </div>

      <div className="speaker-card__body">
        <div className="speaker-card__name">{name}</div>
        <div className="speaker-card__hover-block">
          <div className="speaker-card__topic">{topic}</div>
          <ul className="speaker-card__socials">
            {socialMedia?.length &&
              socialMedia.map((item) => (
                <li key={item.name}>
                  <a href={item.url} target={'_blank'}>
                    <DynamicImage path={`socials/${item.name}.svg`} />
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
