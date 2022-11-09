import React from 'react'

import './MissionVisionSection.scss'

export const MissionVisionSection = () => {
  return (
    <section className={'mission-vision'}>
      <div className="mission-vision__item">
        <div className="mission-vision__wrapper">
          <h3 className="mission-vision__title">The mission</h3>
          <div className="mission-vision__info">
            of this project is to positively impact, enrich, and educate the
            lives of millions of people around the world. We created MMNFT as
            meaningful intellectual art and combined it with an amazing
            community. MMNFT is more than just an NFT, its a club, a community,
            a status, an identity! All NFT tokens are one time admission to the
            MMNFT super-conference.
          </div>
        </div>
      </div>
      <div className="mission-vision__item">
        <div className="mission-vision__wrapper">
          <h3 className="mission-vision__title">Our Vision</h3>
          <div className="mission-vision__info">
            is to create a community that captures the passion, imagination and
            resources of its people. To create an ecosystem of mentors and
            mentees where everyone has access to the tools, resources and
            knowledge of the most successful entrepreneurs of our time.
          </div>
        </div>
      </div>
    </section>
  )
}
