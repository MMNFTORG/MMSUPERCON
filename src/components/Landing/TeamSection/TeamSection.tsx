import React, { useState } from 'react'
import { Container } from 'react-bootstrap'

import { PersonItem, SiteButton } from '@/components'
import { TEAM } from '@/mocks/team'

import { useMediaDimensions } from '@hooks/useMediaDimensions'

import './TeamSection.scss'

const MOBILE_ITEMS_LIMIT = 4

export const TeamSection = () => {
  const [expanded, setExpanded] = useState<boolean>(false)
  const { md } = useMediaDimensions()
  const [team, setTeam] = useState(() => {
    if (md) return TEAM
    return TEAM.slice(0, MOBILE_ITEMS_LIMIT)
  })

  const expandHandler = () => {
    setExpanded(true)
    setTeam(TEAM)
  }

  return (
    <section className={'team-section'}>
      <Container>
        <h2 className="section-title">
          <span className="section-title__bordered-text">Meet the</span> Team
        </h2>

        <div className="team-wrapper d-flex justify-content-center mt-5">
          {team.map(({ socialLinks, name, avatar, bio }) => (
            <PersonItem
              avatar={avatar}
              name={name}
              socialLinks={socialLinks}
              bio={bio}
              key={name}
            />
          ))}
        </div>

        {!md && !expanded && (
          <SiteButton color={'TRANSPARENT'} onClick={expandHandler}>
            VIEW ALL Organizers
          </SiteButton>
        )}
      </Container>
    </section>
  )
}
