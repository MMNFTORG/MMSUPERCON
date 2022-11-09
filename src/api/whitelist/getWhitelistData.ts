import { AxiosError } from 'axios'

import { sendExceptionReport } from '../../utils/errors'
import { instance as API } from '../config'

import {
  GetWhitelistArgs,
  GetWhitelistDataReturns,
  WhitelistSuccessResponse
} from './types'

export const getWhitelistData = async ({
  account,
  projectId
}: GetWhitelistArgs): Promise<GetWhitelistDataReturns | null> => {
  try {
    const { data } = await API.get<WhitelistSuccessResponse>(
      '/get-whitelist-data',
      {
        params: {
          wallet_address: account,
          project_id: projectId
        }
      }
    )

    return {
      status: data.status,
      paramsData: data.params_data
    }
  } catch (err) {
    if ((err as AxiosError).response?.status !== 404) {
      sendExceptionReport(err)
    }
    return null
  }
}
