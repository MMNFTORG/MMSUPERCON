import { ContractAddress, WalletAddress } from '@firestarter-private/firestarter-library/lib/types'

import { AuctionSaleStatusProps, ISaleItem, SaleStatuses } from '@/components'

export enum AssetPresaleStatusesProps {
  'Coming Soon' = 'Coming Soon',
  Live = 'Live',
  Closed = 'Closed'
}

export type AssetPresaleStatusProps = keyof typeof AssetPresaleStatusesProps

export interface IAssetPresale extends Omit<ISaleItem, 'sale_type'> {
  sale_type: 'public_sale'
}

interface ISaleDetailsArgs {
  starts_at: string
  end_at: string
  sale_contract_address?: ContractAddress
  starting_bid: number
}

export interface ICreateAuctionArgs {
  asset_id: string
  collection_id: string
  name: string
  sale_details: ISaleDetailsArgs
  wallet_address: WalletAddress
}

interface IUpdateSaleDetailData extends Partial<ISaleDetailsArgs> {
  status: SaleStatuses
}

interface IUpdateData
  extends Omit<Partial<ICreateAuctionArgs>, 'sale_details'> {
  sale_details: IUpdateSaleDetailData
}

export interface IUpdateAuctionArgs {
  id: string
  data: IUpdateData
}
