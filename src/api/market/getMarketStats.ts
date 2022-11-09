import axios, { CancelToken } from 'axios'

import { IMarketStatsResponse } from '@api/market/types'

import { sendExceptionReport } from '@utils/errors'

import { instance as API } from '../config'

export const _getMarketStats = async (
  cancelToken?: CancelToken
): Promise<IMarketStatsResponse | null> => {
  try {
    const { data } = await API.get<IMarketStatsResponse>('/get-market-stats', {
      cancelToken
    })
    return data
  } catch (err) {
    if (err instanceof axios.Cancel) {
      throw err
    }
    sendExceptionReport(err)
    return null
  }
}
