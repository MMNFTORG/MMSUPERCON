import React from 'react'
import { Modal } from 'react-bootstrap'
import { generatePath } from 'react-router-dom'

import { RoutesPaths } from '@/router/constants'

import { RoundButton } from '@components/index'

// styles
import './SuccessWhitelistModal.css'

interface Props {
  collectionId: string
  show: boolean
}

export const SuccessWhitelistModal = ({ collectionId, show }: Props) => {
  return (
    <Modal
      show={show}
      centered
      className="success-modal"
      contentClassName="tile text-center"
      backdrop="static"
    >
      <Modal.Title as="h4">Application was successfully submitted</Modal.Title>
      <Modal.Body className="p-0">
        <div>
          <p>
            This may take some time... you can check the whitelisting status on
            the presale page
          </p>
          <RoundButton
            size="large"
            wide
            to={generatePath(RoutesPaths.COLLECTION_DETAILS, {
              collection_id: collectionId
            })}
          >
            To presale
          </RoundButton>
        </div>
      </Modal.Body>
    </Modal>
  )
}
