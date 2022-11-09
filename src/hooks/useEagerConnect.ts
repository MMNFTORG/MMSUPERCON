import { useCallback, useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useWeb3React } from '@web3-react/core'

import { injected, walletconnect } from '../connectors'

export function useEagerConnect() {
  const { activate, active } = useWeb3React()
  const [tried, setTried] = useState(false)

  const checkInjected = useCallback(() => {
    return injected.isAuthorized().then((isAuthorized: boolean) => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          setTried(true)
        })
      } else {
        // @ts-ignore
        if (isMobile && window.etherum) {
          activate(walletconnect, undefined, true).catch(() => {
            setTried(true)
          })
        } else {
          setTried(true)
        }
      }
    })
  }, [activate])

  useEffect(() => {
    checkInjected()
  }, [activate, checkInjected])

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (active) {
      setTried(true)
    }
  }, [active])

  return tried
}
