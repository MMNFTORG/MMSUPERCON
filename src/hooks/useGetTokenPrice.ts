import { useEffect, useState } from 'react'

import { getPricesByTokenSymbol } from '../api'

type IUseGetPrice = [number, (tokenAmount: number) => number]

export const useGetTokenPrice = (symbol?: string): IUseGetPrice => {
  const [tokenPrice, setTokenPrice] = useState<number>(0)
  const tokenSymbol = symbol || process.env.REACT_APP_TOKEN_SYMBOL || 'ETH'

  const getPrice = async () => {
    const price = Number(await getPricesByTokenSymbol(tokenSymbol))
    setTokenPrice(price)
  }

  const calculateAmountInUsd = (tokenAmount: number) => tokenAmount * tokenPrice

  useEffect(() => {
    getPrice()
  }, [tokenSymbol])

  return [tokenPrice, calculateAmountInUsd]
}
