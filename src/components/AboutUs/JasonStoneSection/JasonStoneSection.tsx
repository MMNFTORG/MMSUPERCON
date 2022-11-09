import React from 'react'
import { Container, Image } from 'react-bootstrap'

import { JASON_MEDIAS } from '@/mocks/jason-socials'

import JasonImage from '@assets/about-us/jason-image.png'

import './JasonStoneSection.scss'

interface IJasonStoneSectionProps {}

export const JasonStoneSection = ({}: IJasonStoneSectionProps): JSX.Element => {
  return (
    <div className="jason-stone-section">
      <Container>
        <div className="jason-stone-section__wrapper">
          <div className="jason-stone-section__info">
            <h2 className="section-title">
              Hello
              <div className="section-title__red-bg">
                <span>I'm Jason Stone</span>
              </div>
            </h2>

            <p>
              Jason Stone is a serial entrepreneur with multiple 7 figure
              business ventures across various verticals of web and marketing.
            </p>
            <p>
              He is widely known by over 5 million people around the world as
              @Millionaire_Mentor on Instagram.
            </p>
            <p>
              Jason utilizes his experience and passion as a motivator, mentor,
              teacher, and social media influencer to help others create
              success.
            </p>
            <p>
              Jason Stone is an accomplished Senior Executive, Consultant, and
              Thought Leader with more than 15 years of success across the
              engineering, e-commerce, social media, internet, marketing,
              advertising, technology, automotive, blockchain, franchising, and
              health and wellness industries.
            </p>

            <div className="jason-stone-section__medias">
              <ul>
                {JASON_MEDIAS.map(({ image, link, name }) => (
                  <li key={name}>
                    <a href={link} target={'_blank'}>
                      <Image src={image} />
                      <span>{name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="jason-stone-section__image">
            <Image src={JasonImage} />
          </div>
        </div>
      </Container>
    </div>
  )
}
