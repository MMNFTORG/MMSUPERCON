import React, { useMemo } from 'react'
import { Container } from 'react-bootstrap'
import classNames from 'classnames'
import SwiperCore, { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { NavigationOptions } from 'swiper/types/components/navigation'
import { PaginationOptions } from 'swiper/types/components/pagination'

import { ISpeaker, SpeakersTopicEnum } from '@/mocks/speakers'

import { SpeakerCard } from '@components/SuperConference'

import { useMediaDimensions } from '@hooks/useMediaDimensions'

import { ReactComponent as NextArrow } from '@assets/forward_arrow.svg'

import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/pagination/pagination.min.css'
import './TopicSpeakersSlider.scss'

interface IKeynoteSpeakersSliderProps {
  speakers: ISpeaker[]
  topic: SpeakersTopicEnum
  hidden: boolean
}

SwiperCore.use([Navigation, Pagination])

export const TopicSpeakersSlider = ({
  speakers,
  topic,
  hidden
}: IKeynoteSpeakersSliderProps) => {
  const enableSwiping = useMemo(() => speakers.length > 2, [speakers])
  const { md } = useMediaDimensions()

  const topicKey = topic.split(' ').join('')

  const navigationOptions: NavigationOptions = {
    nextEl: `.topic-speakers-slider__nav-button--next--${topicKey}`,
    prevEl: `.topic-speakers-slider__nav-button--prev--${topicKey}`
  }

  const paginationOptions: PaginationOptions = {
    el: `.topic-speakers-slider__pagination--${topicKey}`,
    clickable: true
  }

  return (
    <>
      <div
        className={classNames([
          'topic-speakers-slider',
          { 'topic-speakers-slider--hidden': hidden }
        ])}
      >
        {!!speakers.length && (
          <Swiper
            className="topic-speakers-slider-slides"
            loop={enableSwiping}
            spaceBetween={32}
            slidesPerView="auto"
            touchEventsTarget="wrapper"
            navigation={navigationOptions}
            pagination={paginationOptions}
          >
            {speakers.map(({ avatar, id, name, topic, socialMedia }, index) => (
              <SwiperSlide key={id + topicKey + index}>
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
      <Container>
        <div
          className={'d-flex justify-content-between align-items-center mt-5'}
        >
          {md && (
            <div
              className={`topic-speakers-slider__pagination topic-speakers-slider__pagination--${topicKey}`}
            />
          )}
          {enableSwiping && md && (
            <div className={'topic-speakers-slider__nav'}>
              <span
                className={`topic-speakers-slider__nav-button--prev--${topicKey} topic-speakers-slider__nav-button--prev topic-speakers-slider__nav-button`}
              >
                <NextArrow />
              </span>
              <span
                className={`topic-speakers-slider__nav-button--next--${topicKey} topic-speakers-slider__nav-button--next topic-speakers-slider__nav-button`}
              >
                <NextArrow />
              </span>
            </div>
          )}
        </div>
      </Container>
    </>
  )
}
