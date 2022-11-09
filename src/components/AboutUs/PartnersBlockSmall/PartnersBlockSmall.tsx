import React from 'react'
import { Image } from 'react-bootstrap'

import MillMentorLogo from '@assets/about-us/partners/millmentor.png'
import SnowballLogo from '@assets/about-us/partners/snowball.png'
import TreadstoneLogo from '@assets/about-us/partners/treadstone.png'

import './PartnersBlockSmall.scss'

interface IPartnersBlockSmallProps {}

const PARTNERS = [
  {
    role: 'Founder, CEO',
    image: MillMentorLogo
  },
  {
    role: 'CMO',
    image: SnowballLogo
  },
  {
    role: 'Founder, CEO',
    image: TreadstoneLogo
  }
]

export const PartnersBlockSmall =
  ({}: IPartnersBlockSmallProps): JSX.Element => {
    return (
      <div className="partners-block-small">
        {PARTNERS.map((item, index) => (
          <div className={'partners-block-small__item'} key={index}>
            <Image src={item.image} />
            <span>{item.role}</span>
          </div>
        ))}
      </div>
    )
  }
