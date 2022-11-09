import { CancelToken } from 'axios'

import { IAuctionSale } from '@/components'

import { ICreateAuctionArgs } from '@api/assetSale/types'

import { sendExceptionReport } from '@utils/errors'

import { instanceWithSignature as API } from '../config'

export const _createAuction = async (
  {
    collection_id,
    asset_id,
    name,
    sale_details,
    wallet_address
  }: ICreateAuctionArgs,
  cancelToken?: CancelToken
): Promise<IAuctionSale | null> => {
  try {
    const { data } = await API.post<IAuctionSale>(
      '/create-auction',
      {
        collection_id,
        asset_id,
        name,
        sale_details,
        wallet_address
      },
      {
        cancelToken
      }
    )

    return data
  } catch (err) {
    sendExceptionReport(err)
    throw err
  }
}
