import React from 'react'
import { Col, Image } from 'react-bootstrap'

import { IEducationItem } from '@/mocks/educations'

import './EducationItem.scss'

interface IEducationItemProps extends IEducationItem {}

export const EducationItem = ({
  ico,
  title,
  description
}: IEducationItemProps) => {
  return (
    <Col md={4} className={'p-0 education-item-wrapper'}>
      <div className={'education-item'}>
        <div className="education-item__ico">
          <Image src={ico} alt={'icon'} />
        </div>

        <div className="education-item__title">{title}</div>
        <div className="education-item__description">{description}</div>
      </div>
    </Col>
  )
}
