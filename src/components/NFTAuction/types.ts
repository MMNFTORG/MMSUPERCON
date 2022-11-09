import { AssetPresaleStatusesProps } from '@api/assetSale'

import { ISaleDetails, ISaleItem } from '../Market'

export type AuctionStatus = 'open' | 'closed'

export interface IProvenanceEntity {
  user: {
    name: string
    avatar?: string
  }
  date: string
  status: 'listed' | 'minted'
  link: string
  price?: {
    tokenAmount: number
  }
}

export interface ICollectorEntity {
  wallet: string
  bid: {
    tokenAmount: number
  }
  date: string
}

export enum AuctionSaleStatusesProps {
  'Coming Soon' = 'Coming Soon',
  'Auction Opened' = 'Auction Opened',
  'Auction Closed' = 'Auction Closed',
  Closed = 'Closed'
}

export type AuctionSaleStatusProps = keyof typeof AuctionSaleStatusesProps

export interface IAuctionSale extends Omit<ISaleItem, 'sale_type'> {
  sale_type: 'auction'
}

export interface INormalizedAuctionSaleDetails extends ISaleDetails {
  statusMessage: AuctionSaleStatusProps
}

export interface INormalizedAuctionSale
  extends Omit<IAuctionSale, 'sale_details'> {
  sale_details: INormalizedAuctionSaleDetails
}
