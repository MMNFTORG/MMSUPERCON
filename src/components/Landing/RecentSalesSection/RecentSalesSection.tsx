import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'

import {
  LoadingWrap,
  NormalizedCollectionInfo,
  RecentSalesSlider
} from '@/components'
import { RECENT_SALES } from '@/mocks/sales'

import { useCollectionsState } from '@hooks/useCollections'

import './RecentSalesSection.scss'

const COLLECTION_ID = process.env.REACT_APP_NFT_COLLECTION_ID || ''

interface IRecentSalesSectionProps {
  externalCollection?: NormalizedCollectionInfo
}

export const RecentSalesSection = ({
  externalCollection
}: IRecentSalesSectionProps) => {
  const {
    currentCollection: collection,
    getCollectionById,
    loading
  } = useCollectionsState()

  useEffect(() => {
    if (
      (collection?.id !== COLLECTION_ID || !collection) &&
      !externalCollection
    ) {
      getCollectionById(COLLECTION_ID)
    }
  }, [collection, COLLECTION_ID, externalCollection])

  return (
    <section className={'recent-sales'}>
      <Container>
        <h2 className="recent-sales__title sneak-peak-text">
          RECENT MILLIONAIRE MENTOR SALES
        </h2>
      </Container>

      <LoadingWrap loading={loading}>
        <div className="recent-sales__slider">
          {collection && (
            <RecentSalesSlider
              recentSales={RECENT_SALES}
              collection={externalCollection || collection!}
            />
          )}
        </div>
      </LoadingWrap>
    </section>
  )
}
