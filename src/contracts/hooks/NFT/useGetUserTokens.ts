import { useCallback, useEffect } from 'react'
import { useIsMounted } from '@firestarter-private/firestarter-library/lib/hooks/helpers/useIsMounted'
import { ActionType, NFTMetadata } from '@store/types'
import { useWeb3React } from '@web3-react/core'

import { useNFTPagination } from '@contracts/hooks/NFT/useNFTPagination'

import { useDispatch } from '@hooks/useDispatch'

import { chunkArrayBySize } from '@utils/array'
import { sendExceptionReport } from '@utils/errors'

import { ContractAddress, WalletAddress } from '../../address'
import { useNftCollection } from '../useNftCollection'

import { useGetUserTokenMetadataByIndex } from './useGetTokenMetadataByIndex'

export const useGetUserTokens = (
  collectionAddress: ContractAddress,
  pageSize: number = 9
) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const { totalNFTAmount, setTotalNFTAmount, page, setPage } =
    useNFTPagination()
  const { balanceOf } = useNftCollection(collectionAddress)
  const isMountedRef = useIsMounted()
  const getUserTokenMetadataByIndex =
    useGetUserTokenMetadataByIndex(collectionAddress)

  const getNFTAmount = useCallback(async () => {
    if (!account) return
    const totalUserNFTs = (await balanceOf(account)) || 0
    isMountedRef && setTotalNFTAmount(totalUserNFTs)
  }, [collectionAddress, account])

  useEffect(() => {
    if (collectionAddress) {
      getNFTAmount()
    }
  }, [collectionAddress, account])

  useEffect(() => {
    return () =>
      dispatch({
        type: ActionType.SET_USER_NFTS,
        payload: null
      })
  }, [])

  const getUserTokens = useCallback(
    async (account?: WalletAddress | null) => {
      if (!totalNFTAmount) return
      dispatch({ type: ActionType.SET_FETCHING_NFT_COLLECTION, payload: true })

      if (!account) {
        dispatch({
          type: ActionType.SET_USER_NFTS,
          payload: []
        })
        dispatch({
          type: ActionType.SET_FETCHING_NFT_COLLECTION,
          payload: false
        })
        return
      }

      try {
        const tokensData: NFTMetadata[] = []
        const tokensChunks = chunkArrayBySize(
          Array.from(Array(+totalNFTAmount).keys()),
          pageSize
        )
        tokensData.push(
          ...(await Promise.all(
            tokensChunks[page - 1].map((index) => {
              return getUserTokenMetadataByIndex(account, index)
            })
          ))
        )

        setPage((prevPage) => prevPage + 1)

        isMountedRef.current &&
          dispatch({
            type:
              page === 1 ? ActionType.SET_USER_NFTS : ActionType.ADD_USER_NFTS,
            payload: tokensData
          })
      } catch (err) {
        sendExceptionReport(err)
        dispatch({
          type: ActionType.SET_USER_NFTS,
          payload: []
        })
      } finally {
        dispatch({
          type: ActionType.SET_FETCHING_NFT_COLLECTION,
          payload: false
        })
      }
    },
    [account, collectionAddress, page, totalNFTAmount]
  )

  return { getUserTokens, totalUserNFTAmount: totalNFTAmount }
}
