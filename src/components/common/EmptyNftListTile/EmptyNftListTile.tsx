import React from 'react'

import './EmptyNftListTile.scss'

interface IEmptyNftListTileProps {
  text?: string
}

export const EmptyNftListTile = ({
  text = 'NFT list is empty...'
}: IEmptyNftListTileProps) => {
  return (
    <div className="tile--with-shadow no-nfts-tile">
      <div className="dots">
        <div />
        <div />
        <div />
      </div>
      <p className="tile__description">{text}</p>
    </div>
  )
}
