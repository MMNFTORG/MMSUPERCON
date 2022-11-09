import React, { useEffect, useState } from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'

import { COLLECTION } from '@/mocks/collections'
import { MARKET_ITEMS } from '@/mocks/market'

import {
  CollectionBanner,
  DynamicImage,
  IMarketItem,
  MarketList,
  MarketSorting,
  Pagination,
  RoundButton,
  SaleType,
  SearchBar
} from '@components/index'
import { AsideFilters } from '@components/Market/AsideFilters'

import { normalizeStatus } from '@api/assetSale/mapping'

import { useMarket } from '@hooks/useMarket'
import { useMediaDimensions } from '@hooks/useMediaDimensions'

import ArtistAvatar from '@assets/Landing/buyer-avatar.png'
import NFTImage from '@assets/NFT/collection-nft.png'

import './Market.scss'

const FEED_STATS = {
  total_results: 1054
}

export const Market = () => {
  const [items, setItems] = useState<IMarketItem[]>([])
  const [sort, setSort] = useState<'asc' | 'desc'>('asc')
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false)
  const [filter, setFilter] = useState<string>('All')
  const { stats, statsLoading } = useMarket()

  const { lg } = useMediaDimensions()

  useEffect(() => {
    setItems(MARKET_ITEMS)
  }, [])

  useEffect(() => {
    const getPrice = (item: any) => {
      if ('tokenAmount' in item.sale_details) {
        return item.sale_details.tokenAmount
      } else {
        return item.sale_details.starting_bid
      }
    }
    if (sort === 'asc') {
      setItems((items) => [...items].sort((a, b) => getPrice(a) - getPrice(b)))
    }

    if (sort === 'desc') {
      setItems((items) => [...items].sort((a, b) => getPrice(b) - getPrice(a)))
    }
  }, [sort])

  useEffect(() => {
    if (filter === 'All') {
      setItems(MARKET_ITEMS)
    } else {
      const filteredArray = MARKET_ITEMS.filter((item) => {
        const statusMessage = normalizeStatus({
          saleType: item.sale_type as SaleType,
          status: item.sale_details.status,
          publicPresaleStart: item.sale_details.starts_at,
          publicPresaleEnd: item.sale_details.end_at,
          whitelistEnd: COLLECTION.whitelisting.starts_at,
          whitelistStart: COLLECTION.whitelisting.end_at
        })
        return statusMessage === filter
      })
      setItems(filteredArray)
    }
  }, [filter])

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
    <main className={'page market-page'}>
      <CollectionBanner
        bannerSlides={bannerSlides}
        title={'MILLIONAIRE MENTOR MARKETPLACE'}
        artistAvatar={ArtistAvatar}
      />
      <Container className={'market-page__wrapper'}>
        <Row>
          <Col lg={3} className={'market-page__aside'}>
            <div className={'market-page__aside-wrapper'}>
              <SearchBar />
              {!lg && (
                <button
                  className={'filter-menu-button'}
                  onClick={() => setShowFilterModal(true)}
                >
                  <DynamicImage path={'filter-ico.svg'} />
                </button>
              )}
            </div>
            {stats && (
              <AsideFilters
                setShowModal={setShowFilterModal}
                showModal={showFilterModal}
                stats={stats}
              />
            )}
          </Col>

          <Col lg={9}>
            <div className="market-head">
              <div className="market-head__results-count">
                {(stats && stats.total_results) || 0} results
              </div>

              <div className="market-head__sorting">
                <MarketSorting />
              </div>
            </div>
            <MarketList items={items} />
            <Pagination />
          </Col>
        </Row>
      </Container>
    </main>
  )
}

export default Market
