import React from 'react'
import { Col, Row } from 'react-bootstrap'

import { NftCard } from '@/components'

import { MarketCard } from '../MarketCard'
import { IMarketItem } from '../types'

interface ItemsListProps {
  items: IMarketItem[]
}

export const MarketList = ({ items }: ItemsListProps) => {
  return (
    <Row className="g-3 justify-content-center justify-content-md-start">
      {items.map((item) => (
        <Col
          key={item.asset_id}
          md={{ span: 6 }}
          lg={{ span: 4 }}
          className={'justify-content-center'}
        >
          <MarketCard {...item} />
        </Col>
      ))}
    </Row>
  )
}
