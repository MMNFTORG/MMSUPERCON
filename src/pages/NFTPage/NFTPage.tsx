import React, { useEffect } from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import { generatePath, Link, useParams } from 'react-router-dom'
import { RoutesPaths } from '@router/constants'
import { NFTMetadata } from '@store/types'

import {
  Accordion,
  BackLink,
  LoadingWrap,
  MediaAsset,
  NormalizedCollectionInfo,
  RecentSalesSection,
  ShareWithBlock,
  SiteButton
} from '@components/index'

import { useNFT } from '@contracts/hooks/NFT/useNFT'

import { useCollectionsState } from '@hooks/useCollections'
import { useMediaDimensions } from '@hooks/useMediaDimensions'

import { ReactComponent as LinkArrow } from '@assets/link-arrow.svg'
import NFTImage from '@assets/NFT/collection-nft.png'
import CollectionIco from '@assets/NFT/project-ico.png'

import './NFTPage.scss'

interface ParamTypes {
  collection_id: string
  asset_id: string
}

const nftTags = ['Sports', 'Gold', 'One one one', 'quotes']

const faqItems = [
  {
    // eslint-disable-next-line
    title: "What is The 7's Club?",
    body: (
      <span>
        The Known Gallery is a Los Angeles art gallery that showcases
        contemporary pieces from new and established artists from around the
        world. Owned and operated by the founding members of the L.A graffiti
        group The Seventh Letter, the gallery has strong ties to the west coast
        graffiti
      </span>
    )
  },
  {
    // eslint-disable-next-line
    title: "What is the NFT's utility?",
    body: (
      <span>
        The Known Gallery is a Los Angeles art gallery that showcases
        contemporary pieces from new and established artists from around the
        world. Owned and operated by the founding members of the L.A graffiti
        group The Seventh Letter, the gallery has strong ties to the west coast
        graffiti
      </span>
    )
  }
]

export const NFTPage = () => {
  const { asset_id, collection_id } = useParams<ParamTypes>()
  const { lg } = useMediaDimensions()

  const {
    currentCollection: collection,
    getCollectionById,
    loading
  } = useCollectionsState()

  const { getNFTTokenById, currentNFT, loadingCurrent, total, isOwner } =
    useNFT(collection?.presale?.reward_token?.address || '')

  useEffect(() => {
    if (collection?.id !== collection_id || !collection) {
      getCollectionById(collection_id)
    }
  }, [collection, collection_id])

  useEffect(() => {
    if (currentNFT?.id !== asset_id || !currentNFT) {
      getNFTTokenById(asset_id)
    }
  }, [asset_id, currentNFT, collection])

  const NFTHeading = ({
    collection,
    currentNFT
  }: {
    collection: NormalizedCollectionInfo
    currentNFT: NFTMetadata
  }) => {
    return (
      <div className="nft-token__heading">
        <div className="nft-token__collection">
          <div className="nft-token__collection-logo">
            <Image
              src={collection?.assets?.logo_image_url || CollectionIco}
              roundedCircle={true}
            />
          </div>
          <div className="nft-token__collection-name">
            <Link
              to={generatePath(RoutesPaths.COLLECTION_DETAILS, {
                collection_id: collection?.id
              })}
              className={'text-decoration-none'}
            >
              {collection?.artist?.name}
            </Link>
          </div>
        </div>

        <div className="nft-token__heading-text">
          <h2 className="title">
            {
              // eslint-disable-next-line
              currentNFT.id
            }
          </h2>

          <div className="nft-token__amount-stat">
            {currentNFT.id} / <span>{collection.max_nft_amount}</span>
          </div>
        </div>

        <div className="nft-token__tags tag-list">
          {nftTags.map((tag) => (
            <div className={'tag-list__item'} key={tag}>
              {tag}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="nft-token-page page">
      <Container>
        <BackLink to={generatePath(RoutesPaths.ACCOUNT.MY_COLLECTIONS)}>
          My Collection
        </BackLink>
      </Container>
      <section className="nft-token-section">
        <Container>
          <Row className="g-5">
            <LoadingWrap loading={loading || loadingCurrent}>
              {collection && currentNFT ? (
                <>
                  {!lg && (
                    <NFTHeading
                      collection={collection}
                      currentNFT={currentNFT}
                    />
                  )}
                  <Col lg={{ span: 6 }}>
                    <div className="nft-token-asset-box">
                      <MediaAsset
                        className="nft-token-asset"
                        src={currentNFT?.image || NFTImage}
                      />
                    </div>
                  </Col>
                  <Col lg={{ span: 6 }}>
                    <div className="nft-token-content">
                      {lg && (
                        <NFTHeading
                          collection={collection}
                          currentNFT={currentNFT}
                        />
                      )}

                      <div className="nft-token__description">
                        <p
                          dangerouslySetInnerHTML={{
                            __html: collection?.info?.description ?? ''
                          }}
                        ></p>
                      </div>

                      {/*<SocialLinks socialLinks={collection?.social_links} />*/}

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
                        <ShareWithBlock text={`NFT from ${collection.name}`} />
                      </div>

                      {/*<div className={'nft-token__faq'}>*/}
                      {/*  <h2 className="title mb-5">FAQ</h2>*/}
                      {/*  <Accordion items={faqItems} />*/}
                      {/*</div>*/}

                      {/*<div className="mt-5 justify-content-start flex-wrap d-flex">*/}
                      {/*  {isOwner && (*/}
                      {/*    <OwnerControls*/}
                      {/*      collection={collection}*/}
                      {/*      asset_id={asset_id}*/}
                      {/*    />*/}
                      {/*  )}*/}
                      {/*</div>*/}
                    </div>
                  </Col>
                </>
              ) : (
                <div>Something went wrong...</div>
              )}
            </LoadingWrap>
          </Row>
        </Container>

        <LoadingWrap loading={loading}>
          <div className={'mt-5'}>
            {collection && (
              <RecentSalesSection externalCollection={collection} />
            )}
          </div>
        </LoadingWrap>
      </section>
    </div>
  )
}

export default NFTPage
