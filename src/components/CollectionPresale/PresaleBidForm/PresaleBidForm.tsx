import React, { useCallback, useMemo, useState } from 'react'
import { FormControl, InputGroup } from 'react-bootstrap'
import { Col, Row } from 'react-bootstrap'
import BigNumber from 'bignumber.js'

import {
  ApprovalSteps,
  IWhitelistPhase,
  RoundButton,
  SiteButton,
  WhitelistType
} from '@components/index'

import { WhitelistStatus, WhitelistStatuses } from '@api/whitelist/types'

import { NotifyTxCallbacks } from '@contracts/notify'

import { balanceToNumber } from '@utils/currency'

import { ReactComponent as InfoIcon } from '@assets/info-icon.svg'

import './PresaleBidForm.scss'

interface IPresaleBidFormProps {
  fundTokenAllowance: BigNumber
  onApprove: (amount?: string, callbacks?: NotifyTxCallbacks) => Promise<void>
  fundTokenBalance: BigNumber
  allocation: number
  remainingAllocation: number
  isWhitelisted: boolean
  nftBalance: number
  totalSold: number
  globalCap: number
  currentPhase: IWhitelistPhase
  onBuy: (amount: string, callbacks?: NotifyTxCallbacks) => Promise<void>
  whitelistStatus?: WhitelistStatus
  isSaleInProgress: boolean
  soldAmountPerCurrentPhase: number
}

export const PresaleBidForm = ({
  fundTokenAllowance,
  onApprove,
  fundTokenBalance,
  allocation,
  isWhitelisted,
  remainingAllocation,
  soldAmountPerCurrentPhase,
  nftBalance,
  totalSold,
  globalCap,
  currentPhase,
  onBuy,
  whitelistStatus,
  isSaleInProgress
}: IPresaleBidFormProps) => {
  const [nftAmountToBuy, setNftToBuy] = useState<string>('0')
  const fundsToBeSpent = useMemo(
    () => currentPhase.price.multipliedBy(Number(nftAmountToBuy)),
    [currentPhase, nftAmountToBuy]
  )

  const maxAllocation = useMemo(() => {
    if (!currentPhase.whitelist_type) return currentPhase.user_cap
    return Math.min(allocation, currentPhase.user_cap)
  }, [currentPhase, allocation])

  const availableAllocation = useMemo(() => {
    if (currentPhase?.whitelist_type === WhitelistType.NFT) {
      return remainingAllocation
    } else {
      return maxAllocation - nftBalance
    }
  }, [maxAllocation, nftBalance, remainingAllocation, currentPhase])

  const remainingNFTsInCurrentPhase = useMemo(
    () => currentPhase.max_nft_buy_limit - soldAmountPerCurrentPhase,
    [currentPhase]
  )

  const ableToBuy = useMemo(
    () =>
      Math.floor(balanceToNumber(fundTokenBalance.div(currentPhase.price), 0)),
    [fundTokenBalance, currentPhase]
  )

  const remainingNFTsInCollection = useMemo(
    () => globalCap - totalSold,
    [globalCap, totalSold]
  )

  const maxNFTsToBuy = useMemo(
    () =>
      Math.min(
        availableAllocation,
        remainingNFTsInCurrentPhase,
        ableToBuy,
        currentPhase.user_cap,
        remainingNFTsInCollection
      ),
    [
      availableAllocation,
      remainingNFTsInCurrentPhase,
      ableToBuy,
      currentPhase,
      remainingNFTsInCollection
    ]
  )

  const setMaxToBuy = useCallback(() => {
    setNftToBuy(String(maxNFTsToBuy))
  }, [maxNFTsToBuy])

  const disableApproval = useMemo(() => {
    return (
      fundTokenAllowance.isGreaterThanOrEqualTo(fundsToBeSpent) ||
      Number(nftAmountToBuy) <= 0 ||
      !isWhitelisted
    )
  }, [fundTokenAllowance, fundsToBeSpent, nftAmountToBuy, isWhitelisted])

  const disableBuying = useMemo(() => {
    const nftAmountNumber = Number(nftAmountToBuy)
    return (
      nftAmountNumber <= 0 ||
      !maxNFTsToBuy ||
      maxNFTsToBuy < nftAmountNumber ||
      fundTokenAllowance.isZero() ||
      fundTokenAllowance.isLessThan(fundsToBeSpent) ||
      !isSaleInProgress ||
      !isWhitelisted
    )
  }, [
    nftAmountToBuy,
    maxNFTsToBuy,
    fundTokenAllowance,
    fundsToBeSpent,
    isSaleInProgress,
    isWhitelisted
  ])

  const warningMessage = useMemo(() => {
    if (!isSaleInProgress) {
      return 'The sale is not in progress now.'
    }
    if (
      !currentPhase.whitelisting_disabled &&
      whitelistStatus === WhitelistStatuses['not_submitted']
    ) {
      return 'Your whitelist application was not submitted'
    }
    if (!isWhitelisted) {
      if (currentPhase?.whitelist_type === WhitelistType.BOOK) {
        return 'Your wallet is not added to sale whitelist list'
      }
      if (currentPhase?.whitelist_type === WhitelistType.NFT) {
        return 'Your wallet must own NFT token to have access to the sale'
      }
      return 'Your whitelist application was not approved'
    }
    if (!maxAllocation) {
      return 'Your wallet did not win to have access to the sale'
    }
    if (Number(nftAmountToBuy) > availableAllocation) {
      return 'The amount exceeds the remaining allocation for you wallet'
    }
    if (fundsToBeSpent.isGreaterThan(fundTokenBalance)) {
      return 'You have not enough balance to buy'
    }
    if (Number(nftAmountToBuy) > remainingNFTsInCurrentPhase) {
      return 'The amount exceeds the remaining amount of NFTs to be sold'
    }
    if (remainingNFTsInCurrentPhase === 0) {
      return 'Sold Out'
    }
  }, [
    isSaleInProgress,
    maxAllocation,
    nftAmountToBuy,
    availableAllocation,
    fundTokenBalance,
    fundsToBeSpent,
    remainingNFTsInCurrentPhase,
    isWhitelisted
  ])

  const handleBuy = useCallback(async () => {
    if (disableBuying) {
      return
    }
    await onBuy(nftAmountToBuy, {
      onHash: () => setNftToBuy('0')
    })
  }, [disableBuying, onBuy, nftAmountToBuy])

  return (
    <div className={'mt-md-2 pt-3 bid-form-wrapper'}>
      {!!maxAllocation && (
        <p className={'text-center'}>
          You have bought <b className={'purple-text'}>{nftBalance} NFTs</b>{' '}
          from <b className={'purple-text'}>{maxAllocation}</b> allowed.
        </p>
      )}
      <Row className={'align-items-center mb-md-3 mb-2'}>
        <Col md={6}>
          <div className={'price'}>
            <div className={'grey-text price__description'}>
              Maximum allowed
            </div>
            <div className={'price__value'}>
              <b>{availableAllocation} NFT's</b>
            </div>
          </div>
        </Col>

        <Col md={6}>
          <form noValidate className="bid-form mt-md-0 mt-3">
            <InputGroup>
              <FormControl
                placeholder="0"
                type="number"
                inputMode="numeric"
                value={nftAmountToBuy}
                onChange={(e) => setNftToBuy(e.currentTarget.value)}
                min={0}
                isInvalid={disableBuying}
                isValid={!disableBuying}
              />

              <InputGroup.Append>
                <SiteButton size="small" color="RED" onClick={setMaxToBuy}>
                  MAX
                </SiteButton>
              </InputGroup.Append>
            </InputGroup>
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
          onClick={() => onApprove(fundsToBeSpent.toString())}
        >
          Approve
        </SiteButton>
        <SiteButton size="large" disabled={disableBuying} onClick={handleBuy}>
          Buy
        </SiteButton>
      </div>
      <ApprovalSteps fillingCondition={disableApproval} />
    </div>
  )
}
