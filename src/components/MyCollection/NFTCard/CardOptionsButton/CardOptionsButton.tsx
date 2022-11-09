import React, { useRef, useState } from 'react'
import { Image, Modal } from 'react-bootstrap'

import { DynamicImage, ShareWithBlock } from '@/components'

import { useOnClickOutside } from '@hooks/useClickOutside'

import OptionsIco from '@assets/card-option-ico.svg'

import './CardOptionsButton.scss'

interface ICardOptionsButtonProps {
  openseaLink: string
}

export const CardOptionsButton = ({
  openseaLink
}: ICardOptionsButtonProps): JSX.Element => {
  const [opened, setOpened] = useState<boolean>(false)
  const [shareModalOpened, setShareModalOpened] = useState(false)
  const wrapperRef = useRef(null)

  useOnClickOutside(wrapperRef, () => setOpened(false))
  useOnClickOutside(wrapperRef, () => setOpened(false))

  const optionButtonClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    setOpened((prevState) => !prevState)
  }

  const openseaClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    window.open(openseaLink, '_blank')
    setOpened(false)
  }

  const shareButtonClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    setOpened(false)
    setShareModalOpened(true)
  }

  return (
    <div
      className="card-options-button"
      ref={wrapperRef}
      onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
    >
      <button
        className="card-options-button__button"
        onClick={optionButtonClickHandler}
      >
        <Image src={OptionsIco} alt={'ico'} />
      </button>

      {opened && (
        <div className="card-options-button__options-wrapper">
          <ul>
            <li>
              <button onClick={openseaClickHandler}>open on opensea</button>
            </li>
            <li>
              <button onClick={shareButtonClickHandler}>share</button>
            </li>
          </ul>
        </div>
      )}

      <Modal
        show={shareModalOpened}
        onBackdropClick={() => setShareModalOpened(false)}
        onHide={() => setShareModalOpened(false)}
      >
        <div className={'share-modal'}>
          <button
            className={'share-modal__close'}
            onClick={() => setShareModalOpened(false)}
          >
            <DynamicImage path={'close.svg'} alt={'close'} />
          </button>

          <ShareWithBlock text={'Share NFT'} title={'Share nft'} />
        </div>
      </Modal>
    </div>
  )
}
