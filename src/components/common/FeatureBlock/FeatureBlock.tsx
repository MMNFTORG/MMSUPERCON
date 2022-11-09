import React from 'react'
import { Image } from 'react-bootstrap'

import { RoundButton } from '../index'

import './FeatureBlock.css'

interface IFeatureBlockProps {
  image?: string
  title: string
  text: string
  button: {
    link: string
    text: string
  }
}

export const FeatureBlock = ({
  image,
  title,
  text,
  button
}: IFeatureBlockProps) => {
  return (
    <div className={'feature-card'}>
      <div className="feature-card__header">
        <div className="feature-card__icon">
          <Image src={image} alt={'logo'} />
        </div>

        <div className="feature-card__title">{title}</div>
      </div>

      <div className="feature-card__description gradient-text gradient-text--purple">
        {text}
      </div>

      <div className={'text-center'}>
        <RoundButton href={button.link} size="large" wide>
          {button.text}
        </RoundButton>
      </div>
    </div>
  )
}
