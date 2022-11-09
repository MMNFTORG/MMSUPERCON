import { WhitelistStatus } from '@api/whitelist/types'

import { sendExceptionReport } from '@utils/errors'
import { toChecksumAddress } from '@utils/string'

import { instanceWithSignature as API } from '../config'

import { WhitelistRequestArgs, WhitelistSuccessResponse } from './types'

export const sendDataForWhitelist = async ({
  collection_id,
  wallet_address,
  form_data
}: WhitelistRequestArgs): Promise<WhitelistStatus | null> => {
  try {
    const { data } = await API.post(
      '/apply-to-collection-whitelist',
      {
        wallet_address: toChecksumAddress(wallet_address),
        form_data
      },
      {
        params: {
          collection_id
        }
      }
    )

    return (data as WhitelistSuccessResponse).status
  } catch (err) {
    sendExceptionReport(err)
    return null
  }
}
