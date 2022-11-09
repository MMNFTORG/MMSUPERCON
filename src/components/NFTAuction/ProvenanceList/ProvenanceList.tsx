import React from 'react'
import { Image } from 'react-bootstrap'

import { IProvenanceEntity } from '@/components'

import { useGetTokenPrice } from '@hooks/useGetTokenPrice'

import { formatUSD } from '@utils/currency'

import { ReactComponent as LinkArrow } from '@assets/link-arrow.svg'
import UserAvatar from '@assets/NFT/user-avatar.png'

interface IProvenanceListProps {
  provenanceEntities: IProvenanceEntity[]
}
export const ProvenanceList = ({
  provenanceEntities
}: IProvenanceListProps) => {
  const tokenSymbol = process.env.REACT_APP_TOKEN_SYMBOL
  const [, calculateAmountInUsd] = useGetTokenPrice(tokenSymbol)
  return (
    <div className="provenance-table">
      {provenanceEntities.map((item, index) => (
        <div
          className="provenance-table__row provenance-item"
          key={index + item.date}
        >
          <div className="provenance-item__left">
            <div className="provenance-item__avatar">
              <Image src={item.user.avatar || UserAvatar} roundedCircle />
            </div>

            <div className="provenance-item__info">
              <div className="provenance-item__owner">
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)} by{' '}
                <span className={'red-text'}>{item.user.name}</span>
              </div>

              <div className="provenance-item__date grey-text">{item.date}</div>
            </div>
          </div>

          {item.price && (
            <div className="provenance-item__price">
              <b>
                {item.price.tokenAmount.toFixed(2)} {tokenSymbol}
              </b>
              <span className={'grey-text'}>
                {formatUSD(calculateAmountInUsd(item.price.tokenAmount))}
              </span>
            </div>
          )}

          <div className="provenance-item__link">
            <a href={item.link}>
              <LinkArrow />
            </a>
          </div>
        </div>
      ))}
    </div>
  )
}
