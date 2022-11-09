import { JsonRpcResponse } from 'web3-core-helpers/types'

import { sendExceptionReport } from './errors'
import { web3NoAccount } from './web3'

export const createWalletSignature = async (
  data: string
): Promise<string | null> => {
  const web3 = web3NoAccount
  const account = web3.givenProvider.selectedAddress

  let signature = ''
  if (!web3) {
    return null
  }

  const params = [data, account]
  // @ts-ignore
  await web3.givenProvider.send(
    {
      method: 'personal_sign',
      params,
      from: account
    },
    (error: Error | null, result?: JsonRpcResponse) => {
      if (error) return sendExceptionReport(error)
      if (result?.error) return sendExceptionReport(result.error)

      signature = result?.result
    }
  )

  return signature
}
