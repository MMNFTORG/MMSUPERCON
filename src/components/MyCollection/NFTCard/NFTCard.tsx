import React from 'react'
import { Image } from 'react-bootstrap'
import { generatePath, Link } from 'react-router-dom'
import { RoutesPaths } from '@router/constants'

import { CardOptionsButton, DynamicImage, NftTagsEnum } from '@/components'

import { IAssetPresale } from '@api/assetSale/types'

import NFTPreview from '@assets/NFT/collection-nft.png'

import './NFTCard.scss'

interface INFTCardProps
  extends Pick<IAssetPresale, 'name' | 'asset_id' | 'collection_id'> {
  image?: string
  max_nft_amount: number
  artist_avatar: string
  tag: NftTagsEnum
}

export const NftCard = ({
  name,
  asset_id,
  collection_id,
  image,
  max_nft_amount,
  artist_avatar,
  tag
}: INFTCardProps) => {
  return (
    <Link
      className="nft-card tile"
      to={generatePath(RoutesPaths.NFT_ASSET, {
        collection_id,
        asset_id
      })}
    >
      <div className={'nft-card__img'}>
        <Image src={image || NFTPreview} />
      </div>

      <div className="nft-card__body">
        <div className="nft-card__title">
          {name || 'Title'} #{asset_id}
        </div>

        <div
          className={'d-flex justify-content-between align-items-center mt-3'}
        >
          <div className={'nft-card__amount-stat'}>
            {asset_id}/{max_nft_amount}
          </div>

          <div className={'nft-card__artist-avatar'}>
            <Image src={artist_avatar} roundedCircle />
          </div>
        </div>
      </div>

      <footer className={'nft-card__bot'}>
        <div className={'nft-card__options'}>
          <CardOptionsButton openseaLink={'https://opensea.com'} />
        </div>

        <div className="nft-card__tag">
          <DynamicImage path={'red-crown.svg'} />
          {tag}
        </div>
      </footer>
    </Link>
  )
}
