import React from 'react'
import { Image } from 'react-bootstrap'
import { generatePath, Link } from 'react-router-dom'
import { RoutesPaths } from '@router/constants'

import CollectionPlaceholder from '@assets/NFT/NFT-placeholder.png'

import { IPreviewCollection } from '../types'

import './CollectionCard.scss'

interface ICollectionCardProps extends IPreviewCollection {
  withDate?: true
}

export const CollectionCard = ({
  id,
  name,
  assets,
  max_nft_amount,
  withDate
}: ICollectionCardProps) => {
  return (
    <Link
      to={generatePath(RoutesPaths.COLLECTION_DETAILS, { collection_id: id })}
      className={'tile collection-card'}
    >
      <div className={'collection-card__img'}>
        <Image src={assets?.logo_image_url || CollectionPlaceholder} />
      </div>

      <div className="collection-card__body">
        <div
          className={'d-flex justify-content-between align-items-center mt-3'}
        >
          <div className="collection-card__title">Tittle #{id}</div>

          <div className={'collection-card__amount-stat'}>
            <span className={'yellow-text'}>1</span> / {max_nft_amount}
          </div>
        </div>

        <div className="collection-card__name">{name}</div>

        {withDate && (
          <footer className={'collection-card__bot'}>June 12, 2022</footer>
        )}
      </div>
    </Link>
  )
}
