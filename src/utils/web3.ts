import {
  defaultEnvironmentNetworkId,
  networks
} from '@firestarter-private/firestarter-library/lib/constants/networks'
import BigNumber from 'bignumber.js'
import Web3 from 'web3'

const rpcUrl =
  networks[defaultEnvironmentNetworkId].privateRPC ||
  networks[defaultEnvironmentNetworkId].rpcUrl
const httpProvider = new Web3.providers.HttpProvider(rpcUrl, {
  timeout: 10000
})

export const web3NoAccount = new Web3(httpProvider)
export const maxUint256 = new BigNumber(2).pow(256).minus(1)
export const maxUint256String = maxUint256.toFixed(0, 1)
