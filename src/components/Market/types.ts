import { IAssetPresale } from '@api/assetSale/types'

import { ContractAddress, TokenName } from '../CollectionPresale'
import { IAuctionSale } from '../NFTAuction'

export interface IAsideItem {
  text: string
  onClick: () => void
  selected: boolean
  count: number
}

export enum SaleStatuses {
  active = 'active',
  completed = 'completed',
  canceled = 'canceled'
}

export type SaleStatus = keyof typeof SaleStatuses

interface IFundToken {
  name: TokenName
  address?: ContractAddress
  icon?: string
}

export interface ISaleDetails {
  starts_at: Date | null
  end_at: Date | null
  min_allocation?: number
  max_allocation?: number
  sale_contract_address?: ContractAddress
  fund_token: IFundToken
  tokenAmount?: number
  status: SaleStatus
  starting_bid?: number
}

export type SaleType = 'public_sale' | 'auction'

export interface ISaleItem {
  id: string
  collection_id: string
  asset_id: string
  name: string
  sale_type: SaleType
  sale_details: ISaleDetails
}

export type IMarketItem = IAssetPresale | IAuctionSale

export enum SortingDirection {
  NAME_ASC = 'Name (A-z)',
  NAME_DESC = 'Name (Z-a)',
  PRICE_ASC = 'Price (high to low)',
  PRICE_DESC = 'Price (low to high)'
}
