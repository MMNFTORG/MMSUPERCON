import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { NFTMetadata } from '@store/types'

import {
  NftCard,
  NftTagsEnum,
  NormalizedCollectionInfo
} from '@components/index'

interface INFTListProps {
  NFTArray: NFTMetadata[]
  collection: NormalizedCollectionInfo
}

export const NftList = ({ NFTArray, collection }: INFTListProps) => {
  return (
    <Row className="mt-3 mb-5 g-3 justify-content-center justify-content-md-start">
      {NFTArray.map(({ name, id, image }) => (
        <Col
          key={id}
          md={{ span: 6 }}
          lg={{ span: 4 }}
          className={'justify-content-center'}
        >
          <NftCard
            name={name}
            asset_id={id}
            collection_id={collection.id}
            image={image}
            max_nft_amount={collection.max_nft_amount}
            artist_avatar={collection?.artist?.image}
            tag={NftTagsEnum.GRAFFITY}
          />
        </Col>
      ))}
    </Row>
  )
}
