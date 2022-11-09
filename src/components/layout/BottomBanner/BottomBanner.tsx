import React from 'react'
import { Container } from 'react-bootstrap'
import { generatePath } from 'react-router-dom'
import { RoutesPaths } from '@router/constants'

import { DynamicImage, SiteButton } from '@/components'

import './BottomBanner.scss'

const COLLECTION_ID = process.env.REACT_APP_NFT_COLLECTION_ID || ''

export const BottomBanner = () => {
  return (
    <section className={'bottom-banner'}>
      <Container>
        <h2 className="bottom-banner__title">
          Join the millionaire mentor community
        </h2>

        <div className="bottom-banner__buttons">
          <ul>
            <li>
              <SiteButton>
                <DynamicImage path={'socials/discord.svg'} />
                Join our discord
              </SiteButton>
            </li>
            <li>
              <SiteButton
                color={'LIGHT'}
                to={generatePath(RoutesPaths.COLLECTION_DETAILS, {
                  collection_id: COLLECTION_ID
                })}
              >
                <DynamicImage path={'logo.svg'} />
                Mint our token
              </SiteButton>
            </li>
            <li>
              <SiteButton>
                <DynamicImage path={'socials/telegram.svg'} />
                Join Telegram
              </SiteButton>
            </li>
          </ul>
        </div>
      </Container>
    </section>
  )
}
