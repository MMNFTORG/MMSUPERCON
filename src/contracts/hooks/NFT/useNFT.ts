import { useEffect, useState } from 'react'
import { AppState } from '@store/types'
import { useWeb3React } from '@web3-react/core'

import { ContractAddress } from '@contracts/address'

import { useIsMounted } from '@hooks/useIsMounted'
import { useSelector } from '@hooks/useSelector'

import { sendExceptionReport } from '@utils/errors'

import { useNftCollection } from '../useNftCollection'

import { useGetNFTTokenById } from './useGetNFTTokenById'
import { useGetNFTTokens } from './useGetNFTTokens'
import { useGetUserTokens } from './useGetUserTokens'

export const useNFT = (
  collectionAddress: ContractAddress,
  pageSize: number = 9
) => {
  const [isOwner, setIsOwner] = useState(false)
  const { totalSupply, ownerOf } = useNftCollection(collectionAddress)
  const getNFTTokenById = useGetNFTTokenById(collectionAddress)
  const { getUserTokens, totalUserNFTAmount } = useGetUserTokens(
    collectionAddress,
    pageSize
  )
  const [total, setTotal] = useState<number>(0)
  const { getNFTTokens, totalNFTAmount } = useGetNFTTokens(
    collectionAddress,
    pageSize
  )
  const isMountedRef = useIsMounted()
  const { account } = useWeb3React()
  const {
    userNFTTokens,
    fetchingCollection,
    fetchingCurrentToken,
    currentNFT,
    NFTTokens
  } = useSelector<AppState['NFT']>((state) => state.NFT)

  useEffect(() => {
    const getTotal = async () => {
      try {
        const totalSupplyAmount = await totalSupply()
        isMountedRef.current && setTotal(totalSupplyAmount || 0)
      } catch (e) {
        sendExceptionReport(e)
      }
    }
    getTotal()
  }, [account, collectionAddress])

  useEffect(() => {
    const getIsOwner = async () => {
      if (!account || !currentNFT) {
        isMountedRef.current && setIsOwner(false)
        return null
      }
      try {
        const ownerAddress = await ownerOf(currentNFT.id)

        isMountedRef.current && setIsOwner(ownerAddress === account)
      } catch (e) {
        sendExceptionReport(e)
      }
    }
    getIsOwner()
  }, [account, currentNFT, collectionAddress])

  return {
    getUserTokens,
    getNFTTokenById,
    getNFTTokens,
    totalNFTAmount,
    totalUserNFTAmount,
    loading: fetchingCollection,
    loadingCurrent: fetchingCurrentToken,
    userNFTTokens,
    currentNFT,
    NFTTokens,
    total,
    isOwner
  }
}
