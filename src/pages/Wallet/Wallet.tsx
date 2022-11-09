import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import { ConnectWalletTile } from '@components/index'

// styles
import './Wallet.css'

interface Props {}

export const Wallet = (props: Props) => {
  return (
    <div className="wallet-page page">
      <Container>
        <Row className="top-row">
          <Col md={{ span: 10, offset: 1 }} className="text-left">
            <div className="title">Account</div>
          </Col>
        </Row>

        <ConnectWalletTile />
      </Container>
    </div>
  )
}

export default Wallet
