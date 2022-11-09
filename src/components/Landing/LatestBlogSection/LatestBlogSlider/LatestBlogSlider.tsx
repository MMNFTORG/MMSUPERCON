import React from 'react'
import SwiperCore, { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { IBlogArticle } from '@/mocks/blog'

import { BlogArticle } from '@components/Landing/LatestBlogSection/BlogArticle'

import './LatestBlogSlider.scss'

interface ILatestBlogSliderProps {
  articles: IBlogArticle[]
}

SwiperCore.use([Pagination])

export const LatestBlogSlider = ({ articles }: ILatestBlogSliderProps) => {
  return (
    <div>
      <Swiper
        className="recent-sales-slider"
        loop={true}
        spaceBetween={60}
        centeredSlides
        autoplay={true}
        slidesPerView={1}
        touchEventsTarget="wrapper"
      >
        {articles.map(
          ({ title, id, image, date, label, author, link }, index) => (
            <SwiperSlide key={id}>
              <BlogArticle
                image={image}
                title={title}
                date={date}
                label={label}
                author={author}
                id={id}
                link={link}
              />
            </SwiperSlide>
          )
        )}
      </Swiper>
    </div>
  )
}
