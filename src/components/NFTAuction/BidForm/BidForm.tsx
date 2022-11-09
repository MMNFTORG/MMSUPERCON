import React, { useCallback, useMemo, useState } from 'react'
import { FormControl } from 'react-bootstrap'
import { Col, Row } from 'react-bootstrap'
import { useHistory } from 'react-router'
import { WalletAddress } from '@firestarter-private/firestarter-library/lib/types'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'

import { ApprovalSteps, RoundButton, SiteButton } from '@/components'

import { PlaceBidRequest } from '@contracts/hooks/useNftAuction'
import { NotifyTxCallbacks } from '@contracts/notify'

import { useGetTokenPrice } from '@hooks/useGetTokenPrice'

import { formatUSD, numericToBalance, numericToUint256 } from '@utils/currency'

import { ReactComponent as InfoIcon } from '@assets/info-icon.svg'

import './BidForm.css'

interface IBidFormProps {
  minAllowed: number
  reservePrice: BigNumber
  currentBid: BigNumber
  currentBidder: WalletAddress
  bidToken: string
  canBid: boolean
  tokenId: BigNumber
  fundTokenName: string
  fundTokenAllowance: BigNumber
  fundTokenBalance: BigNumber
  tokenAddress: string
  fundTokenDecimals: number
  onApprove: (amount?: string, callbacks?: NotifyTxCallbacks) => Promise<void>
  placeBid: (
    input: PlaceBidRequest,
    callbacks?: NotifyTxCallbacks
  ) => Promise<void>
}

export const BidForm = ({
  minAllowed,
  canBid,
  placeBid,
  tokenId,
  fundTokenName,
  onApprove,
  fundTokenAllowance,
  currentBidder,
  currentBid,
  fundTokenBalance,
  tokenAddress,
  fundTokenDecimals
}: IBidFormProps) => {
  const [tokenPrice, calculateAmountInUsd] = useGetTokenPrice(fundTokenName)
  const [bid, setBid] = useState<number>(minAllowed)
  const { account } = useWeb3React()
  const history = useHistory()

  const usdAmount: string = useMemo(
    () => formatUSD(calculateAmountInUsd(minAllowed)),
    [minAllowed, tokenPrice]
  )

  const isLastBidder = useMemo(
    () => currentBidder === account,
    [currentBidder, account]
  )

  const lowBalance = useMemo(
    () => fundTokenBalance.isLessThan(new BigNumber(bid)),
    [fundTokenBalance, bid]
  )

  const transformedBidValue = useMemo(
    () => numericToBalance(bid.toString(), fundTokenDecimals),
    [bid, fundTokenDecimals]
  )

  const disableApproval = useMemo(() => {
    return (
      fundTokenAllowance.isGreaterThanOrEqualTo(transformedBidValue) ||
      Number(bid) <= 0 ||
      !canBid ||
      isLastBidder ||
      currentBid.isGreaterThanOrEqualTo(transformedBidValue) ||
      lowBalance
    )
  }, [fundTokenAllowance, bid, canBid, lowBalance, isLastBidder, currentBid])

  const disableMakeBid = useMemo(() => {
    return (
      !canBid ||
      Number(bid) <= 0 ||
      fundTokenAllowance.isZero() ||
      !fundTokenAllowance.isGreaterThanOrEqualTo(transformedBidValue) ||
      isLastBidder ||
      currentBid.isGreaterThanOrEqualTo(transformedBidValue) ||
      lowBalance
    )
  }, [canBid, bid, fundTokenAllowance, lowBalance, isLastBidder, currentBid])

  const handleMakeBid = useCallback(async () => {
    if (disableMakeBid || !account) {
      return
    }
    await placeBid(
      {
        amount: transformedBidValue,
        tokenAddress: tokenAddress,
        tokenId,
        fromAddress: account
      },
      {
        onHash: () => setBid(0),
        onSuccess: () => history.go(0)
      }
    )
  }, [disableMakeBid, placeBid, tokenId, bid, account])

  const warningMessage = useMemo(() => {
    if (!canBid) {
      return 'Auction is not started or already finished'
    }
    if (isLastBidder) {
      return 'You is last bidder of auction'
    }
    if (lowBalance) {
      return 'You have not enough balance to buy'
    }
    if (transformedBidValue.isLessThanOrEqualTo(currentBid)) {
      return 'You bid should be higher then current bid'
    }
    return false
  }, [canBid, transformedBidValue, currentBid, lowBalance, isLastBidder])

  return (
    <div className={'mt-md-5 pt-3 bid-form-wrapper'}>
      <Row className={'align-items-center mb-md-5 mb-3'}>
        <Col md={6}>
          <div className={'price'}>
            <span className={'grey-text price__description'}>
              Minimum allowed
            </span>
            <div className={'price__value'}>
              <b>
                {minAllowed} {fundTokenName}
              </b>{' '}
              ({usdAmount})
            </div>
          </div>
        </Col>

        <Col md={6}>
          <form noValidate className="bid-form mt-md-0 mt-3">
            <FormControl
              placeholder={minAllowed.toString()}
              type="number"
              inputMode="numeric"
              value={bid}
              onChange={(e) => setBid(+e.currentTarget.value)}
              min={minAllowed}
              className={'tar'}
            />
          </form>
        </Col>
      </Row>

      {!!warningMessage && (
        <div className="form-message form-message--warning text-center mb-3 mb-md-4">
          <InfoIcon />
          <span>{warningMessage}</span>
        </div>
      )}

      <div className="bid-form__buttons">
        <SiteButton
          size="large"
          disabled={disableApproval}
          onClick={() =>
            onApprove(numericToUint256(bid.toString(), fundTokenDecimals))
          }
        >
          Approve
        </SiteButton>
        <SiteButton
          size={'large'}
          onClick={handleMakeBid}
          disabled={disableMakeBid}
          fullWidth
        >
          Make a Bid
        </SiteButton>
      </div>
      <ApprovalSteps fillingCondition={disableApproval} />
    </div>
  )
}
