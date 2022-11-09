import React from 'react'
import { Container, Image, Row } from 'react-bootstrap'

import { NFTBannerSlider } from '@/components'

import ArtistAvatar from '@assets/Landing/buyer-avatar.png'

interface IMyCollectionBannerProps {
  bannerSlides: Array<any>
  title: string
  artistAvatar?: string
}

export const CollectionBanner = ({
  bannerSlides,
  title,
  artistAvatar
}: IMyCollectionBannerProps) => {
  return (
    <div className={'position-relative'}>
      <section className="nfts-page__top-banner collection-banner">
        <div className="background">
          {!!bannerSlides.length && <NFTBannerSlider slides={bannerSlides} />}
        </div>
        <Container>
          <Row className="hero-row">
            <div className="hero-row__main text-center">
              <h2 className="title">{title}</h2>
              <p className="subtitle">
                SHOP THE ORIGINAL HANDDRAWN ART BY SEB KOVAKS
              </p>
            </div>
          </Row>
        </Container>
      </section>
      <div className="collection-banner__artist-avatar">
        <Image src={artistAvatar || ArtistAvatar} alt={'artist'} />
      </div>
    </div>
  )
}
