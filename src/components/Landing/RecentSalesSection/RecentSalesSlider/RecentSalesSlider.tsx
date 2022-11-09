import React from 'react'
import SwiperCore, { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { IRecentSale, NormalizedCollectionInfo } from '@components/index'
import { RecentSaleCard } from '@components/Landing/RecentSalesSection/RecentSaleCard/RecentSaleCard'

import { useMediaDimensions } from '@hooks/useMediaDimensions'

import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/pagination/pagination.min.css'
import './RecentSalesSlider.scss'

interface INFTSliderProps {
  recentSales: IRecentSale[]
  collection: NormalizedCollectionInfo
}

SwiperCore.use([Pagination])

export const RecentSalesSlider = ({
  recentSales,
  collection
}: INFTSliderProps) => {
  const { xl, currentDimension } = useMediaDimensions()

  const sliderSizeDict: Record<string, number> = {
    xl: 5,
    lg: 4,
    md: 3,
    sm: 1,
    xs: 1
  }
  return (
    <div className={'recent-sale-slider'}>
      <Swiper
        className="recent-sales-slider"
        loop={true}
        spaceBetween={60}
        centeredSlides
        // autoplay={true}
        slidesPerView={sliderSizeDict[currentDimension]}
        touchEventsTarget="wrapper"
      >
        {recentSales.map(({ image, id }, index) => (
          <SwiperSlide key={id}>
            <RecentSaleCard collection={collection} image={image} id={id} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
