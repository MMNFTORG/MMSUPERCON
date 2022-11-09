import SwiperCore, { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { MediaAsset } from '../../common/MediaAsset'

import 'swiper/swiper.min.css'
import './NFTBannerSlider.css'

export interface Slide {
  image: string
  id: string
}

interface Props {
  slides: Slide[]
}

SwiperCore.use([Autoplay])

export const NFTBannerSlider = ({ slides }: Props) => {
  return (
    <Swiper
      className="nft-banner-slider"
      slidesPerView="auto"
      loop
      loopAdditionalSlides={slides.length}
      loopedSlides={slides.length}
      updateOnWindowResize
      preloadImages
      autoplay={{
        delay: 1500,
        disableOnInteraction: false,
        stopOnLastSlide: false,
        reverseDirection: slides.length === 2
      }}
      speed={2000}
    >
      {slides.map((slide, i) => (
        <SwiperSlide
          key={slide.id + slide.image + i}
          className="nft-banner-slide"
        >
          <MediaAsset src={slide.image} className="nft-banner-slide__asset" />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
