import { useCallback, useContext, useMemo, useRef } from 'react'
import { useWeb3React } from '@web3-react/core'
import axios, { CancelTokenSource } from 'axios'

import {
  _getCollectionById,
  _getCollections,
  _getWhitelistedCollections,
  CollectionFilters
} from '../api/collection'
import { AppContext } from '../store'
import {
  getCompletedCollections,
  getFeaturedCollections,
  getLiveCollections,
  getUpcomingCollections
} from '../store/getters'
import { ActionType, AppState } from '../store/types'

import { useSelector } from './useSelector'

export const useCollectionsState = () => {
  const { state, dispatch } = useContext(AppContext)
  const { account } = useWeb3React()
  const cancelSource = useRef<CancelTokenSource | null>(null)

  const { loading, collections, currentCollection, whitelistedCollections } =
    useSelector<AppState>((state) => state)
  const liveCollections = getLiveCollections(state)
  const upcomingCollections = getUpcomingCollections(state)
  const featuredCollections = getFeaturedCollections(state)
  const completedCollections = getCompletedCollections(state)

  const getCollections = useCallback(
    async ({ chainId }: CollectionFilters = {}) => {
      const cancelToken = axios.CancelToken
      cancelSource.current = cancelToken.source()

      dispatch({ type: ActionType.SET_LOADING })

      try {
        const payload = await _getCollections(cancelSource.current?.token, {
          chainId
        })
        dispatch({
          type: ActionType.SET_COLLECTIONS,
          payload
        })
      } catch (err) {
        cancelSource.current = null
      }
    },
    [dispatch]
  )

  const getWhitelistedCollections = useCallback(
    async ({ chainId }: CollectionFilters = {}) => {
      const cancelToken = axios.CancelToken
      cancelSource.current = cancelToken.source()

      if (!account) {
        dispatch({
          type: ActionType.SET_WHITElLISTED_COLLECTIONS,
          payload: []
        })
        return
      }

      dispatch({ type: ActionType.SET_LOADING })

      try {
        const payload = await _getWhitelistedCollections(
          account,
          cancelSource.current?.token,
          { chainId }
        )
        dispatch({
          type: ActionType.SET_WHITElLISTED_COLLECTIONS,
          payload: payload
        })
      } catch (err) {
        cancelSource.current = null
      }
    },
    [account]
  )

  const getCollectionById = useCallback(async (id: string) => {
    dispatch({ type: ActionType.SET_LOADING, payload: true })
    const payload = await _getCollectionById(id)
    dispatch({
      type: ActionType.SET_COLLECTION,
      payload
    })
  }, [])

  const abortRequest = useCallback(() => {
    dispatch({ type: ActionType.SET_LOADING, payload: false })
    cancelSource.current && cancelSource.current?.cancel()
  }, [cancelSource, dispatch])

  return {
    loading,
    collections,
    currentCollection,
    whitelistedCollections,
    liveCollections,
    upcomingCollections,
    completedCollections,
    featuredCollections,
    getCollections,
    getWhitelistedCollections,
    getCollectionById,
    abortRequest
  }
}
