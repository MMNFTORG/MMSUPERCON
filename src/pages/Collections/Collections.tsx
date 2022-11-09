import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'

import { IPreviewCollection } from '@components/Collections/types'
import { CollectionsList, LoadingWrap, RoundButton } from '@components/index'

import { useCollectionsState } from '../../hooks/useCollections'

const ITEMS_LIMIT_SIZE: number = 9

export const Collections = () => {
  const [maxItems, setMaxItems] = useState<number>(ITEMS_LIMIT_SIZE)
  const { collections, getCollections, loading } = useCollectionsState()

  useEffect(() => {
    getCollections()
  }, [])

  return (
    <main className={'page pt-5 pb-5'}>
      <Container>
        <h1 className={'title'}>Collections</h1>

        <div className={'d-flex justify-content-center'}>
          <LoadingWrap loading={loading}>
            <CollectionsList
              collections={
                collections?.slice(0, maxItems) as IPreviewCollection[]
              }
            />
            {collections && collections?.length > maxItems && (
              <div className={'d-flex mt-4 justify-content-center'}>
                <RoundButton
                  size={'large'}
                  onClick={() => setMaxItems(maxItems + ITEMS_LIMIT_SIZE)}
                >
                  Show more
                </RoundButton>
              </div>
            )}
          </LoadingWrap>
        </div>
      </Container>
    </main>
  )
}

export default Collections
