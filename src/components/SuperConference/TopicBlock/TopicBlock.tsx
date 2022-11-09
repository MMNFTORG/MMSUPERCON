import React from 'react'
import { Container } from 'react-bootstrap'
import classNames from 'classnames'

import { getSpeakersByTopic, SpeakersTopicEnum } from '@/mocks/speakers'

import { TopicSpeakersSlider } from '@components/SuperConference'

import './TopicBlock.scss'

interface ITopicBlockProps {
  title: string
  topic: SpeakersTopicEnum
  greyBg?: boolean
}

export const TopicBlock = ({
  title,
  topic,
  greyBg
}: ITopicBlockProps): JSX.Element | null => {
  const speakers = getSpeakersByTopic(topic)
  return speakers.length ? (
    <section
      className={classNames([
        'topic-block',
        {
          'topic-block--grey-bg': greyBg
        }
      ])}
    >
      <Container>
        <h2 className="section-title">{title}</h2>
      </Container>

      <TopicSpeakersSlider speakers={speakers} topic={topic} hidden={true} />
    </section>
  ) : null
}
