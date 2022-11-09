import React, { useEffect, useMemo } from 'react'
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

export const MyCollectionNftListBlock = ({
  collection
}: INFTListBlockProps) => {
  const { account } = useWeb3React()
  const { isDefaultNetworkSelected } = useNetwork()

  const { userNFTTokens, getUserTokens, loading, totalUserNFTAmount } = useNFT(
    collection?.presale?.reward_token?.address || ''
  )

  useEffect(() => {
    if (
      account &&
      collection?.presale?.reward_token?.address &&
      isDefaultNetworkSelected
    ) {
      getUserTokens(account)
    }
  }, [account, collection, isDefaultNetworkSelected, totalUserNFTAmount])

  const isFirstLoad = !userNFTTokens?.length

  const memorizedNFTList = useMemo(
    () => <NftList NFTArray={userNFTTokens!} collection={collection} />,
    [userNFTTokens, collection]
  )

  return (
    <LoadingWrap loading={loading && isFirstLoad}>
      {userNFTTokens?.length ? (
        <>
          {memorizedNFTList}
          <LoadingWrap loading={loading && !isFirstLoad}>
            {totalUserNFTAmount > userNFTTokens.length && (
              <div className={'d-flex mt-4 justify-content-center mb-5'}>
                <SiteButton
                  bordered
                  color={'LIGHT'}
                  size={'large'}
                  onClick={() => getUserTokens(account)}
                >
                  Show more
                </SiteButton>
              </div>
            )}
          </LoadingWrap>
        </>
      ) : (
        <EmptyNftListTile text="Your NFT's will be placed there" />
      )}
    </LoadingWrap>
  )
}
