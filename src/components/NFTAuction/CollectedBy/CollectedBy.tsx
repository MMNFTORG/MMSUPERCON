import React from 'react'

import { WalletBadge } from '../../common'

import './CollectedBy.css'

interface ICollectedByProps {
  account: string
}

export const CollectedBy = ({ account }: ICollectedByProps) => {
  return (
    <div
      className={
        'tile d-flex justify-content-between align-items-md-center align-items-start flex-column flex-md-row collected-by'
      }
    >
      <span>Collected by</span>
      <WalletBadge account={account} />
    </div>
  )
}
