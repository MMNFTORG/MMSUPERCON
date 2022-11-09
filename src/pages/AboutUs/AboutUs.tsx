import React from 'react'

import {
  AboutUsTopBanner,
  BrandsBlock,
  CristiSection,
  JasonStoneSection,
  PartnersBlockSmall,
  PartnerSection,
  PartnersVideoSection,
  SebastianSection,
  TeamSection
} from '@/components'

import VideoPoster1 from '@assets/about-us/video-poster1.png'
import VideoPoster2 from '@assets/about-us/video-poster2.png'

import './AboutUs.scss'

export const AboutUs = () => {
  return (
    <main className={'page pb-5 page-about-us'}>
      <AboutUsTopBanner />

      <JasonStoneSection />

      <CristiSection />

      <PartnersVideoSection
        partnersBlock={<PartnersBlockSmall />}
        videoId={'IMcwlOZCB2g'}
        videoPoster={VideoPoster1}
      />

      <SebastianSection />

      <PartnersVideoSection
        partnersBlock={<BrandsBlock />}
        videoId={'0xICA2D6gKc'}
        videoPoster={VideoPoster2}
      />

      <TeamSection />

      <PartnerSection />
    </main>
  )
}

export default AboutUs
