import React from 'react'
import { NFTMetadata } from '@store/types'
import SwiperCore, { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import {
  NftCard,
  NftTagsEnum,
  NormalizedCollectionInfo
} from '@components/index'

import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/pagination/pagination.min.css'
import './NFTSlider.css'

interface INFTSliderProps {
  NFTArray: NFTMetadata[]
  collection: NormalizedCollectionInfo
}

SwiperCore.use([Pagination])

export const NFTSlider = ({ NFTArray, collection }: INFTSliderProps) => {
  const paginationOptions = {
    el: '.nft-slider__pagination'
  }

  return (
    <div className={'nft-slider'}>
      <Swiper
        className="projects-slider-slides"
        loop={true}
        spaceBetween={32}
        slidesPerView={2}
        touchEventsTarget="wrapper"
        pagination={paginationOptions}
      >
        {NFTArray.map(({ name, id }, index) => (
          <SwiperSlide key={id}>
            <NftCard
              name={name}
              asset_id={id}
              collection_id={collection.id}
              artist_avatar={collection.artist.image}
              tag={NftTagsEnum.GRAFFITY}
              max_nft_amount={collection.max_nft_amount}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="nft-slider__pagination" />
    </div>
  )
}
