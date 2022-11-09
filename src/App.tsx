import React from 'react'
import { GasPriceProvider } from '@firestarter-private/firestarter-library'
import Routes from '@router/Routes'
import { StateProvider } from '@store/index'
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'

import { NetworkContextName } from '@/constants'

import { Web3ReactManager } from './components'

const getLibrary = (provider: any, connector: any): any => {
  return provider
}

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

function App() {
  return (
    <StateProvider>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Web3ProviderNetwork getLibrary={getLibrary}>
          <Web3ReactManager>
            <GasPriceProvider>
              <Routes />
            </GasPriceProvider>
          </Web3ReactManager>
        </Web3ProviderNetwork>
      </Web3ReactProvider>
    </StateProvider>
  )
}

export default App
