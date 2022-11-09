import React, { useMemo } from 'react'
import SwiperCore, { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { ISpeaker } from '@/mocks/speakers'

import { SpeakerCard } from '@components/SuperConference'

import { useMediaDimensions } from '@hooks/useMediaDimensions'

import { ReactComponent as NextArrow } from '@assets/forward_arrow.svg'

import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/pagination/pagination.min.css'
import './KeynoteSpeakersSlider.scss'

interface IKeynoteSpeakersSliderProps {
  speakers: ISpeaker[]
  title: string
}

SwiperCore.use([Navigation, Pagination])

export const KeynoteSpeakersSlider = ({
  speakers,
  title
}: IKeynoteSpeakersSliderProps) => {
  const { md } = useMediaDimensions()
  const enableSwiping = useMemo(() => speakers.length > 2, [speakers])

  const navigationOptions = {
    nextEl: '.keynote-speakers-slider__nav-button--next',
    prevEl: '.keynote-speakers-slider__nav-button--prev'
  }

  const paginationOptions = {
    el: '.keynote-speakers-slider__pagination',
    clickable: true
  }

  return (
    <div className="keynote-speakers-slider">
      <div className="keynote-speakers-slider__info">
        <h2 className="title">{title}</h2>
        {enableSwiping && md && (
          <div className={'keynote-speakers-slider__nav'}>
            <span className="keynote-speakers-slider__nav-button--prev keynote-speakers-slider__nav-button">
              <NextArrow />
            </span>
            <span className="keynote-speakers-slider__nav-button--next keynote-speakers-slider__nav-button">
              <NextArrow />
            </span>
          </div>
        )}
        {md && <div className="keynote-speakers-slider__pagination" />}
      </div>
      {!!speakers.length && (
        <Swiper
          className="keynote-speakers-slider-slides"
          loop={enableSwiping}
          spaceBetween={32}
          slidesPerView="auto"
          touchEventsTarget="wrapper"
          navigation={navigationOptions}
          pagination={paginationOptions}
        >
          {speakers.map(({ avatar, id, name, topic, socialMedia }, index) => (
            <SwiperSlide key={id}>
              <SpeakerCard
                avatar={avatar}
                id={id}
                name={name}
                topic={topic}
                socialMedia={socialMedia}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  )
}
