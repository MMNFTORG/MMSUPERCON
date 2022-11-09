import React from 'react'
import { Col, Row } from 'react-bootstrap'

import { CollectionCard } from '../CollectionCard'
import { IPreviewCollection } from '../types'

interface ICollectionsListProps {
  collections: IPreviewCollection[]
}

export const CollectionsList = ({ collections }: ICollectionsListProps) => {
  return (
    <Row className="g-3 justify-content-center justify-content-md-start flex-grow-1">
      {collections?.map(({ name, id, assets, max_nft_amount }) => (
        <Col
          key={id}
          md={{ span: 6 }}
          lg={{ span: 4 }}
          className={'justify-content-center'}
        >
          <CollectionCard
            id={id}
            name={name}
            assets={assets}
            max_nft_amount={max_nft_amount}
          />
        </Col>
      ))}
    </Row>
  )
}
