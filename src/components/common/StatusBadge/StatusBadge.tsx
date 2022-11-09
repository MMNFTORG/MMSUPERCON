import React from 'react'
import classNames from 'classnames'

import { AssetPresaleStatusProps } from '@api/assetSale/types'

import { CollectionStatusProp } from '../../CollectionPresale'
import { AuctionSaleStatusProps } from '../../NFTAuction'

import './StatusBadge.scss'

export type BadgeStatus = 'open' | 'closed'

interface IStatusBadgeProps {
  value: CollectionStatusProp | AssetPresaleStatusProps | AuctionSaleStatusProps
}

export const StatusBadge = ({ value }: IStatusBadgeProps) => {
  const statusClass = value.split(' ').join('-').toLowerCase()
  const classes = classNames(['status-badge', `status-badge--${statusClass}`])
  return <div className={classes}>{value}</div>
}
