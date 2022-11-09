import axios, { CancelToken } from 'axios'

import { IAuctionSale, INormalizedAuctionSale } from '@/components'

import { normalizeAuction } from '@api/assetSale/mapping'

import { sendExceptionReport } from '@utils/errors'

import { instance as API } from '../config'

const MAX_RESULTS: number = 10

export const _getAuctionByAssetIdAndCollectionId = async (
  asset_id: string,
  collection_id: string,
  starts_at: Date,
  end_at: Date,
  cancelToken?: CancelToken
): Promise<INormalizedAuctionSale | null> => {
  try {
    const { data } = await API.get<IAuctionSale>('/get-auction', {
      params: {
        asset_id,
        collection_id
      },
      cancelToken
    })

    const normalizedAuction = normalizeAuction(data, starts_at, end_at)

    return normalizedAuction
  } catch (err) {
    if (err instanceof axios.Cancel) {
      throw err
    }
    sendExceptionReport(err)
    return null
  }
}

export const _getAuctions = async (
  page: number,
  cancelToken?: CancelToken
): Promise<IAuctionSale[]> => {
  try {
    const { data } = await API.get<IAuctionSale[]>('/get-auctions', {
      params: {
        max_results: MAX_RESULTS,
        page: page
      },
      cancelToken
    })

    return data
  } catch (err) {
    if (err instanceof axios.Cancel) {
      throw err
    }
    sendExceptionReport(err)
    return []
  }
}
