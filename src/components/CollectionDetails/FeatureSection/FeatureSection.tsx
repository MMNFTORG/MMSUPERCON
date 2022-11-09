import React from 'react'
import { Container } from 'react-bootstrap'

import { FeatureBlock } from '../../common/FeatureBlock'

export const FeatureSection = () => {
  const featureData = {
    title: 'What is the Collection NFT?',
    text: 'We facilitate the early stage funding of Metaverse projects and communities by amplifying them through culture. Introducing the IMO. Incubated projects with Metaverse integrations and solutions. Powered by communities from around the world. Own The Future.',
    button: {
      link: 'https://opensea.com/',
      text: 'Opensea'
    }
  }
  return (
    <section className={'mb-5 feature-section'}>
      <Container>
        <FeatureBlock {...featureData} />
      </Container>
    </section>
  )
}
