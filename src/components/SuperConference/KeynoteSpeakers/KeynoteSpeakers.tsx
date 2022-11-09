import React from 'react'
import classNames from 'classnames'

import { getKeynoteSpeakers, SPEAKERS } from '@/mocks/speakers'

import { KeynoteSpeakersSlider } from '@components/SuperConference/KeynoteSpeakers/KeynoteSpeakersSlider'

import './KeynoteSpeakers.scss'

interface IKeynoteSpeakersProps {
  withBackground?: boolean
}

export const KeynoteSpeakers = ({ withBackground }: IKeynoteSpeakersProps) => {
  const keynoteSpeakers = getKeynoteSpeakers(SPEAKERS)

  return (
    <section
      className={classNames([
        'keynote-speakers',
        { 'keynote-speakers--with-bg': withBackground }
      ])}
    >
      <KeynoteSpeakersSlider
        speakers={keynoteSpeakers}
        title={'Keynote Speakers'}
      />
    </section>
  )
}
