import React from 'react'
import { Container, Row } from 'react-bootstrap'
import { RoutesPaths } from '@router/constants'

import { LatestBlogSlider, SiteButton } from '@/components'
import { LATEST_BLOG_ARTICLES } from '@/mocks/blog'

import { BlogArticle } from '@components/Landing/LatestBlogSection/BlogArticle'

import { useMediaDimensions } from '@hooks/useMediaDimensions'

import './LatestBlogSection.scss'

export const LatestBlogSection = () => {
  const { md } = useMediaDimensions()

  return (
    <section className={'latest-blog'}>
      <Container>
        <h2 className="section-title section-title--white">
          <span className="section-title__bordered-text">Latest</span> Blog
        </h2>

        <Row>
          {md ? (
            LATEST_BLOG_ARTICLES.map((blogItem) => (
              <BlogArticle {...blogItem} key={blogItem.id} />
            ))
          ) : (
            <LatestBlogSlider articles={LATEST_BLOG_ARTICLES} />
          )}
        </Row>

        {md && (
          <div className={'d-flex justify-content-center mt-5'}>
            <SiteButton
              color={'LIGHT'}
              size={'large'}
              bordered
              href={RoutesPaths.BLOG}
            >
              VIEW ALL BLOGS
            </SiteButton>
          </div>
        )}
      </Container>
    </section>
  )
}
