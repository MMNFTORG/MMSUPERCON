import React from 'react'
import classNames from 'classnames'

import { DynamicImage } from '@components/index'

import { ISocialLink } from '@constants/social'

import './SocialFloatingButtons.css'

interface ISocialFloatingButtonsProps {
  socialLinks: ISocialLink[]
  float: 'right' | 'left'
}

export const SocialFloatingButtons = ({
  socialLinks,
  float
}: ISocialFloatingButtonsProps) => {
  return (
    <div
      className={classNames('social-floating-buttons', {
        'social-floating-buttons--left': float === 'left'
      })}
    >
      <ul className={'social-floating-buttons__list'}>
        {socialLinks.map((socialLink) => (
          <li key={socialLink.url}>
            <a
              className={'social-rounded-button'}
              href={socialLink.url}
              target={'_blank'}
              rel="noreferrer noopener"
            >
              <DynamicImage path={`socials/${socialLink.name}.svg`} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
