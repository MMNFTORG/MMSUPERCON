import React, { useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import { useNetwork } from '@firestarter-private/firestarter-library'

import {
  CollectionBanner,
  LoadingWrap,
  MyCollectionNftListBlock,
  WrongNetworkBlock
} from '@components/index'

import { useCollectionsState } from '@hooks/useCollections'

import NFTImage from '@assets/NFT/collection-nft.png'

import './MyCollection.css'

const COLLECTION_ID = process.env.REACT_APP_NFT_COLLECTION_ID || ''

export const MyCollection = () => {
  const { isDefaultNetworkSelected } = useNetwork()
  const {
    currentCollection: collection,
    getCollectionById,
    loading
  } = useCollectionsState()

  useEffect(() => {
    getCollectionById(COLLECTION_ID)
  }, [])

  const bannerSlides = [
    {
      id: '1',
      image: NFTImage
    },
    {
      id: '2',
      image: NFTImage
    }
  ]

  return (
    <div className="nfts-page page my-collection-page">
      <CollectionBanner
        bannerSlides={bannerSlides}
        title={'My collection'}
        artistAvatar={collection?.artist?.image}
      />
      <section className={'nft-list-section pt-5'}>
        <Container>
          {isDefaultNetworkSelected ? (
            <LoadingWrap loading={loading}>
              {collection && (
                <MyCollectionNftListBlock collection={collection} />
              )}
            </LoadingWrap>
          ) : (
            <WrongNetworkBlock type={'NFT list'} />
          )}
        </Container>
      </section>
    </div>
  )
}

export default MyCollection
