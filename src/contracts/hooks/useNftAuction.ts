import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNetwork, useTransactions, useWeb3 } from '@firestarter-private/firestarter-library'
import { StateAuction } from '@store/types'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { BlockNumber, TransactionReceipt } from 'web3-core'

import { ContractAddress } from '@contracts/address'
import { useNftCollection } from '@contracts/hooks/useNftCollection'

import { useDispatch } from '@hooks/useDispatch'
import { useIsMounted } from '@hooks/useIsMounted'
import { useSelector } from '@hooks/useSelector'

import { sendExceptionReport } from '@utils/errors'

import { getNftAuctionContract } from '../getContract'
import { NotifyTxCallbacks } from '../notify'

export interface Auction {
  tokenAddress: string
  tokenId: BigNumber
  owner: string
  reservePrice: BigNumber
  startTime: number
  endTime: number
  currentBid: BigNumber
  bidIncrement: BigNumber
  currentBidder: string
  bidToken: string
  canBid: boolean
}

export interface CreateAuctionRequest {
  tokenAddress: string
  tokenId: BigNumber
  reservePrice: BigNumber
  startTime: number
  endTime: number
  bidIncrement: BigNumber
  bidToken: string
}

export interface WithdrawAuctionRequest {
  tokenAddress: string
  tokenId: BigNumber
}

export interface PlaceBidRequest {
  tokenAddress: string
  tokenId: BigNumber
  fromAddress: string
  amount: BigNumber
}

export interface ResetAuctionRequest {
  tokenAddress: string
  tokenId: BigNumber
  reservePrice: BigNumber
  endTime: number
  bidIncrement: BigNumber
}

export interface CancelAuctionRequest {
  tokenAddress: string
  tokenId: BigNumber
}

export const useNftAuction = (nftCollectionAddress?: ContractAddress) => {
  const isMountedRef = useIsMounted()
  const web3 = useWeb3()
  const { account } = useWeb3React()
  const { currentNetworkId } = useNetwork()
  const dispatch = useDispatch()
  const { callTransaction, sendTransaction } = useTransactions()
  const [approved, setApproved] = useState<boolean>(false)
  const [isOwner, setIsOwner] = useState<boolean>(false)

  const nftAuctionContract = useMemo(
    () => getNftAuctionContract(currentNetworkId, web3),
    [currentNetworkId, web3]
  )
  const { currentAuction, loading } = useSelector<StateAuction>(
    (state) => state.auction
  )

  const { getApproved } = useNftCollection(nftCollectionAddress || '')

  const [blockNumber, setBlockNumber] = useState<BlockNumber>('latest')

  const getAuction = async (
    tokenId: BigNumber,
    tokenAddress?: string
  ): Promise<null | Auction> => {
    if (!account || !nftAuctionContract) {
      return null
    }

    try {
      const auction = await callTransaction(
        nftAuctionContract.methods.getAuctionStatus(
          tokenAddress,
          tokenId.toString()
        ),
        blockNumber
      )

      const auctionNormalizedData: Auction = {
        tokenAddress: auction[0][0],
        tokenId: new BigNumber(auction[0][1]),
        owner: auction[0][2],
        reservePrice: new BigNumber(auction[0][3]),
        startTime: Number(auction[0][4]),
        endTime: Number(auction[0][5]),
        currentBid: new BigNumber(auction[0][6]),
        bidIncrement: new BigNumber(auction[0][7]),
        currentBidder: auction[0][8],
        bidToken: auction[0][9],
        canBid: auction[1]
      }

      return auctionNormalizedData
    } catch (err) {
      sendExceptionReport(err)
      return null
    }
  }

  const checkApproved = useCallback(
    async (tokenId: string) => {
      if (!account || !nftAuctionContract) {
        return
      }

      try {
        const approvedAddress = await getApproved(tokenId)

        if (isMountedRef.current) {
          setApproved(
            !new BigNumber(approvedAddress).isZero() &&
              approvedAddress === process.env.REACT_APP_AUCTION_CONTRACT_ADDRESS
          )
        }
      } catch (err) {
        sendExceptionReport(err)
        throw err
      }
    },
    [account, nftAuctionContract]
  )

  const createAuction = async (
    input: CreateAuctionRequest,
    callbacks: NotifyTxCallbacks = {}
  ) => {
    if (!account || !nftAuctionContract) {
      return
    }

    try {
      const receipt = (await sendTransaction(
        nftAuctionContract.methods.createAuction([
          input.tokenAddress,
          input.tokenId.toString(),
          input.reservePrice.toString(),
          input.startTime,
          input.endTime,
          input.bidIncrement.toString(),
          input.bidToken
        ]),
        callbacks
      )) as TransactionReceipt

      setBlockNumber(receipt.blockNumber)
    } catch (err) {
      sendExceptionReport(err)
      throw err
    }
  }

  const placeBid = useCallback(
    async (input: PlaceBidRequest, callbacks: NotifyTxCallbacks = {}) => {
      if (!account || !nftAuctionContract) {
        return
      }

      try {
        const receipt = (await sendTransaction(
          nftAuctionContract.methods.placeBid([
            input.tokenAddress,
            input.tokenId.toString(),
            input.fromAddress,
            input.amount.toString()
          ]),
          callbacks
        )) as TransactionReceipt

        setBlockNumber(receipt.blockNumber)
      } catch (err) {
        sendExceptionReport(err)
        throw err
      }
    },
    [account, nftAuctionContract]
  )

  const withdrawAuction = async (
    input: WithdrawAuctionRequest,
    callbacks: NotifyTxCallbacks = {}
  ) => {
    if (!account || !nftAuctionContract) {
      return
    }

    try {
      const receipt = (await sendTransaction(
        nftAuctionContract.methods.withdrawAuction([
          input.tokenAddress,
          input.tokenId.toString()
        ]),
        callbacks
      )) as TransactionReceipt

      setBlockNumber(receipt.blockNumber)
    } catch (err) {
      sendExceptionReport(err)
      throw err
    }
  }

  const resetAuction = async (
    input: ResetAuctionRequest,
    callbacks: NotifyTxCallbacks = {}
  ) => {
    if (!account || !nftAuctionContract) {
      return
    }

    try {
      const receipt = (await sendTransaction(
        nftAuctionContract.methods.resetAuction([
          input.tokenAddress,
          input.tokenId.toString(),
          input.reservePrice.toString(),
          input.bidIncrement.toString(),
          input.endTime
        ]),
        callbacks
      )) as TransactionReceipt

      setBlockNumber(receipt.blockNumber)
    } catch (err) {
      sendExceptionReport(err)
    }
  }

  const cancelAuction = async (
    input: CancelAuctionRequest,
    callbacks: NotifyTxCallbacks = {}
  ) => {
    if (!account || !nftAuctionContract) {
      return
    }

    try {
      const receipt = (await sendTransaction(
        nftAuctionContract.methods.cancelAuction([
          input.tokenAddress,
          input.tokenId.toString()
        ]),
        callbacks
      )) as TransactionReceipt

      setBlockNumber(receipt.blockNumber)
    } catch (err) {
      sendExceptionReport(err)
    }
  }

  useEffect(() => {
    if (isMountedRef.current) {
      setIsOwner(currentAuction?.contractData?.owner === account)
    }
  }, [currentAuction, account])

  return {
    getAuction,
    createAuction,
    placeBid,
    withdrawAuction,
    resetAuction,
    cancelAuction,
    loading,
    currentAuction,
    checkApproved,
    approved,
    isOwner
  }
}
