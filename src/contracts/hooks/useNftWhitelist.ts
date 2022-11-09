import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNetwork, useTransactions, useWeb3 } from '@firestarter-private/firestarter-library'
import { useWeb3React } from '@web3-react/core'
import { BlockNumber } from 'web3-core'

import { ContractAddress } from '@/components'

import { getNftWhitelistContract } from '@contracts/getContract'
import { useNftCollection } from '@contracts/hooks/useNftCollection'

import { useIsMounted } from '@hooks/useIsMounted'

export const useNftWhitelist = (
  NftWhitelistContractAddress: ContractAddress | undefined
) => {
  const isMountedRef = useIsMounted()
  const web3 = useWeb3()
  const { account } = useWeb3React()
  const { currentNetworkId } = useNetwork()
  const { callTransaction } = useTransactions()
  const [nftWhitelistCollectionAddress, setNftWhitelistCollectionAddress] =
    useState<ContractAddress | undefined>(undefined)
  const [allocation, setAllocation] = useState<number>(0)
  const [allocPerItem, setAllocPerItem] = useState<number>(0)
  const [isWhitelisted, setIsWhitelisted] = useState<boolean>(false)
  const [blockNumber, setBlockNumber] = useState<BlockNumber>('latest')
  const [nftTokenId, setNftTokenId] = useState<number | null>(null)
  const nftWhitelistContract = useMemo(
    () =>
      getNftWhitelistContract(
        currentNetworkId,
        NftWhitelistContractAddress,
        web3
      ),
    [currentNetworkId, web3, NftWhitelistContractAddress, account]
  )

  const { balanceOf, tokenOfOwnerByIndex } = useNftCollection(
    nftWhitelistCollectionAddress
  )

  const getNftWhitelistSetting = useCallback(async () => {
    if (!nftWhitelistContract || !account) {
      return
    }

    const [allocationPerItem, collectionAddress] = await Promise.all([
      callTransaction(nftWhitelistContract.methods.allocPerItem(), blockNumber),
      callTransaction(nftWhitelistContract.methods.nft(), blockNumber)
    ])

    if (isMountedRef) {
      setNftWhitelistCollectionAddress(collectionAddress)
      setAllocPerItem(allocationPerItem)
    }
  }, [account, nftWhitelistContract, blockNumber])

  const getWalletAllocation = useCallback(async () => {
    if (!nftWhitelistContract || !account || !nftWhitelistCollectionAddress) {
      return
    }

    const balance = await balanceOf(account)

    if (balance) {
      isMountedRef && setIsWhitelisted(true)
      const tokenId = await tokenOfOwnerByIndex(account, 0)

      isMountedRef && setNftTokenId(tokenId)

      const remainingAlloc = await callTransaction(
        nftWhitelistContract.methods.getRemainingAlloc(account, tokenId),
        blockNumber
      )

      isMountedRef && setAllocation(remainingAlloc)
    }
  }, [
    account,
    nftWhitelistContract,
    nftWhitelistCollectionAddress,
    blockNumber
  ])

  useEffect(() => {
    getNftWhitelistSetting()
  }, [NftWhitelistContractAddress, nftWhitelistContract, account, blockNumber])

  useEffect(() => {
    getWalletAllocation()
  }, [
    allocPerItem,
    nftWhitelistCollectionAddress,
    nftWhitelistContract,
    account,
    blockNumber
  ])

  return {
    isWhitelisted,
    allocPerItem,
    allocation,
    getWalletAllocation,
    nftTokenId
  }
}
