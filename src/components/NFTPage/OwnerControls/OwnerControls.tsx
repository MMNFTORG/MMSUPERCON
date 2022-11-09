import React, { useEffect, useMemo, useState } from 'react'
import { generatePath } from 'react-router-dom'
import { useApproval, useDecimals } from '@firestarter-private/firestarter-library'
import BigNumber from 'bignumber.js'

import {
  ApprovalSteps,
  CreateAuctionModal,
  NormalizedCollectionInfo,
  RoundButton,
  SaleStatuses
} from '@/components'
import { RoutesPaths } from '@/router/constants'

import { ICreateAuctionArgs } from '@api/assetSale'

import { NFT_AUCTION_ADDRESS } from '@contracts/address'
import {
  CreateAuctionRequest,
  useNftAuction
} from '@contracts/hooks/useNftAuction'

import useAuction from '@hooks/useAuction'

import { ReactComponent as InfoIcon } from '@assets/info-icon.svg'

interface IOwnerControlsProps {
  collection: NormalizedCollectionInfo
  asset_id: string
}

export const OwnerControls = ({
  collection,
  asset_id
}: IOwnerControlsProps) => {
  const [show, setShow] = useState<boolean>(false)
  const [successShow, setSuccessShow] = useState<boolean>(false)
  const { getAuction, currentAuction, approved, checkApproved } = useNftAuction(
    collection.presale.reward_token.address
  )

  const { createAuction } = useAuction(
    collection.presale.reward_token.address,
    collection.presale.fund_token.address
  )

  const { onApprove } = useApproval(
    collection.presale.reward_token.address,
    NFT_AUCTION_ADDRESS
  )

  const decimals = useDecimals(collection.presale.fund_token.address)

  useEffect(() => {
    if (collection?.presale?.reward_token.address) {
      getAuction(
        new BigNumber(asset_id),
        collection?.presale?.reward_token.address
      )
    }
  }, [asset_id, collection])

  useEffect(() => {
    checkApproved(asset_id)
  }, [asset_id, currentAuction])

  const auctionExist = useMemo(
    () =>
      !!currentAuction &&
      !new BigNumber(currentAuction?.contractData?.owner || 0).isZero(),
    [currentAuction]
  )

  const disableApproval = useMemo(() => {
    return approved || auctionExist
  }, [approved])

  const disableCreateAuction = useMemo(() => {
    return !approved || auctionExist
  }, [approved, currentAuction])

  const handleApprove = async () => {
    await onApprove(asset_id, {
      onSuccess: () => {
        checkApproved(asset_id)
      }
    })
  }

  const onCreate = async (auctionInput: any) => {
    if (collection) {
      const input: CreateAuctionRequest = {
        tokenAddress: collection?.presale.reward_token.address,
        tokenId: new BigNumber(asset_id),
        reservePrice: new BigNumber(auctionInput.reservePrice),
        startTime: +new Date(auctionInput.startTime),
        endTime: +new Date(auctionInput.endTime),
        bidIncrement: new BigNumber(auctionInput.bidIncrement),
        bidToken: collection.presale.fund_token.address
      }
      const auctionBEInput: Omit<ICreateAuctionArgs, 'wallet_address'> = {
        asset_id,
        collection_id: collection.id,
        name: auctionInput.name,
        sale_details: {
          starts_at: auctionInput.startTime,
          end_at: auctionInput.endTime,
          starting_bid: auctionInput.reservePrice
        }
      }

      await createAuction(input, auctionBEInput, {
        onSuccess: () => {
          setSuccessShow(true)
          getAuction(
            new BigNumber(asset_id),
            collection?.presale?.reward_token.address
          )
        },
        onError: () => {
          setSuccessShow(false)
        }
      })
    }
  }

  return (
    <>
      {!successShow ? (
        <>
          <div className="d-flex gap-2">
            <RoundButton
              size="large"
              disabled={disableApproval}
              onClick={handleApprove}
            >
              Approve
            </RoundButton>
            <RoundButton
              onClick={() => setShow(true)}
              disabled={disableCreateAuction}
              size={'large'}
            >
              Create Auction
            </RoundButton>
          </div>
          <ApprovalSteps fillingCondition={disableApproval} />
        </>
      ) : (
        <div className={'d-flex flex-column gap-2'}>
          <div className="form-message form-message--info text-center mt-3 mb-3">
            <InfoIcon />
            <span>Auction successfully created!</span>
          </div>
          <RoundButton
            to={generatePath(RoutesPaths.ASSET_AUCTION, {
              asset_id,
              collection_id: collection.id
            })}
          >
            To auction
          </RoundButton>
        </div>
      )}
      <CreateAuctionModal
        onCreate={onCreate}
        show={show}
        setShow={setShow}
        decimals={decimals}
        fundToken={collection.presale.fund_token}
      />
    </>
  )
}
