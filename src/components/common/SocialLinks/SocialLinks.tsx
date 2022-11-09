import React from 'react'

import { ISocialLink } from '@constants/social'

import { DynamicImage } from '../DynamicImage'

import './SocialLinks.css'

interface ISocialLinksProps {
  socialLinks: ISocialLink[]
}

export const SocialLinks = ({ socialLinks }: ISocialLinksProps) => {
  return (
    <div className="social-links">
      {socialLinks.map((link) => (
        <a
          key={link.name}
          className="social-links__link"
          href={link.url}
          target="_blank"
          rel="noreferrer noopener"
        >
          <DynamicImage path={`socials/${link.name}.svg`} />
        </a>
      ))}
    </div>
  )
}
