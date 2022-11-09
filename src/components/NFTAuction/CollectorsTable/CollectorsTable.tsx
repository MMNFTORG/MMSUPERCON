import React from 'react'

import { Copiable, DynamicImage, ICollectorEntity } from '@/components'
import { getRandomWalletIco } from '@/helpers/getRandomWalletIco'

import { useGetTokenPrice } from '@hooks/useGetTokenPrice'
import { useMediaDimensions } from '@hooks/useMediaDimensions'

import { formatUSD } from '@utils/currency'
import { shorterETHAddress } from '@utils/string'

interface ICollectorsTableProps {
  collectors: ICollectorEntity[]
}

export const CollectorsTable = ({ collectors }: ICollectorsTableProps) => {
  const { md } = useMediaDimensions()
  const tokenSymbol = process.env.REACT_APP_TOKEN_SYMBOL
  const [, calculateAmountInUsd] = useGetTokenPrice(tokenSymbol)
  return (
    <div className="collectors-table">
      {md && (
        <div className="collectors-table__head">
          <div className="collectors-table__row">
            <div className="collectors-table__column">Collector</div>
            <div className="collectors-table__column">Bid</div>
            <div className="collectors-table__column">Placed</div>
          </div>
        </div>
      )}
      <div className="collectors-table__body">
        {collectors.map((item, index) => (
          <div
            className="collectors-table__row collector-item"
            key={index + item.wallet}
          >
            <div className="collectors-table__column">
              <div className="collector-item__wallet">
                <DynamicImage
                  path={`wallets/${getRandomWalletIco()}`}
                  roundedCircle
                />
                <span>
                  <Copiable text={item.wallet}>
                    {shorterETHAddress(item.wallet, 6, -6)}
                  </Copiable>
                </span>
              </div>
            </div>
            <div className="collectors-table__column">
              {!md && (
                <span className={'collector-item__mobile-desc'}>Bid</span>
              )}
              <div className="collector-item__price">
                <b>
                  {item.bid.tokenAmount.toFixed(2)} {tokenSymbol}
                </b>
                <span>
                  ({formatUSD(calculateAmountInUsd(item.bid.tokenAmount))})
                </span>
              </div>
            </div>
            <div className="collectors-table__column">
              {!md && (
                <span className={'collector-item__mobile-desc'}>Placed</span>
              )}
              <div className="collector-item__date">{item.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
