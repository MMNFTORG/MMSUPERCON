import { AssetPresaleStatusesProps } from './api/assetSale/types'
import { AuctionSaleStatusesProps } from './components/NFTAuction/types'

export const WhitelistStatus = {
  ...AssetPresaleStatusesProps,
  ...AuctionSaleStatusesProps
}
