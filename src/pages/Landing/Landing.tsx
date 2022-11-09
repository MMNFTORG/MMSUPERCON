import React from 'react'

import {
  ExploreEducationSection,
  KeynoteSpeakers,
  MissionVisionSection,
  PartnerSection,
  RoadmapSection,
  SuperConferenceBanner,
  TeamSection,
  TopBanner,
  UtilitiesSection
} from '@components/index'

import './Landing.css'

export const Landing = () => {
  return (
    <main className={'page'}>
      <TopBanner />

      <MissionVisionSection />

      <SuperConferenceBanner withButton />

      <KeynoteSpeakers />

      <UtilitiesSection />

      <ExploreEducationSection />

      <RoadmapSection />

      <TeamSection />

      <PartnerSection />
    </main>
  )
}

export default Landing
