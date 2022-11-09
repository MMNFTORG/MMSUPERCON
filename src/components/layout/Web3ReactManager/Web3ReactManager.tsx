import React, { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'

import { network } from '@/connectors'
import { NetworkContextName } from '@/constants'
import { useEagerConnect } from '@/hooks/useEagerConnect'
import { useInactiveListener } from '@/hooks/useInactiveListener'

export const Web3ReactManager = ({ children }: { children: any }) => {
  const { active } = useWeb3React()
  const {
    active: networkActive,
    error: networkError,
    activate: activateNetwork
  } = useWeb3React(NetworkContextName)

  // try to eagerly connect to an injected provider, if it exists and has granted access already
  const triedEager = useEagerConnect()

  // after eagerly trying injected, if the network connect ever isn't active or in an error state, activate itd
  useEffect(() => {
    if (triedEager && !networkActive && !networkError && !active) {
      activateNetwork(network)
    }
  }, [triedEager, networkActive, networkError, activateNetwork, active])

  useInactiveListener(!triedEager)

  return children
}
