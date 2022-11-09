import { isMobile } from 'react-device-detect'
import { useWeb3 } from '@firestarter-private/firestarter-library'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'

import { injected, walletconnect } from '@/connectors'

export const useWalletConnect = (): { onClickWallet: () => void } => {
  const web3 = useWeb3()
  const { activate } = useWeb3React()

  const onClickWallet = () => {
    if (isMobile) {
      // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
      if (
        // @ts-ignore
        walletconnect.walletConnectProvider?.wc?.uri
      ) {
        walletconnect.walletConnectProvider = undefined
      }
      activate(walletconnect, undefined, true).catch((error) => {
        if (error instanceof UnsupportedChainIdError) {
          activate(walletconnect) // a little janky...can't use setError because the connector isn't set
        }
      })
      // @ts-ignore
      web3.setProvider(window.ethereum)
    } else {
      activate(injected)
    }
  }

  return { onClickWallet }
}
