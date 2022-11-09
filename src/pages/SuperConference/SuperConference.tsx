import React from 'react'

import { PartnerSection } from '@/components'
import { SpeakersTopicEnum } from '@/mocks/speakers'

import {
  CallToActionBlock,
  ConferencePartners,
  SuperConferenceBanner,
  TopicBlock
} from '@components/SuperConference'
import { EventsSection } from '@components/SuperConference/EventsSection/EventsSection'
import { KeynoteSpeakers } from '@components/SuperConference/KeynoteSpeakers'

import './SuperConference.scss'

interface ISuperConferenceProps {}

export const SuperConference = ({}: ISuperConferenceProps): JSX.Element => {
  const topics = Object.values(SpeakersTopicEnum)
  return (
    <main className={'super-conference-page'}>
      <SuperConferenceBanner />

      <CallToActionBlock />

      <KeynoteSpeakers withBackground />

      {topics.map((item: string, index) => (
        <TopicBlock
          title={item}
          topic={item as SpeakersTopicEnum}
          key={item}
          greyBg={index % 2 === 0}
        />
      ))}

      {/*<ConferencePartners />*/}

      <PartnerSection />
      <EventsSection />
    </main>
  )
}

export default SuperConference
