import { useCallback } from 'react'
import { ActionType } from '@store/types'

import { useDispatch } from '@hooks/useDispatch'

import { sendExceptionReport } from '@utils/errors'

import { ContractAddress } from '../../address'

import { useGetTokenMetadataById } from './useGetTokenMetadataById'

export const useGetNFTTokenById = (collectionAddress: ContractAddress) => {
  const dispatch = useDispatch()
  const getTokenMetadataById = useGetTokenMetadataById(collectionAddress)

  return useCallback(
    async (tokenId: string) => {
      dispatch({ type: ActionType.SET_FETCHING_CURRENT_NFT, payload: true })

      try {
        const metadata = await getTokenMetadataById(tokenId)

        dispatch({
          type: ActionType.SET_CURRENT_NFT,
          payload: metadata
        })
        dispatch({
          type: ActionType.SET_FETCHING_CURRENT_NFT,
          payload: false
        })
        return
      } catch (e) {
        sendExceptionReport(e)
        dispatch({
          type: ActionType.SET_CURRENT_NFT,
          payload: null
        })
        dispatch({
          type: ActionType.SET_FETCHING_CURRENT_NFT,
          payload: false
        })
        return
      }
    },
    [collectionAddress]
  )
}
