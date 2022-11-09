import React, { useMemo } from 'react'
import { ProgressBar } from 'react-bootstrap'
import { useApproval, useDecimals, useTokenBalance } from '@firestarter-private/firestarter-library'
import BigNumber from 'bignumber.js'
import { differenceInSeconds } from 'date-fns'

import { NormalizedCollectionInfo } from '@/components'

import { AuctionOwnerControls } from '@components/NFTAuction/AuctionOwnerControls'

import { NFT_AUCTION_ADDRESS, WalletAddress } from '@contracts/address'
import { useNftAuction } from '@contracts/hooks/useNftAuction'

import useAuction from '@hooks/useAuction'
import { useGetTokenPrice } from '@hooks/useGetTokenPrice'
import { useMediaDimensions } from '@hooks/useMediaDimensions'

import { balanceToNumber, formatUSD } from '@utils/currency'

import { BidForm } from '../BidForm'
import { TimePeriod } from '../TimePeriod'
import { AuctionSaleStatusesProps, AuctionSaleStatusProps } from '../types'

import './NFTAuctionStats.css'

interface INFTAuctionStatsProps {
  bidIncrement: BigNumber
  reservePrice: BigNumber
  status: AuctionSaleStatusProps
  currentBid: BigNumber
  bidToken: string
  startTime: Date
  endTime: Date
  currentBidder: WalletAddress
  canBid: boolean
  tokenId: BigNumber
  fundTokenName: string
  collection: NormalizedCollectionInfo
  isOwner: boolean
}

export const NftAuctionStats = ({
  status,
  currentBid,
  bidToken,
  startTime,
  endTime,
  bidIncrement,
  reservePrice,
  canBid,
  currentBidder,
  tokenId,
  fundTokenName,
  collection,
  isOwner
}: INFTAuctionStatsProps) => {
  const { md } = useMediaDimensions()
  const [tokenPrice, calculateAmountInUsd] = useGetTokenPrice(fundTokenName)
  const { placeBid } = useNftAuction(collection.presale.reward_token.address)

  const { cancelAuction, withdrawAuction, resetAuction } = useAuction(
    collection.presale.reward_token.address,
    collection.presale.fund_token.address
  )

  const fundTokenDecimals = useDecimals(collection.presale.fund_token.address)

  const fundTokenBalance = useTokenBalance(
    collection.presale.fund_token.address
  )
  const usdAmount: string = useMemo(
    () =>
      formatUSD(
        calculateAmountInUsd(balanceToNumber(currentBid, fundTokenDecimals))
      ),
    [currentBid, tokenPrice]
  )

  const { allowance, onApprove } = useApproval(
    collection.presale.fund_token.address,
    NFT_AUCTION_ADDRESS
  )

  const priceBadges = {
    [AuctionSaleStatusesProps['Auction Opened']]: 'Current Bid',
    [AuctionSaleStatusesProps['Auction Closed']]: 'Sold for',
    [AuctionSaleStatusesProps['Closed']]: 'Sold for',
    [AuctionSaleStatusesProps['Coming Soon']]: 'Coming soon'
  }
  const statusText = {
    [AuctionSaleStatusesProps['Auction Opened']]: 'In process',
    [AuctionSaleStatusesProps['Auction Closed']]: 'Closed',
    [AuctionSaleStatusesProps['Closed']]: 'Closed',
    [AuctionSaleStatusesProps['Coming Soon']]: 'Coming soon'
  }

  const progress = useMemo(
    () =>
      (differenceInSeconds(+new Date(), +new Date(startTime)) /
        differenceInSeconds(+new Date(endTime), +new Date(startTime))) *
      100,
    [endTime, startTime]
  )

  const minAllowed = useMemo(
    () => balanceToNumber(currentBid.plus(bidIncrement), fundTokenDecimals),
    [bidIncrement, currentBid, reservePrice]
  )

  const StatsPrice = () => (
    <div className="ntf-auction-stats__last-price price">
      <span className="grey-text price__description">
        {priceBadges[status]}
      </span>

      <div className="price__value">
        <b>
          {balanceToNumber(currentBid, fundTokenDecimals)} {fundTokenName}
        </b>{' '}
        ({usdAmount})
      </div>
    </div>
  )

  return (
    <div className="ntf-auction-stats tile mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="ntf-auction-stats__status">{statusText[status]}</div>

        {md && <StatsPrice />}
      </div>
      <div className="ntf-auction-stats__progress">
        <ProgressBar now={progress} />
        {!md && <StatsPrice />}
        {status === AuctionSaleStatusesProps['Auction Opened'] ? (
          !isOwner && (
            <BidForm
              minAllowed={minAllowed}
              currentBid={currentBid}
              bidToken={bidToken}
              reservePrice={reservePrice}
              canBid={canBid}
              placeBid={placeBid}
              tokenId={tokenId}
              fundTokenName={fundTokenName}
              fundTokenAllowance={allowance}
              currentBidder={currentBidder}
              tokenAddress={collection?.presale.reward_token.address}
              onApprove={onApprove}
              fundTokenDecimals={fundTokenDecimals}
              fundTokenBalance={fundTokenBalance}
            />
          )
        ) : (
          <TimePeriod opened={new Date(startTime)} closed={new Date(endTime)} />
        )}
        {isOwner && (
          <AuctionOwnerControls
            statusMessage={status}
            collection_id={collection.id}
            tokenId={tokenId}
            tokenAddress={collection?.presale.reward_token.address}
            cancelAuction={cancelAuction}
            withdrawAuction={withdrawAuction}
            resetAuction={resetAuction}
            currentBid={currentBid}
            bidIncrement={bidIncrement}
            currentBidder={currentBidder}
            decimals={fundTokenDecimals}
            fundToken={collection.presale.fund_token}
          />
        )}
      </div>
    </div>
  )
}
