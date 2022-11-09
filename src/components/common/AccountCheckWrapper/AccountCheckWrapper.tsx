import React from 'react'
import { useWeb3React } from '@web3-react/core'

import { ConnectWalletTile } from '../ConnectWalletTile'

interface IAccountCheckWrapperProps {
  children: React.ReactNode
  fallback?: React.ReactNode | JSX.Element
}

export const AccountCheckWrapper = ({
  children,
  fallback
}: IAccountCheckWrapperProps) => {
  const { account } = useWeb3React()

  if (!account) {
    return <>{fallback}</>
  }
  return <>{children}</>
}

AccountCheckWrapper.defaultProps = {
  fallback: <ConnectWalletTile />
}
