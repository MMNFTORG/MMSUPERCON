import React from 'react'
import { Image } from 'react-bootstrap'

import { shorterETHAddress } from '@utils/string'

import WalletIcon from '@assets/wallet-icon.svg'

import './WalletBadge.css'

interface IWalletBadge {
  account: string
}

export const WalletBadge = ({ account }: IWalletBadge) => {
  return (
    <div className={'wallet-badge d-flex justify-content-between mt-3 mt-md-0'}>
      <Image src={WalletIcon} />
      {shorterETHAddress(account)}
    </div>
  )
}
