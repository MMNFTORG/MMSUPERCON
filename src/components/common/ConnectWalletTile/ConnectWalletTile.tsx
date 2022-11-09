import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { MetaMask } from '@firestarter-private/firestarter-library/lib/constants/connectors'
import { useWeb3React } from '@web3-react/core'

import { SiteButton } from '@/components'

import { WalletAddress } from '@contracts/address'

import { useWalletConnect } from '@hooks/useWalletConnect'

import { shorterETHAddress } from '@utils/string'

import { ReactComponent as ConnectIcon } from '@assets/connection-icon.svg'
import WalletIcon from '@assets/wallet.svg'

import './ConnectWalletTile.scss'

export const ConnectWalletTile = () => {
  const { account, active } = useWeb3React()

  const { onClickWallet } = useWalletConnect()

  return (
    <Row className="connect-row">
      <Col md={{ span: 5 }} className="text-center column tile">
        <span className="icon">
          <img src={WalletIcon} alt="connect your wallet" />
        </span>
        <h4 className="tile__main">Connect your wallet</h4>
        <div>
          <SiteButton color="RED" size="large" onClick={onClickWallet}>
            <>
              {active
                ? shorterETHAddress(account as WalletAddress)
                : 'Connect Wallet'}
              <ConnectIcon />
            </>
          </SiteButton>
        </div>
      </Col>
    </Row>
  )
}
