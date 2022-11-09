import { useCallback, useEffect, useState } from 'react'
import { useNetwork } from '@firestarter-private/firestarter-library'
import { ActionType } from '@store/types'
import { useWeb3React } from '@web3-react/core'

import { chunkArrayBySize } from '@/utils/array'
import { sendExceptionReport } from '@/utils/errors'

import { useNFTPagination } from '@contracts/hooks/NFT/useNFTPagination'

import { useDispatch } from '@hooks/useDispatch'
import { useIsMounted } from '@hooks/useIsMounted'

import { ContractAddress } from '../../address'
import { useNftCollection } from '../useNftCollection'

import { useGetTokenMetadataById } from './useGetTokenMetadataById'

export const useGetNFTTokens = (
  collectionAddress: ContractAddress,
  pageSize: number = 9
) => {
  const dispatch = useDispatch()
  const { totalNFTAmount, setTotalNFTAmount, page, setPage } =
    useNFTPagination()
  const { currentNetworkId } = useNetwork()
  const { account } = useWeb3React()
  const { totalSupply, tokenByIndex } = useNftCollection(collectionAddress)
  const isMountedRef = useIsMounted()
  const getTokenMetadataById = useGetTokenMetadataById(collectionAddress)

  const getNFTAmount = useCallback(async () => {
    const NFTTokens = (await totalSupply()) || 0
    isMountedRef && setTotalNFTAmount(NFTTokens)
  }, [collectionAddress])

  useEffect(() => {
    if (collectionAddress) {
      getNFTAmount()
    }
  }, [collectionAddress])

  useEffect(() => {
    return () =>
      dispatch({
        type: ActionType.SET_NFT_TOKENS,
        payload: null
      })
  }, [])

  const getNFTTokens = useCallback(async () => {
    if (!totalNFTAmount) return
    dispatch({ type: ActionType.SET_FETCHING_NFT_COLLECTION, payload: true })

    try {
      const tokensData: any[] = []
      const tokensChunks = chunkArrayBySize(
        Array.from(Array(+totalNFTAmount).keys()),
        pageSize
      )
      tokensData.push(
        ...(await Promise.all(
          tokensChunks[page - 1].map(async (index) => {
            const tokenId = await tokenByIndex(index)
            return getTokenMetadataById(tokenId)
          })
        ))
      )

      setPage((prevPage) => prevPage + 1)

      isMountedRef.current &&
        dispatch({
          type:
            page === 1 ? ActionType.SET_NFT_TOKENS : ActionType.ADD_NFT_TOKENS,
          payload: tokensData
        })
    } catch (err) {
      sendExceptionReport(err)
      dispatch({
        type: ActionType.SET_NFT_TOKENS,
        payload: []
      })
    } finally {
      dispatch({
        type: ActionType.SET_FETCHING_NFT_COLLECTION,
        payload: false
      })
    }
  }, [account, collectionAddress, currentNetworkId, totalNFTAmount, page])

  return { getNFTTokens, totalNFTAmount }
}
