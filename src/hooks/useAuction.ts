import { useCallback, useRef } from 'react'
import { useDecimals } from '@firestarter-private/firestarter-library'
import { ContractAddress } from '@firestarter-private/firestarter-library/lib/types'
import { ActionType, AppState } from '@store/types'
import { useWeb3React } from '@web3-react/core'
import axios, { CancelTokenSource } from 'axios'
import BigNumber from 'bignumber.js'

import { SaleStatuses } from '@/components'

import {
  _cancelAuction,
  _createAuction,
  _getAuctionByAssetIdAndCollectionId,
  _updateAuction,
  ICreateAuctionArgs
} from '@api/assetSale'

import {
  CreateAuctionRequest,
  ResetAuctionRequest,
  useNftAuction
} from '@contracts/hooks/useNftAuction'
import { NotifyTxCallbacks } from '@contracts/notify'

import { useDispatch } from '@hooks/useDispatch'
import { useIsMounted } from '@hooks/useIsMounted'
import { useSelector } from '@hooks/useSelector'

import { balanceToNumber } from '@utils/currency'
import { sendExceptionReport } from '@utils/errors'

const useAuction = (
  nftCollectionAddress?: string,
  fundTokenAddress?: ContractAddress
) => {
  const cancelSource = useRef<CancelTokenSource | null>(null)
  const isMountedRef = useIsMounted()
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const collection = useSelector<AppState['currentCollection']>(
    (state) => state.currentCollection
  )
  const auction = useSelector<AppState['auction']>((state) => state.auction)
  const {
    createAuction: createAuctionContract,
    getAuction: getAuctionContractData,
    cancelAuction: cancelAuctionContract,
    withdrawAuction: withdrawAuctionContract,
    resetAuction: resetAuctionContract
  } = useNftAuction(nftCollectionAddress)

  const fundDecimals = useDecimals(fundTokenAddress)

  const createAuction = useCallback(
    async (
      contractData: CreateAuctionRequest,
      {
        asset_id,
        collection_id,
        name,
        sale_details
      }: Omit<ICreateAuctionArgs, 'wallet_address'>,
      callbacks: NotifyTxCallbacks = {}
    ) => {
      if (!fundTokenAddress || !account) {
        return null
      }

      const cancelToken = axios.CancelToken
      cancelSource.current = cancelToken.source()
      try {
        await createAuctionContract(contractData, callbacks)

        const contractAuctionData = await getAuctionContractData(
          new BigNumber(asset_id),
          nftCollectionAddress
        )

        const auctionExist =
          !!contractAuctionData &&
          !new BigNumber(contractAuctionData.owner || 0).isZero()

        if (auctionExist) {
          const auction = await _createAuction(
            {
              asset_id,
              collection_id,
              name,
              sale_details: {
                starts_at: new Date(
                  contractAuctionData.startTime * 1000
                ).toString(),
                end_at: new Date(contractAuctionData.endTime * 1000).toString(),
                starting_bid: balanceToNumber(
                  contractAuctionData.reservePrice,
                  fundDecimals
                )
              },
              wallet_address: account
            },
            cancelSource.current?.token
          )

          return auction
        }
        return null
      } catch (err) {
        sendExceptionReport(err)
        throw err
      }
    },
    [nftCollectionAddress]
  )

  const getAuction = useCallback(
    async (asset_id: string, collection_id: string) => {
      try {
        dispatch({
          type: ActionType.SET_FETCHING_AUCTION,
          payload: true
        })
        const contractAuctionData = await getAuctionContractData(
          new BigNumber(asset_id),
          nftCollectionAddress
        )

        const auctionData = await _getAuctionByAssetIdAndCollectionId(
          asset_id,
          collection_id,
          collection?.whitelisting?.starts_at!,
          collection?.whitelisting?.end_at!
        )
        if (contractAuctionData && auctionData && isMountedRef.current) {
          dispatch({
            type: ActionType.SET_AUCTION_BACKEND_DATA,
            payload: auctionData
          })
          dispatch({
            type: ActionType.SET_AUCTION_CONTRACT_DATA,
            payload: contractAuctionData
          })
        }
      } catch (err) {
        dispatch({
          type: ActionType.SET_AUCTION_BACKEND_DATA,
          payload: null
        })
        dispatch({
          type: ActionType.SET_AUCTION_CONTRACT_DATA,
          payload: null
        })
        sendExceptionReport(err)
        throw err
      } finally {
        isMountedRef.current &&
          dispatch({
            type: ActionType.SET_FETCHING_AUCTION,
            payload: false
          })
      }
    },
    [nftCollectionAddress]
  )

  const getAuctions = useCallback(async () => {}, [])

  const cancelAuction = async (
    input: { tokenAddress: ContractAddress; tokenId: BigNumber },
    callbacks: NotifyTxCallbacks = {}
  ) => {
    try {
      await cancelAuctionContract(input, callbacks)
      await _cancelAuction(auction?.currentAuction?.backendData?.id!)
    } catch (e) {
      sendExceptionReport(e)
    }
  }

  const withdrawAuction = async (
    input: { tokenAddress: ContractAddress; tokenId: BigNumber },
    callbacks: NotifyTxCallbacks = {}
  ) => {
    try {
      await withdrawAuctionContract(input, callbacks)
      await _updateAuction({
        id: auction?.currentAuction?.backendData?.id!,
        data: {
          sale_details: {
            status: SaleStatuses.completed
          }
        }
      })
    } catch (e) {
      sendExceptionReport(e)
    }
  }

  const resetAuction = async (
    input: ResetAuctionRequest,
    callbacks: NotifyTxCallbacks = {}
  ) => {
    try {
      await resetAuctionContract(input, callbacks)
      await _updateAuction({
        id: auction?.currentAuction?.backendData?.id!,
        data: {
          sale_details: {
            end_at: new Date(input.endTime * 1000).toString(),
            starting_bid: balanceToNumber(input.reservePrice, fundDecimals),
            status: SaleStatuses.active
          }
        }
      })
    } catch (e) {
      sendExceptionReport(e)
    }
  }

  return {
    createAuction,
    getAuction,
    cancelAuction,
    withdrawAuction,
    resetAuction
  }
}

export default useAuction
