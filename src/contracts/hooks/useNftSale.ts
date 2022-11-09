import { useCallback, useEffect, useMemo, useState } from 'react'
import { useQuery } from '@apollo/client'
import {
  useDecimals,
  useNetwork,
  useTokenBalance,
  useTransactions,
  useWeb3
} from '@firestarter-private/firestarter-library'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { BlockNumber, TransactionReceipt } from 'web3-core'

import { IWhitelistPhase } from '@/components'

import { getPhaseSoldAmountQuery } from '@api/subgraph/accounts/queries'
import {
  IPhaseSoldAmount,
  SubgraphPhaseSoldAmountResponse
} from '@api/subgraph/accounts/types'

import { useIsMounted } from '@hooks/useIsMounted'
import { useSelector } from '@hooks/useSelector'

import { sendExceptionReport } from '@utils/errors'

import { ContractAddress } from '../address'
import { getNftSaleContract } from '../getContract'
import { NotifyTxCallbacks } from '../notify'

export interface NftSale {
  collection: ContractAddress
  fundToken: ContractAddress
  startTime: number
  endTime: number
  salePrice: BigNumber
  userCap: number
  start: number
  phaseCap: number
  whitelist: ContractAddress
  preminted: boolean
  totalSoldAmount: number
  whitelistType: number
  phaseId: number
}

export const useNftSale = (
  fundTokenAddress: ContractAddress | undefined,
  saleContractAddress: ContractAddress | undefined
) => {
  const isMountedRef = useIsMounted()
  const web3 = useWeb3()
  const { account } = useWeb3React()
  const { currentNetworkId } = useNetwork()
  const { callTransaction, sendTransaction } = useTransactions()
  const nftSaleContract = useMemo(
    () => getNftSaleContract(currentNetworkId, saleContractAddress, web3),
    [currentNetworkId, web3, saleContractAddress]
  )

  const currentPhase = useSelector<IWhitelistPhase>(
    (state) => state.currentCollection?.presale.currentPhase
  )
  const nftCollectionAddress = useSelector<ContractAddress>(
    (state) => state.currentCollection?.presale.reward_token.address
  )

  const [isBuying, setIsBuying] = useState<boolean>(false)
  const [blockNumber, setBlockNumber] = useState<BlockNumber>('latest')
  const [totalSold, setTotalSold] = useState<number>(0)
  const [nftBalance, setBalance] = useState<number>(0)
  const [soldAmountPerCurrentPhase, setSoldAmountPerCurrentPhase] =
    useState<number>(0)

  const fundTokenBalance = useTokenBalance(
    fundTokenAddress,
    isBuying,
    blockNumber
  )
  const fundTokenDecimals = useDecimals(fundTokenAddress)

  const { refetch } = useQuery<SubgraphPhaseSoldAmountResponse>(
    getPhaseSoldAmountQuery,
    {
      variables: {
        phaseId: currentPhase?.phase_id,
        collection: nftCollectionAddress.toLowerCase()
      },
      onCompleted: async (data) => {
        if (data.phases.length) {
          const totalSoldByCollection: number = data.phases.reduce(
            (acc: number, phase: IPhaseSoldAmount) => {
              return acc + Number(phase.soldAmount)
            },
            0
          )

          const totalSoldByCurrentPhase =
            +data.phases.filter(
              (phase) => Number(phase.phaseId) === currentPhase?.phase_id
            )[0]?.soldAmount || 0

          isMountedRef.current && setTotalSold(Number(totalSoldByCollection))
          isMountedRef.current &&
            setSoldAmountPerCurrentPhase(totalSoldByCurrentPhase)
        }
      },
      onError: (e) => {
        sendExceptionReport(e)
      }
    }
  )

  const getBalance = useCallback(
    async (phaseId: number) => {
      if (!account || !nftSaleContract) {
        setBalance(0)
        return
      }

      const balance = await callTransaction(
        nftSaleContract.methods.balance(phaseId, account),
        blockNumber
      )
      isMountedRef.current && setBalance(Number(balance))
    },
    [nftSaleContract, account, isMountedRef, blockNumber, callTransaction]
  )

  const resetStats = useCallback(() => {
    getBalance(currentPhase.phase_id)
    refetch()
  }, [])

  useEffect(() => {
    if (currentPhase?.phase_id && !isBuying) {
      resetStats()
    }
  }, [blockNumber, account, nftSaleContract, currentPhase])

  // start buy methods

  const buyPublic = useCallback(
    async (
      phaseId: number,
      amount: string,
      callbacks: NotifyTxCallbacks = {}
    ) => {
      if (!account || !nftSaleContract) {
        return
      }

      setIsBuying(true)

      const receipt = (await sendTransaction(
        await nftSaleContract.methods.buyPublic(phaseId, amount),
        callbacks
      )) as TransactionReceipt

      if (isMountedRef.current) {
        setBlockNumber(receipt.blockNumber)
        setIsBuying(false)
      }
      return receipt
    },
    [nftSaleContract, account, isMountedRef, sendTransaction]
  )

  const buyMerkle = useCallback(
    async (
      phaseId: number,
      amount: string,
      alloc: string,
      proof: string[],
      callbacks: NotifyTxCallbacks = {}
    ) => {
      if (!account || !nftSaleContract) {
        return
      }

      setIsBuying(true)

      const receipt = (await sendTransaction(
        await nftSaleContract.methods.buyMerkle(phaseId, amount, alloc, proof),
        callbacks
      )) as TransactionReceipt

      if (isMountedRef.current) {
        setBlockNumber(receipt.blockNumber)
        setIsBuying(false)
      }
      return receipt
    },
    [nftSaleContract, account, isMountedRef, sendTransaction]
  )

  const buyBook = useCallback(
    async (
      phaseId: number,
      amount: string,
      callbacks: NotifyTxCallbacks = {}
    ) => {
      if (!account || !nftSaleContract) {
        return
      }

      setIsBuying(true)

      const receipt = (await sendTransaction(
        await nftSaleContract.methods.buyBook(phaseId, amount),
        callbacks
      )) as TransactionReceipt

      if (isMountedRef.current) {
        setBlockNumber(receipt.blockNumber)
        setIsBuying(false)
      }
      return receipt
    },
    [nftSaleContract, account, isMountedRef, sendTransaction]
  )

  const buyNft = useCallback(
    async (
      phaseId: number,
      tokenId: number,
      amount: string,
      callbacks: NotifyTxCallbacks = {}
    ) => {
      if (!account || !nftSaleContract) {
        return
      }

      setIsBuying(true)

      const receipt = (await sendTransaction(
        await nftSaleContract.methods.buyNFT(phaseId, tokenId, amount),
        callbacks
      )) as TransactionReceipt

      if (isMountedRef.current) {
        setBlockNumber(receipt.blockNumber)
        setIsBuying(false)
      }
      return receipt
    },
    [nftSaleContract, account, isMountedRef, sendTransaction]
  )

  return {
    fundTokenBalance,
    fundTokenDecimals,
    totalSold,
    soldAmountPerCurrentPhase,
    resetStats,
    nftBalance,
    buyPublic,
    buyMerkle,
    buyBook,
    buyNft
  }
}
