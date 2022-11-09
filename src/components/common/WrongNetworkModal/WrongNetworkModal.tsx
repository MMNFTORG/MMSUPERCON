import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { isMobile } from 'react-device-detect'
import { useLocation } from 'react-router-dom'
import { useNetwork } from '@firestarter-private/firestarter-library'
import { CustomNetworkError } from '@firestarter-private/firestarter-library/lib/utils/errors'
import { UnsupportedChainIdError } from '@web3-react/core'
import { NoEthereumProviderError } from '@web3-react/injected-connector'

import { AddNetworkButton } from '../AddNetworkButton'
import { RoundButton } from '../RoundButton'

// styles
import './WrongNetworkModal.css'

interface Props {
  error?: Error
}

export const WrongNetworkModal = ({ error }: Props) => {
  const [show, setShow] = useState<boolean>(false)
  let location = useLocation()
  const { isDefaultNetworkSelected, defaultNetwork, currentNetworkId } =
    useNetwork()
  const isWrongNetwork = !!currentNetworkId && !isDefaultNetworkSelected

  useEffect(() => {
    setShow(
      error instanceof UnsupportedChainIdError ||
        error instanceof NoEthereumProviderError ||
        error instanceof CustomNetworkError ||
        isWrongNetwork
    )
  }, [error, isWrongNetwork, location])

  return (
    <Modal
      show={show}
      centered
      onHide={() => setShow(false)}
      className="wrong-network-modal"
      contentClassName="tile text-center"
      backdrop="static"
    >
      <Modal.Title as="h4">
        {error instanceof UnsupportedChainIdError
          ? 'Please change your Network'
          : error instanceof NoEthereumProviderError
          ? 'No provider detected'
          : 'Error'}
      </Modal.Title>
      <Modal.Body className="p-0">
        {error instanceof UnsupportedChainIdError || isWrongNetwork ? (
          <>
            <p>It looks like your Wallet is connected to the wrong network</p>
            <p>
              Please change to the {defaultNetwork.name} Network on this page
            </p>
          </>
        ) : error instanceof NoEthereumProviderError ? (
          <p>
            Please make sure you have
            <a
              href="https://metamask.io/download.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              {' '}
              MetaMask extension{' '}
            </a>
            installed for your browser and connected your wallet to the website.
          </p>
        ) : (
          <p>{error?.message}</p>
        )}
        <div className="wrong-network-modal__buttons">
          {error instanceof UnsupportedChainIdError || isWrongNetwork ? (
            <>
              <RoundButton size="large" wide onClick={() => setShow(false)}>
                Dismiss
              </RoundButton>
              {!isMobile && <AddNetworkButton size="large" />}
            </>
          ) : (
            <RoundButton size="large" wide onClick={() => setShow(false)}>
              OK
            </RoundButton>
          )}
        </div>
      </Modal.Body>
    </Modal>
  )
}
