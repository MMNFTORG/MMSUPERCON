import React from 'react'
import { Image } from 'react-bootstrap'

import { CommonTooltip } from '../CommonTooltip'

import './BalanceItem.css'

interface Props {
  image: string
  title: string
  balance: string
  token?: string
  tooltipText?: string
}

export const BalanceItem = ({
  image,
  title,
  balance,
  token,
  tooltipText
}: Props) => {
  return (
    <div className="balance-item">
      <Image className="balance-item__icon" src={image} rounded />
      <div>
        <div className="tile__description balance-item__title">
          {title}
          {tooltipText ? (
            <CommonTooltip
              id={`${title.toLowerCase().replace(' ', '-')}-tooltip`}
              placement="auto"
            >
              {tooltipText}
            </CommonTooltip>
          ) : (
            ''
          )}
        </div>
        <div className="tile__main balance-item__main">
          {balance} {token}
        </div>
      </div>
    </div>
  )
}
