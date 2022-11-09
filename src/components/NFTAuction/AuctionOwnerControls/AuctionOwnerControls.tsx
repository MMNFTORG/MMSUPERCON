import React, { useCallback, useMemo, useState } from 'react'
import { ButtonGroup } from 'react-bootstrap'
import { useHistory } from 'react-router'
import { generatePath } from 'react-router-dom'
import { WalletAddress } from '@firestarter-private/firestarter-library/lib/types'
import { RoutesPaths } from '@router/constants'
import BigNumber from 'bignumber.js'

import {
  AuctionSaleStatusesProps,
  AuctionSaleStatusProps,
  ResetAuctionModal,
  RoundButton,
  SiteButton,
  TokenInfo
} from '@/components'

import {
  CancelAuctionRequest,
  ResetAuctionRequest,
  WithdrawAuctionRequest
} from '@contracts/hooks/useNftAuction'
import { NotifyTxCallbacks } from '@contracts/notify'

import { balanceToNumber } from '@utils/currency'

import { ReactComponent as InfoIcon } from '@assets/info-icon.svg'

enum SuccessMessages {
  cancel = 'Auction successfully canceled',
  withdraw = 'Auction successfully finished',
  update = 'Auction successfully updated'
}

type ContractInteractionFunction<Request> = (
  input: Request,
  callbacks?: NotifyTxCallbacks
) => Promise<void>

interface IAuctionOwnerControlsProps {
  statusMessage: AuctionSaleStatusProps
  tokenId: BigNumber
  collection_id: string
  tokenAddress: string
  currentBid: BigNumber
  currentBidder: WalletAddress
  bidIncrement: BigNumber
  decimals: number
  fundToken: TokenInfo
  cancelAuction: ContractInteractionFunction<CancelAuctionRequest>
  withdrawAuction: ContractInteractionFunction<WithdrawAuctionRequest>
  resetAuction: ContractInteractionFunction<ResetAuctionRequest>
}

export const AuctionOwnerControls = ({
  statusMessage,
  tokenId,
  tokenAddress,
  cancelAuction,
  withdrawAuction,
  resetAuction,
  currentBid,
  collection_id,
  bidIncrement,
  currentBidder,
  decimals,
  fundToken
}: IAuctionOwnerControlsProps) => {
  const [show, setShow] = useState<boolean>(false)
  const [successMessage, setSuccessMessage] = useState<SuccessMessages | null>(
    null
  )
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const history = useHistory()

  const handleCancelAuction = useCallback(async () => {
    try {
      await cancelAuction(
        { tokenAddress, tokenId },
        {
          onSuccess: () => {
            setErrorMessage(null)
            setSuccessMessage(SuccessMessages.cancel)
            setTimeout(
              () =>
                history.push(
                  generatePath(RoutesPaths.NFT_ASSET, {
                    collection_id,
                    asset_id: tokenId.toString()
                  })
                ),
              1500
            )
          }
        }
      )
    } catch (e: any) {
      setSuccessMessage(null)
      setErrorMessage(e?.message)
    }
  }, [tokenAddress, tokenId])

  const handleWithdrawAuction = useCallback(async () => {
    try {
      await withdrawAuction(
        {
          tokenAddress,
          tokenId
        },
        {
          onSuccess: () => {
            setErrorMessage(null)
            setSuccessMessage(SuccessMessages.withdraw)
            setTimeout(() => history.go(0), 1500)
          }
        }
      )
    } catch (e: any) {
      setSuccessMessage(null)
      setErrorMessage(e?.message)
    }
  }, [tokenAddress, tokenId])

  const onReset = useCallback(
    async ({ endTime, bidIncrement, reservePrice }) => {
      try {
        await resetAuction(
          {
            tokenId,
            tokenAddress,
            endTime,
            bidIncrement,
            reservePrice
          },
          {
            onSuccess: () => {
              setErrorMessage(null)
              setSuccessMessage(SuccessMessages.update)
              setTimeout(() => history.go(0), 1500)
            }
          }
        )
      } catch (e: any) {
        setSuccessMessage(null)
        setErrorMessage(e?.message)
      }
    },
    [tokenAddress, tokenId]
  )

  const disableWithdraw = useMemo(
    () => new BigNumber(currentBidder).isZero() || currentBid.isZero(),
    [currentBidder, currentBid]
  )

  const newReservePrice = useMemo(
    () => balanceToNumber(currentBid.plus(bidIncrement), decimals),
    [bidIncrement, currentBid, decimals]
  )

  return (
    <div className="mt-3">
      <ButtonGroup>
        <SiteButton size="large" onClick={handleCancelAuction}>
          Cancel auction
        </SiteButton>
        {statusMessage === AuctionSaleStatusesProps['Auction Opened'] && (
          <SiteButton
            size={'large'}
            onClick={handleWithdrawAuction}
            disabled={disableWithdraw}
          >
            Withdraw
          </SiteButton>
        )}
        {statusMessage === AuctionSaleStatusesProps['Auction Opened'] && (
          <SiteButton size={'large'} onClick={() => setShow(true)}>
            Update
          </SiteButton>
        )}
      </ButtonGroup>

      {!!successMessage && (
        <div className="form-message form-message--info mt-3 mb-3">
          <InfoIcon />
          <span>{successMessage}</span>
        </div>
      )}

      {!!errorMessage && (
        <div className="form-message form-message--warning mt-3 mb-3">
          <InfoIcon />
          <span>{errorMessage}</span>
        </div>
      )}

      <ResetAuctionModal
        show={show}
        setShow={setShow}
        onReset={onReset}
        newReservePrice={newReservePrice}
        decimals={decimals}
        fundToken={fundToken}
      />
    </div>
  )
}
