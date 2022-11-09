import { useEffect, useRef } from 'react'
import { ActionType, AppState, IMarketStats } from '@store/types'
import { CancelTokenSource } from 'axios'

import { _getMarketStats } from '@api/market'

import { useDispatch } from '@hooks/useDispatch'
import { useSelector } from '@hooks/useSelector'

export const useMarket = () => {
  const cancelSource = useRef<CancelTokenSource | null>(null)
  const { stats, statsLoading } = useSelector<AppState['market']>(
    (state) => state.market
  )
  const dispatch = useDispatch()
  const getMarketStats = async () => {
    try {
      const payload = await _getMarketStats(cancelSource.current?.token)
      dispatch({
        type: ActionType.SET_MARKET_STATS,
        payload: payload as IMarketStats
      })
    } catch (err) {
      cancelSource.current = null
    }
  }

  useEffect(() => {
    getMarketStats()
  }, [])

  return {
    stats,
    statsLoading,
    getMarketStats
  }
}
