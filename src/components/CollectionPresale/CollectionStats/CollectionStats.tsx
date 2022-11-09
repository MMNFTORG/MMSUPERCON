import React, { useCallback, useMemo, useState } from 'react'
import { ProgressBar, Tab, Tabs } from 'react-bootstrap'
import { useApproval } from '@firestarter-private/firestarter-library'
import { useWeb3React } from '@web3-react/core'

import { PhasesList } from '@components/CollectionPresale/PhasesList'

import { WhitelistStatus } from '@api/whitelist/types'

import { useNftSale } from '@contracts/hooks/useNftSale'
import { useNftWhitelist } from '@contracts/hooks/useNftWhitelist'
import { NotifyTxCallbacks } from '@contracts/notify'

import { useGetTokenPrice } from '@hooks/useGetTokenPrice'
import { useMediaDimensions } from '@hooks/useMediaDimensions'
import { useSelector } from '@hooks/useSelector'

import { balanceToCurrency, balanceToNumber, formatUSD } from '@utils/currency'

import { LoadingWrap } from '../../common'
import { PresaleBidForm } from '../PresaleBidForm'
import {
  CollectionStatusesProps,
  IWhitelistPhase,
  NormalizedCollectionInfo,
  WhitelistType
} from '../types'

import './CollectionStats.scss'

interface ICollectionStatsProps {
  collection: NormalizedCollectionInfo
  isSaleInProgress: boolean
  whitelistStatus: WhitelistStatus
  allocation: number
  isWhitelisted: boolean
  remainingAllocation: number
  merkleProof?: string[]
}

export const CollectionStats = ({
  collection,
  isSaleInProgress,
  allocation,
  remainingAllocation,
  isWhitelisted,
  whitelistStatus,
  merkleProof
}: ICollectionStatsProps) => {
  const { account } = useWeb3React()
  const [key, setKey] = useState<string | null>('currentPhase')
  const [isPhaseProcessView, setIsPhaseProcessView] = useState<boolean>(true)
  const currentPhase = useSelector<IWhitelistPhase>(
    (state) => state.currentCollection?.presale?.currentPhase
  )

  const { allowance, onApprove } = useApproval(
    collection.presale.fund_token.address,
    collection.presale.presale_contract_address
  )

  const { nftTokenId } = useNftWhitelist(
    currentPhase?.whitelist_type === WhitelistType.NFT
      ? currentPhase.whitelist_address
      : undefined
  )

  const {
    fundTokenBalance,
    fundTokenDecimals,
    soldAmountPerCurrentPhase,
    totalSold,
    resetStats,
    nftBalance,
    buyPublic,
    buyMerkle,
    buyBook,
    buyNft
  } = useNftSale(
    collection.presale.fund_token.address,
    collection.presale.presale_contract_address
  )

  const handleBuy = useCallback(
    async (amount: string, callbacks: NotifyTxCallbacks = {}) => {
      callbacks = {
        ...callbacks,
        onSuccess: () => {
          resetStats()
        }
      }
      if (!account || !currentPhase) return
      if (currentPhase.whitelist_type === WhitelistType.BOOK) {
        await buyBook(currentPhase.phase_id, amount, callbacks)
      } else if (currentPhase.whitelist_type === WhitelistType.MERKLE) {
        if (!merkleProof) return
        await buyMerkle(
          currentPhase.phase_id,
          amount,
          String(allocation),
          merkleProof,
          callbacks
        )
      } else if (currentPhase.whitelist_type === WhitelistType.NFT) {
        nftTokenId &&
          (await buyNft(currentPhase.phase_id, nftTokenId, amount, callbacks))
      } else {
        await buyPublic(currentPhase.phase_id, amount, callbacks)
      }
      setKey('currentPhase')
    },
    [account, currentPhase, merkleProof, allocation, buyMerkle, buyPublic]
  )

  const soldForAmount = useMemo(() => {
    if (!currentPhase) return 0
    return balanceToNumber(
      currentPhase.price.multipliedBy(totalSold),
      fundTokenDecimals
    )
  }, [currentPhase, fundTokenDecimals])

  const [tokenPrice, calculateAmountInUsd] = useGetTokenPrice(
    collection.presale.fund_token.name
  )
  const tokenSymbol = collection.presale.fund_token.name
  const { md } = useMediaDimensions()
  const progress = useMemo(() => {
    if (!currentPhase) return 0
    if (isPhaseProcessView) {
      return (soldAmountPerCurrentPhase * 100) / currentPhase.max_nft_buy_limit
    }
    return (totalSold * 100) / collection.max_nft_amount
  }, [
    currentPhase,
    isPhaseProcessView,
    totalSold,
    collection.max_nft_amount,
    soldAmountPerCurrentPhase
  ])
  const usdAmount: string = useMemo(
    () => formatUSD(calculateAmountInUsd(soldForAmount)),
    [soldForAmount, tokenPrice]
  )

  const StatsPrice = () => (
    <div className="collection-stats__last-price price">
      <span className="grey-text price__description">Sold for</span>

      <div className="price__value">
        <b>
          {soldForAmount} {tokenSymbol}
        </b>{' '}
        ({usdAmount})
      </div>
    </div>
  )

  return (
    <div className="collection-stats tile mb-5">
      <span className="phase-title grey-text">Current phase</span>
      <Tabs
        id="controlled-tab"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3 form-tabs"
      >
        <Tab
          eventKey="currentPhase"
          title={`${collection.presale.currentPhase?.name || 'Whitelist'} Open`}
        >
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="collection-stats__status">
              {collection.presale.statusMessage}
            </div>

            {md &&
              collection.presale.statusMessage ===
                CollectionStatusesProps.Closed && <StatsPrice />}
          </div>
          <div className="collection-stats__progress">
            {' '}
            <div className="collection-stats__switcher">
              <button
                className={isPhaseProcessView ? 'active' : ''}
                onClick={() => setIsPhaseProcessView(true)}
              >
                {'Current phase'}
              </button>
              <button
                className={!isPhaseProcessView ? 'active' : ''}
                onClick={() => setIsPhaseProcessView(false)}
              >
                {'Total'}
              </button>
            </div>
            <ProgressBar now={progress} />
          </div>
          <div
            className={
              'd-flex align-items-md-center flex-column flex-md-row justify-content-md-between mt-2 pb-3 pb-md-0'
            }
          >
            <span className={'grey-text'}>NFT Sold</span>
            <b>
              {currentPhase
                ? isPhaseProcessView
                  ? soldAmountPerCurrentPhase
                  : totalSold
                : '--'}
              /
              {currentPhase
                ? isPhaseProcessView
                  ? currentPhase.max_nft_buy_limit
                  : collection.max_nft_amount
                : '--'}
            </b>
          </div>
          {!md &&
            collection.presale.statusMessage ===
              CollectionStatusesProps.Closed && <StatsPrice />}
          {collection.presale.statusMessage ===
            CollectionStatusesProps['Live'] && (
            <LoadingWrap loading={!currentPhase || !whitelistStatus}>
              {currentPhase && whitelistStatus && (
                <>
                  <div className="collections-stats__details mt-2 mt-md-3">
                    <div className="price d-flex align-items-center">
                      <div className="price__description grey-text me-2">
                        NFT Price:
                      </div>
                      <span className="price__value">
                        <b>
                          {balanceToCurrency(
                            currentPhase.price,
                            fundTokenDecimals
                          )}{' '}
                          {collection.presale.fund_token.name}
                        </b>
                      </span>
                    </div>
                  </div>
                  <PresaleBidForm
                    allocation={allocation}
                    remainingAllocation={remainingAllocation}
                    isWhitelisted={isWhitelisted}
                    fundTokenBalance={fundTokenBalance}
                    fundTokenAllowance={allowance}
                    onApprove={onApprove}
                    nftBalance={nftBalance}
                    totalSold={totalSold}
                    currentPhase={currentPhase}
                    globalCap={collection.max_nft_amount}
                    soldAmountPerCurrentPhase={soldAmountPerCurrentPhase}
                    onBuy={handleBuy}
                    whitelistStatus={whitelistStatus}
                    isSaleInProgress={isSaleInProgress}
                  />
                </>
              )}
            </LoadingWrap>
          )}
        </Tab>
        <Tab eventKey="allPhases" title="All Phases">
          <PhasesList phases={collection.presale.whitelisting_phases} />
        </Tab>
      </Tabs>
    </div>
  )
}
