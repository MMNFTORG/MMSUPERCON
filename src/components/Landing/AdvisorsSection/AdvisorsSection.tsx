import React from 'react'
import { Container } from 'react-bootstrap'

import { PersonItem } from '@/components'
import { ADVISORS, TEAM } from '@/mocks/team'

export const AdvisorsSection = () => {
  return (
    <section className={'team-section'}>
      <Container>
        <h2 className="section-title">
          <span className="section-title__bordered-text">Meet our</span>{' '}
          Partners
        </h2>

        <div className="team-wrapper d-flex justify-content-center  mt-5">
          {ADVISORS.map(({ socialLinks, name, avatar, bio }) => (
            <PersonItem
              avatar={avatar}
              name={name}
              socialLinks={socialLinks}
              personsFolder={'advisors'}
              bio={bio}
              key={name}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
