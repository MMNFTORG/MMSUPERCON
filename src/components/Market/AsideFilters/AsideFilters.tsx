import React, { Dispatch, SetStateAction, useMemo } from 'react'
import { Container, Image, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { RoutesPaths } from '@router/constants'
import { IMarketStats } from '@store/types'

import { TagsFilter } from '@/components'

import { AdmissionFilter } from '@components/Market/AsideFilters/AdmissionFilter'
import { MmTokenFilter } from '@components/Market/AsideFilters/MMTokenFilter'

import { useMediaDimensions } from '@hooks/useMediaDimensions'

import closeIco from '@assets/close-menu.svg'
import logo from '@assets/logo.png'

import './AsideFilters.scss'

interface IAsideFiltersProps {
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
  stats: IMarketStats
}

export const AsideFilters = ({
  setShowModal,
  showModal,
  stats
}: IAsideFiltersProps): JSX.Element => {
  const { lg } = useMediaDimensions()
  const MemorizedFilters = React.memo(() => (
    <div className="aside-filters">
      <MmTokenFilter />
      <AdmissionFilter />
      <TagsFilter />
    </div>
  ))
  return !lg ? (
    <Modal
      className={'filter-modal'}
      show={showModal}
      onHide={() => setShowModal(false)}
      backdrop={false}
    >
      <Container>
        <div className="filter-modal__head">
          <div className="filter-modal__logo">
            <Link to={RoutesPaths.MAIN}>
              <img src={logo} alt="Logo" className="d-inline-block align-top" />
            </Link>
          </div>

          <div className="filter-modal__close">
            <button onClick={() => setShowModal(false)}>
              <Image src={closeIco} />
            </button>
          </div>
        </div>
        <MemorizedFilters />
      </Container>
    </Modal>
  ) : (
    <MemorizedFilters />
  )
}
