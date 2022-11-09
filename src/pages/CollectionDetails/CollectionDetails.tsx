import React, { useEffect, useMemo } from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import { generatePath, useParams } from 'react-router-dom'
import { useNetwork } from '@firestarter-private/firestarter-library'
import { RoutesPaths } from '@router/constants'

import { ISocialLink } from '@/constants'

import { NFTListBlock, WhitelistBlock } from '@components/CollectionDetails'
import {
  AccountCheckWrapper,
  BackLink,
  CollectionBanner,
  CollectionStats,
  CollectionStatusesProps,
  CollectionStatusProp,
  LoadingWrap,
  RecentSalesSection,
  ShareWithBlock,
  SiteButton,
  SocialLinks,
  StatusBadge,
  TimerWrap,
  WrongNetworkBlock
} from '@components/index'

import { WhitelistStatus } from '@api/whitelist/types'

import { useWhitelist } from '@contracts/hooks/useWhitelist'

import { useCollectionsState } from '@hooks/useCollections'
import { useMediaDimensions } from '@hooks/useMediaDimensions'

import CollectionIcon from '@assets/collection/collection-image.png'
import { ReactComponent as LinkArrow } from '@assets/link-arrow.svg'
import NFTImage from '@assets/NFT/nft-card-1.png'

import './CollectionDetails.scss'

interface IParams {
  collection_id: string
}

export const CollectionDetails = () => {
  const { collection_id } = useParams<IParams>()
  const { isDefaultNetworkSelected } = useNetwork()
  const { lg } = useMediaDimensions()
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

  const {
    currentCollection: collection,
    getCollectionById,
    loading
  } = useCollectionsState()

  const { checkIfSelected } = useNetwork()

  const {
    whitelistStatus,
    allocation,
    remainingAllocation,
    isWhitelisted,
    merkleProof,
    loading: whitelistLoading
  } = useWhitelist(
    ...(collection?.id === collection_id
      ? [collection?.project_id, collection?.id]
      : [])
  )

  useEffect(() => {
    if (collection?.id.toString() !== collection_id || !collection) {
      getCollectionById(collection_id)
    }
  }, [collection_id, collection])

  const statusMessage: CollectionStatusProp =
    collection?.presale.statusMessage || CollectionStatusesProps['Coming Soon']
  const isPrivatePresaleInProgress =
    statusMessage === CollectionStatusesProps['Private Live']
  const isPublicPresaleInProgress =
    statusMessage === CollectionStatusesProps['Live']
  const isWhitelistingInProgress =
    statusMessage === CollectionStatusesProps['Registration Open']
  const isPresaleInProgress =
    isPublicPresaleInProgress || isPrivatePresaleInProgress
  const isCollectionNetworkSelected = collection
    ? checkIfSelected(collection.chainId)
    : false
  const isWhitelistTime =
    statusMessage === CollectionStatusesProps['Registration Open'] ||
    statusMessage === CollectionStatusesProps['Registration Closed']

  const CollectionHeading = () => (
    <div className="collection__head d-flex align-items-center mb-5">
      <div className="collection__icon">
        <Image
          src={collection!.assets.logo_image_url || CollectionIcon}
          roundedCircle
        />
      </div>
      <div className="collection__head-content">
        <h1 className="collection__name">{collection!.artist.name}</h1>
        <span>
          <StatusBadge value={collection!.presale.statusMessage} />
        </span>
      </div>
    </div>
  )

  return (
    <main className={'page collection-page'}>
      <LoadingWrap loading={loading || !collection}>
        {!!collection &&
          (isPresaleInProgress || isWhitelistingInProgress ? (
            <div className={'pt-5'}>
              <Container>
                <BackLink to={generatePath(RoutesPaths.COLLECTIONS)}>
                  Collections
                </BackLink>
              </Container>
              <section>
                <Container className={'collection'}>
                  <Row>
                    <Col lg={6}>
                      {!lg && <CollectionHeading />}
                      <div className="collection__image">
                        <Image src={collection.assets.nft_image_url} />
                      </div>

                      <AccountCheckWrapper>
                        {isCollectionNetworkSelected ? (
                          isWhitelistTime && (
                            <WhitelistBlock
                              collection={collection}
                              statusMessage={statusMessage}
                              whitelistLoading={whitelistLoading}
                              whitelistStatus={
                                whitelistStatus as WhitelistStatus
                              }
                            />
                          )
                        ) : (
                          <div className={'mt-5'}>
                            <WrongNetworkBlock type={'Whitelist'} />
                          </div>
                        )}
                      </AccountCheckWrapper>
                    </Col>

                    <Col lg={6} className={'mt-4 mt-lg-0'}>
                      {lg && <CollectionHeading />}
                      {isDefaultNetworkSelected && (
                        <CollectionStats
                          collection={collection}
                          isSaleInProgress={isPresaleInProgress}
                          whitelistStatus={whitelistStatus as WhitelistStatus}
                          allocation={allocation}
                          isWhitelisted={isWhitelisted}
                          remainingAllocation={remainingAllocation}
                          merkleProof={merkleProof}
                        />
                      )}

                      {isPresaleInProgress &&
                        collection.presale.public_end_at && (
                          <TimerWrap
                            dueDate={collection.presale.public_end_at}
                            title={'Presale ending'}
                          />
                        )}

                      {isWhitelistingInProgress &&
                        collection.whitelisting.end_at && (
                          <TimerWrap
                            dueDate={collection.whitelisting.end_at}
                            title={'Whitelisting ending'}
                          />
                        )}

                      <div className="collection__body mt-4 mb-4">
                        <p
                          dangerouslySetInnerHTML={{
                            __html: collection.info.description
                          }}
                        />
                        {collection?.info.bio?.text && (
                          <p
                            dangerouslySetInnerHTML={{
                              __html: collection.info.bio?.text
                            }}
                          />
                        )}
                      </div>

                      <div className="mt-5 d-flex justify-content-md-start justify-content-center">
                        <SiteButton
                          href={`${collection.opensea_link}`}
                          size={'large'}
                          color={'GREY'}
                        >
                          View on Opensea
                          <LinkArrow />
                        </SiteButton>
                      </div>

                      <div className="nft-token__social-share">
                        <ShareWithBlock text={`NFT from ${collection.name}`} />
                      </div>
                    </Col>
                  </Row>
                </Container>
              </section>

              <RecentSalesSection />
            </div>
          ) : (
            <AccountCheckWrapper>
              {isDefaultNetworkSelected ? (
                <div className={'page nfts-page pb-5'}>
                  <CollectionBanner
                    bannerSlides={bannerSlides}
                    // eslint-disable-next-line
                    title={collection.name}
                  />

                  <Container className={'pt-5'}>
                    <NFTListBlock collection={collection} />
                  </Container>
                </div>
              ) : (
                <WrongNetworkBlock type={'NFT list'} />
              )}
            </AccountCheckWrapper>
          ))}
      </LoadingWrap>
    </main>
  )
}

export default CollectionDetails
