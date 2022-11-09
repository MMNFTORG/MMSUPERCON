import React, { useMemo } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { isMobile } from 'react-device-detect'
import { useNetwork } from '@firestarter-private/firestarter-library'
import { NetworkInfo } from '@firestarter-private/firestarter-library/lib/constants/networks'

import { AddNetworkButton } from '../AddNetworkButton'

import './WrongNetworkBlock.scss'

export const getNetworkIcon = (network: NetworkInfo): string => {
  return `/networks/${network.icon}.png`
}

interface IWrongNetworkBlock {
  type: 'NFT list' | 'Collection' | 'Whitelist' | 'Auction'
}

export const WrongNetworkBlock = ({ type }: IWrongNetworkBlock) => {
  const { currentNetwork, defaultNetwork } = useNetwork()
  const tileText = useMemo(() => {
    switch (type) {
      case 'Collection':
        return 'If you want to participate in this collection presale'
      case 'NFT list':
        return 'If you want look on NFTs'
      case 'Whitelist':
        return 'To apply to the collection whitelist'
      case 'Auction':
        return 'To participate in auction'
      default:
        return 'For using project'
    }
  }, [type])

  return (
    <Container>
      <Row className="tile">
        <Col className="non-polygon-block text-center text-big">
          <p>
            You are on
            <span
              className="network-name"
              style={{ color: currentNetwork?.color }}
            >
              {currentNetwork && <img src={getNetworkIcon(currentNetwork)} />}
              {currentNetwork?.userFriendlyName}
            </span>
            now.
          </p>
          <p>
            {tileText} you need to switch to the
            <span
              className="network-name"
              style={{ color: defaultNetwork?.color }}
            >
              {defaultNetwork && <img src={getNetworkIcon(defaultNetwork)} />}
              {defaultNetwork?.userFriendlyName}
            </span>
            network
          </p>
          {!isMobile && (
            <AddNetworkButton
              size="large"
              wide
              networkId={defaultNetwork.networkId}
            />
          )}
        </Col>
      </Row>
    </Container>
  )
}
