import { isPast } from 'date-fns'

import { SaleStatus, SaleStatuses, SaleType } from '@components/Market/types'
import {
  AuctionSaleStatusesProps,
  AuctionSaleStatusProps,
  IAuctionSale,
  INormalizedAuctionSale,
  INormalizedAuctionSaleDetails
} from '@components/NFTAuction/types'

import {
  AssetPresaleStatusesProps,
  AssetPresaleStatusProps
} from '@api/assetSale/types'

interface INormalizeStatusArgs {
  saleType: SaleType
  status: SaleStatus
  whitelistStart: Date | null
  whitelistEnd: Date | null
  publicPresaleStart?: Date | null
  publicPresaleEnd?: Date | null
}

export const normalizeStatus = ({
  saleType,
  status,
  whitelistStart,
  whitelistEnd,
  publicPresaleStart,
  publicPresaleEnd
}: INormalizeStatusArgs): AuctionSaleStatusProps | AssetPresaleStatusProps => {
  if (saleType === 'public_sale') {
    if (!whitelistStart || !whitelistEnd)
      return AssetPresaleStatusesProps['Coming Soon']
    if (status === SaleStatuses.completed)
      return AssetPresaleStatusesProps.Closed

    if (status === SaleStatuses.active) {
      if (publicPresaleEnd && isPast(new Date(publicPresaleEnd)))
        return AssetPresaleStatusesProps.Closed
      if (publicPresaleStart && isPast(new Date(publicPresaleStart)))
        return AssetPresaleStatusesProps.Live
    }

    return AssetPresaleStatusesProps['Coming Soon']
  }

  if (saleType === 'auction') {
    if (!whitelistStart || !whitelistEnd)
      return AuctionSaleStatusesProps['Coming Soon']

    if (status === SaleStatuses.completed)
      return AuctionSaleStatusesProps['Auction Closed']

    if (status === SaleStatuses.canceled) return AuctionSaleStatusesProps.Closed

    if (status === SaleStatuses.active) {
      if (publicPresaleEnd && isPast(new Date(publicPresaleEnd)))
        return AuctionSaleStatusesProps['Auction Closed']
      if (publicPresaleStart && isPast(new Date(publicPresaleStart)))
        return AuctionSaleStatusesProps['Auction Opened']
    }

    return AuctionSaleStatusesProps['Coming Soon']
  }

  return AuctionSaleStatusesProps['Coming Soon']
}

export const normalizeAuction = (
  auctionSale: IAuctionSale,
  starts_at: Date,
  end_at: Date
): INormalizedAuctionSale => {
  const sale_details: INormalizedAuctionSaleDetails = {
    ...auctionSale.sale_details,
    statusMessage: normalizeStatus({
      saleType: auctionSale.sale_type as SaleType,
      status: auctionSale.sale_details.status,
      publicPresaleStart: auctionSale.sale_details.starts_at,
      publicPresaleEnd: auctionSale.sale_details.end_at,
      whitelistEnd: starts_at,
      whitelistStart: end_at
    }) as AuctionSaleStatusProps
  }

  return {
    ...auctionSale,
    sale_details
  }
}
