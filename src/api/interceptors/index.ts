import { AxiosRequestConfig } from 'axios'

import { createWalletSignature } from '@utils/signature'
import { toChecksumAddress } from '@utils/string'

enum SignedMethods {
  PUT = 'PUT',
  POST = 'POST'
}

const signedMethods: SignedMethods[number][] = [
  SignedMethods.POST,
  SignedMethods.PUT
]

const signatureInterceptorCallback = async (config: AxiosRequestConfig) => {
  if (signedMethods.includes((config.method as string).toUpperCase())) {
    const dataString = JSON.stringify(config.data || config.params)
    const signature = await createWalletSignature(dataString)
    config.headers = {
      ...config.headers,
      Signature: signature ?? ''
    }
  }

  return config
}

const walletAddressInterceptor = (config: AxiosRequestConfig) => {
  const walletAddress = config.params?.wallet_address
  if (walletAddress) {
    config.params.wallet_address = toChecksumAddress(walletAddress)
  }

  return config
}

export { walletAddressInterceptor, signatureInterceptorCallback }
