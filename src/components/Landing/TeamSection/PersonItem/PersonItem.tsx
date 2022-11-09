import React from 'react'
import { Link } from 'react-router-dom'

import { DynamicImage } from '@/components'

import { IPerson } from '@components/Landing/TeamSection/PersonItem/types'

import './PersonItem.scss'

interface IPersonItemProps extends IPerson {
  personsFolder?: string
}

export const PersonItem = ({
  name,
  avatar,
  socialLinks,
  bio,
  personsFolder = 'team'
}: IPersonItemProps) => {
  return (
    <div className={'person-card'}>
      <div className="person-card__avatar">
        <DynamicImage path={`${personsFolder}/${avatar}`} />
      </div>

      <div className="person-card__name">{name}</div>

      <div className="person-card__social-links">
        {socialLinks?.map((item) => (
          <Link to={item.url} key={item.name}>
            <DynamicImage path={`socials/${item.name}.svg`} alt={item.name} />
          </Link>
        ))}
      </div>

      <div className="person-card__bio">{bio}</div>
    </div>
  )
}
