import React, { useEffect, useMemo } from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import { generatePath, Link, useParams } from 'react-router-dom'
import { useNetwork } from '@firestarter-private/firestarter-library'
import { RoutesPaths } from '@router/constants'

import { useNftAuction } from '@/contracts/hooks/useNftAuction'
import { NFT_AUCTION_COLLECTION, NFT_AUCTION_CONTRACT_DATA } from '@/mocks/NFT'

import {
  AccountCheckWrapper,
  AuctionSaleStatusesProps,
  AuctionSaleStatusProps,
  BackLink,
  CollectedBy,
  Collectors,
  ICollectorEntity,
  IProvenanceEntity,
  LoadingWrap,
  MediaAsset,
  NftAuctionStats,
  Provenance,
  RoundButton,
  SaleType,
  ShareWithBlock,
  SiteButton,
  StatusBadge,
  TimerWrap,
  WrongNetworkBlock
} from '@components/index'

import { useNFT } from '@contracts/hooks/NFT/useNFT'

import useAuction from '@hooks/useAuction'
import { useCollectionsState } from '@hooks/useCollections'
import { useMediaDimensions } from '@hooks/useMediaDimensions'

import { ReactComponent as LinkArrow } from '@assets/link-arrow.svg'
import ProjectIco from '@assets/NFT/project-ico.png'

import './NFTAuctionPage.css'

interface ParamTypes {
  collection_id: string
  asset_id: string
}

export const NFTAuctionPage = () => {
  const { asset_id, collection_id } = useParams<ParamTypes>()
  const { lg } = useMediaDimensions()

  const { isDefaultNetworkSelected } = useNetwork()
  const {
    currentCollection: collection,
    getCollectionById,
    loading: collectionLoading
  } = useCollectionsState()

  const { getNFTTokenById, currentNFT, loadingCurrent } = useNFT(
    collection?.presale?.reward_token?.address || ''
  )

  const {
    currentAuction: { contractData = null, backendData = null },
    loading: auctionLoading,
    isOwner
  } = useNftAuction(collection?.presale?.reward_token?.address)

  const { getAuction } = useAuction(collection?.presale?.reward_token?.address)

  useEffect(() => {
    if (collection?.id !== collection_id || !collection) {
      getCollectionById(collection_id)
    }
  }, [collection_id])

  useEffect(() => {
    if (collection && collection?.presale?.reward_token?.address) {
      getAuction(asset_id, collection.id)
    }
  }, [asset_id, collection])

  useEffect(() => {
    if (currentNFT?.id !== asset_id || !currentNFT) {
      getNFTTokenById(asset_id)
    }
  }, [asset_id, currentNFT, collection])

  const loading = loadingCurrent || auctionLoading || collectionLoading

  const isAuctionFinished =
    backendData &&
    (backendData.sale_details.statusMessage ===
      AuctionSaleStatusesProps['Auction Closed'] ||
      backendData.sale_details.statusMessage ===
        AuctionSaleStatusesProps['Closed'])

  const isAuctionStarted =
    backendData &&
    backendData.sale_details.statusMessage !==
      AuctionSaleStatusesProps['Coming Soon']

  const NFTHeading = () => {
    return (
      <div className="nft-token__heading">
        <div className="nft-token__collection">
          <Image
            src={collection?.assets?.logo_image_url || ProjectIco}
            roundedCircle={true}
          />
          <div className="nft-token__collection-name">
            <Link
              to={generatePath(RoutesPaths.COLLECTION_DETAILS, {
                collection_id: collection?.id
              })}
              className={'text-decoration-none'}
            >
              {collection?.name}
            </Link>
          </div>
        </div>

        <div className="nft-token__heading-text d-flex justify-content-md-between align-items-start align-items-md-center flex-column flex-md-row">
          <h2 className="title">
            {backendData?.name} #{asset_id}
          </h2>
          <StatusBadge
            value={
              backendData?.sale_details?.statusMessage ||
              AuctionSaleStatusesProps['Coming Soon']
            }
          />
        </div>
      </div>
    )
  }

  return (
    <main className="nft-auction-page page">
      <LoadingWrap loading={loading}>
        {collection && (
          <>
            <Container>
              <BackLink
                to={generatePath(RoutesPaths.NFT_ASSET, {
                  collection_id: collection.id,
                  asset_id
                })}
              >
                NFT asset
              </BackLink>
            </Container>
            <LoadingWrap loading={loading}>
              {contractData && backendData ? (
                <>
                  <section className="nft-token-section">
                    <Container>
                      <Row className="g-5 ntf-auction">
                        <>
                          {!lg && <NFTHeading />}
                          <Col lg={{ span: 6 }}>
                            <div className="nft-token-asset-box">
                              <MediaAsset
                                className="nft-token-asset"
                                src={currentNFT?.image || ''}
                              />
                            </div>
                          </Col>
                          <Col lg={{ span: 6 }}>
                            <div className="nft-token-content">
                              {lg && <NFTHeading />}

                              <AccountCheckWrapper>
                                {isDefaultNetworkSelected ? (
                                  backendData.sale_details.statusMessage !==
                                    AuctionSaleStatusesProps['Closed'] && (
                                    <NftAuctionStats
                                      status={
                                        backendData.sale_details
                                          .statusMessage as AuctionSaleStatusProps
                                      }
                                      currentBid={contractData.currentBid}
                                      bidToken={contractData.bidToken}
                                      startTime={
                                        backendData.sale_details.starts_at ||
                                        new Date()
                                      }
                                      endTime={
                                        backendData.sale_details.end_at ||
                                        new Date()
                                      }
                                      bidIncrement={contractData.bidIncrement}
                                      reservePrice={contractData.reservePrice}
                                      canBid={contractData.canBid}
                                      tokenId={contractData.tokenId}
                                      currentBidder={contractData.currentBidder}
                                      collection={collection}
                                      fundTokenName={
                                        collection.presale.fund_token.name
                                      }
                                      isOwner={isOwner}
                                    />
                                  )
                                ) : (
                                  <WrongNetworkBlock type={'Auction'} />
                                )}
                              </AccountCheckWrapper>

                              {backendData.sale_details.statusMessage ===
                                AuctionSaleStatusesProps['Auction Opened'] && (
                                <TimerWrap
                                  dueDate={
                                    new Date(
                                      backendData.sale_details.end_at || 0
                                    )
                                  }
                                />
                              )}

                              {(backendData.sale_details.statusMessage ===
                                AuctionSaleStatusesProps['Auction Closed'] ||
                                backendData.sale_details.statusMessage ===
                                  AuctionSaleStatusesProps['Closed']) && (
                                <CollectedBy account={contractData.owner} />
                              )}
                            </div>

                            <div className="nft-token__description">
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: collection?.info?.description ?? ''
                                }}
                              ></p>
                            </div>

                            <div className="mt-5 d-flex justify-content-md-start justify-content-center">
                              <SiteButton
                                href={`${collection.opensea_link}/${asset_id}`}
                                size={'large'}
                                color={'LIGHT'}
                                bordered
                              >
                                View on Opensea
                                <LinkArrow />
                              </SiteButton>
                            </div>

                            <div className="nft-token__social-share">
                              <ShareWithBlock
                                text={`NFT from ${collection.name}`}
                              />
                            </div>
                          </Col>
                        </>
                      </Row>
                    </Container>
                  </section>

                  {isAuctionFinished && NFT_AUCTION_CONTRACT_DATA.collectors && (
                    <section className={'mt-5'}>
                      <Container>
                        <Collectors
                          collectors={
                            NFT_AUCTION_CONTRACT_DATA.collectors as ICollectorEntity[]
                          }
                          provenanceEntities={
                            NFT_AUCTION_CONTRACT_DATA.provenance as IProvenanceEntity[]
                          }
                        />
                      </Container>
                    </section>
                  )}

                  {isAuctionStarted && !isAuctionFinished && (
                    <section className={'mt-5'}>
                      <Container>
                        <Provenance
                          provenanceEntities={
                            NFT_AUCTION_CONTRACT_DATA.provenance as IProvenanceEntity[]
                          }
                        />
                      </Container>
                    </section>
                  )}
                </>
              ) : (
                <Container>
                  <h1 className={'title'}>Auction for this NFT not found</h1>
                </Container>
              )}
            </LoadingWrap>
          </>
        )}
      </LoadingWrap>
    </main>
  )
}

export default NFTAuctionPage
