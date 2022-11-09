import React from 'react'
import { Image } from 'react-bootstrap'
import { generatePath, Link } from 'react-router-dom'
import { RoutesPaths } from '@router/constants'

import {
  CardOptionsButton,
  IRecentSale,
  NormalizedCollectionInfo
} from '@/components'

import OptionsIco from '@assets/card-option-ico.svg'

import './RecentSaleCard.scss'

export interface IRecentSaleCardProps extends IRecentSale {
  collection: NormalizedCollectionInfo
}

export const RecentSaleCard = ({
  collection,
  id,
  image
}: IRecentSaleCardProps): JSX.Element => {
  return (
    <div className={'recent-sale-card'}>
      <Link
        to={generatePath(RoutesPaths.NFT_ASSET, {
          collection_id: collection.id,
          asset_id: id
        })}
      >
        <div className="recent-sale-card__img">
          <Image src={image} />
        </div>
        <div className="recent-sale-card__id">{id}</div>
        <footer className="recent-sale-card__bot">
          <CardOptionsButton
            openseaLink={collection.opensea_link || 'https://opensea.com'}
          />

          <div className="recent-sale-card__artist">
            <b>{collection?.artist?.name}</b>
            <Image src={collection?.artist?.image} roundedCircle />
          </div>
        </footer>
      </Link>
    </div>
  )
}
