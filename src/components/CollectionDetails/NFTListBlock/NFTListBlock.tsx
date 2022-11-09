import React, { useEffect, useMemo, useState } from 'react'
import { useNetwork } from '@firestarter-private/firestarter-library'
import { useWeb3React } from '@web3-react/core'

import {
  EmptyNftListTile,
  LoadingWrap,
  NftList,
  RoundButton,
  SiteButton
} from '@components/index'

import { useNFT } from '@contracts/hooks/NFT/useNFT'

import { NormalizedCollectionInfo } from '../../CollectionPresale'

interface INFTListBlockProps {
  collection: NormalizedCollectionInfo
}

export const NFTListBlock = ({ collection }: INFTListBlockProps) => {
  const { isDefaultNetworkSelected } = useNetwork()
  const { account } = useWeb3React()

  const {
    NFTTokens,
    getNFTTokens,
    loading: nftLoading,
    totalNFTAmount
  } = useNFT(collection?.presale?.reward_token?.address || '')

  useEffect(() => {
    if (
      collection?.presale?.reward_token?.address &&
      isDefaultNetworkSelected
    ) {
      getNFTTokens()
    }
  }, [collection, isDefaultNetworkSelected, totalNFTAmount, account])

  const isFirstLoad = useMemo(() => !NFTTokens?.length, [NFTTokens])

  return (
    <LoadingWrap loading={nftLoading && isFirstLoad}>
      {collection && NFTTokens && NFTTokens?.length ? (
        <>
          <NftList NFTArray={NFTTokens} collection={collection} />

          <LoadingWrap loading={nftLoading && !isFirstLoad}>
            {totalNFTAmount > NFTTokens.length && (
              <div className={'d-flex mt-4 justify-content-center'}>
                <SiteButton
                  size={'large'}
                  bordered
                  color={'LIGHT'}
                  onClick={getNFTTokens}
                >
                  Show more
                </SiteButton>
              </div>
            )}
          </LoadingWrap>
        </>
      ) : (
        <EmptyNftListTile />
      )}
    </LoadingWrap>
  )
}
