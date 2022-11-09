import { CancelToken } from 'axios'

import { IAuctionSale } from '@/components'

import { IUpdateAuctionArgs } from '@api/assetSale/types'

import { sendExceptionReport } from '@utils/errors'

import { instance as API } from '../config'

export const _updateAuction = async (
  { id, data }: IUpdateAuctionArgs,
  cancelToken?: CancelToken
): Promise<IAuctionSale | null> => {
  try {
    const { data: responseData } = await API.put<IAuctionSale>(
      '/update-auction',
      data,
      {
        params: {
          id
        },
        cancelToken
      }
    )

    return responseData
  } catch (err) {
    sendExceptionReport(err)
    throw err
  }
}
