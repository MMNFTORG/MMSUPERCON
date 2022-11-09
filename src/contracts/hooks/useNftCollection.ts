import { useMemo, useState } from 'react'
import { useNetwork, useTransactions, useWeb3 } from '@firestarter-private/firestarter-library'
import { useWeb3React } from '@web3-react/core'
import { BlockNumber, TransactionReceipt } from 'web3-core'

import { ContractAddress, WalletAddress } from '../address'
import { getNftCollectionContract } from '../getContract'

export const useNftCollection = (collectionAddress?: ContractAddress) => {
  const web3 = useWeb3()
  const { account } = useWeb3React()
  const { currentNetworkId } = useNetwork()

  const nftContract = useMemo(
    () => getNftCollectionContract(currentNetworkId, collectionAddress, web3),
    [currentNetworkId, web3, collectionAddress]
  )
  const { callTransaction, sendTransaction } = useTransactions()

  const [blockNumber, setBlockNumber] = useState<BlockNumber>('latest')

  const balanceOf = async (address: string) => {
    if (!account || !nftContract) {
      return null
    }

    const balance = await callTransaction(
      nftContract.methods.balanceOf(address),
      blockNumber
    )
    return +balance
  }

  const ownerOf = async (tokenId: string) => {
    if (!account || !nftContract) {
      return null
    }

    const owner = await callTransaction(
      nftContract.methods.ownerOf(tokenId),
      blockNumber
    )
    return owner
  }

  const totalSupply = async () => {
    if (!nftContract) {
      return null
    }

    const total = await callTransaction(
      nftContract.methods.totalSupply(),
      blockNumber
    )
    return +total
  }

  const tokenURI = async (tokenId: string) => {
    if (!nftContract) {
      return null
    }

    try {
      const uri = await callTransaction(
        nftContract.methods.tokenURI(tokenId),
        blockNumber
      )
      return uri
    } catch (e) {
      return ''
    }
  }

  const tokenOfOwnerByIndex = async (account: WalletAddress, index: number) => {
    if (!account || !nftContract) {
      return null
    }

    const tokenId = await callTransaction(
      nftContract.methods.tokenOfOwnerByIndex(account, index),
      blockNumber
    )
    return tokenId
  }

  const tokenByIndex = async (index: number) => {
    if (!account || !nftContract) {
      return null
    }

    const tokenId = await callTransaction(
      nftContract.methods.tokenByIndex(index),
      blockNumber
    )
    return tokenId
  }

  const getApproved = async (tokenId: string) => {
    if (!account || !nftContract || !tokenId) {
      return null
    }

    const allowance = await callTransaction(
      nftContract.methods.getApproved(tokenId),
      blockNumber
    )
    return allowance
  }

  return {
    balanceOf,
    ownerOf,
    totalSupply,
    tokenURI,
    tokenOfOwnerByIndex,
    getApproved,
    tokenByIndex
  }
}
