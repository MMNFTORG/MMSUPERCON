import { Web3Provider } from '@ethersproject/providers'
import {
  defaultEnvironmentNetworkId,
  supportedNetworks
} from '@firestarter-private/firestarter-library/lib/constants/networks'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

import { NetworkConnector } from './NetworkConnector'

const rpcMapping: Record<number, string> = {}
for (const id of Object.keys(supportedNetworks)) {
  if (Number(id) !== 80001) {
    rpcMapping[Number(id)] = supportedNetworks[id].rpcUrl
  } else {
    rpcMapping[Number(id)] = 'https://matic-mumbai.chainstacklabs.com/'
  }
}

const chainIdsMapping = Object.keys(supportedNetworks).map((id) => Number(id))

export const network = new NetworkConnector({
  urls: rpcMapping,
  defaultChainId: Number(defaultEnvironmentNetworkId)
})

let networkLibrary: Web3Provider | undefined
export function getNetworkLibrary(): Web3Provider {
  return (networkLibrary =
    networkLibrary ?? new Web3Provider(network.provider as any))
}

export const injected = new InjectedConnector({
  supportedChainIds: chainIdsMapping
})

export const walletconnect = new WalletConnectConnector({
  rpc: rpcMapping,
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true
})
