import React from 'react'
import { Image } from 'react-bootstrap'
import { generatePath, Link } from 'react-router-dom'
import { RoutesPaths } from '@router/constants'

import { COLLECTION } from '@/mocks/collections'

import { normalizeStatus } from '@api/assetSale/mapping'

import ProjectIco from '@assets/collection/collection-image.png'
import ItemImage from '@assets/NFT/NFT-placeholder.png'

import { StatusBadge } from '../../common'
import { IMarketItem, SaleType } from '../types'

import './MarketCard.scss'

type IMarketCardProps = IMarketItem

export const MarketCard = ({
  asset_id,
  collection_id,
  sale_type,
  name,
  sale_details
}: IMarketCardProps) => {
  const tokenSymbol = process.env.REACT_APP_TOKEN_SYMBOL
  const statusMessage = normalizeStatus({
    saleType: sale_type as SaleType,
    status: sale_details.status,
    publicPresaleStart: sale_details.starts_at,
    publicPresaleEnd: sale_details.end_at,
    whitelistEnd: COLLECTION.whitelisting.starts_at,
    whitelistStart: COLLECTION.whitelisting.end_at
  })
  return (
    <div className={'tile market-item'}>
      <Link
        to={generatePath(
          sale_type === 'public_sale'
            ? RoutesPaths.NFT_ASSET
            : RoutesPaths.ASSET_AUCTION,
          {
            collection_id: collection_id,
            asset_id: asset_id
          }
        )}
      >
        <Image src={ItemImage} />

        <div className="market-item__body">
          <div className={'d-flex gap-2 mt-3 mb-3 market-item__project'}>
            <Image
              src={COLLECTION?.assets?.logo_image_url || ProjectIco}
              roundedCircle
            />
            <span>{COLLECTION.name}</span>
          </div>

          <b className={'market-item__name d-flex mb-3'}>{name}</b>

          <footer
            className={'d-flex justify-content-between align-items-center'}
          >
            <StatusBadge value={statusMessage} />

            <div className={'market-item__bid'}>
              {sale_type === 'public_sale' ? 'Price:' : 'Current bid:'}{' '}
              <span>
                {sale_type === 'public_sale'
                  ? sale_details.tokenAmount
                  : sale_details.starting_bid}{' '}
                {tokenSymbol}
              </span>
            </div>
          </footer>
        </div>
      </Link>
    </div>
  )
}
