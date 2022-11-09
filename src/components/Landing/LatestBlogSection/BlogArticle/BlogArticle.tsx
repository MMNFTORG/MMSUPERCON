import React, { useMemo } from 'react'
import { Col, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { IBlogArticle } from '@/mocks/blog'

import CalendarIco from '@assets/calendar-ico.svg'

import './BlogArticle.scss'

interface IBlogArticleProps extends IBlogArticle {}

export const BlogArticle = ({
  link,
  id,
  author,
  title,
  date,
  image,
  label
}: IBlogArticleProps) => {
  const normalizedDateString = useMemo(() => {
    const dateObject: Date = new Date(date)

    return `${dateObject.getDate()} ${dateObject.toLocaleString('default', {
      month: 'long'
    })}, ${dateObject.getFullYear()}`
  }, [date])

  return (
    <Col lg={4} md={6}>
      <Link to={link} className={'blog-item'}>
        <div className="blog-item__image">
          <Image src={image} alt={title} />
        </div>

        <div className="blog-item__body">
          <div className="blog-item__label">{label}</div>
          <div className="blog-item__title">{title}</div>
        </div>

        <footer className="blog-item__bot">
          <div className="blog-item__date">
            <Image src={CalendarIco} alt={'date'} />
            {normalizedDateString}
          </div>

          <div className="blog-item__author">{author}</div>
        </footer>
      </Link>
    </Col>
  )
}
