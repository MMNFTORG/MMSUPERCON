import React, { useEffect, useMemo } from 'react'
import { Container, Image } from 'react-bootstrap'
import { Link, useHistory, useParams } from 'react-router-dom'
import { useNetwork } from '@firestarter-private/firestarter-library'
import { RoutesPaths } from '@router/constants'

import {
  AccountCheckWrapper,
  CollectionStatusesProps,
  LoadingWrap,
  WhitelistForm,
  WrongNetworkBlock
} from '@components/index'

import { useCollectionsState } from '@hooks/useCollections'

import Logo from '@assets/logo.png'

import './Whitelist.scss'

interface ParamTypes {
  collection_id: string
}

export const Whitelist = () => {
  const { collection_id: id } = useParams<ParamTypes>()
  const history = useHistory()
  const {
    currentCollection: collection,
    getCollectionById,
    loading
  } = useCollectionsState()

  useEffect(() => {
    if (id !== collection?.id || !collection) {
      getCollectionById(id)
    }
  }, [id, collection])

  useEffect(() => {
    if (
      collection &&
      collection.id === id &&
      collection.presale.statusMessage !==
        CollectionStatusesProps['Registration Open']
    ) {
      history.replace(`/collections/${id}`)
    }
  }, [collection, id])

  const { checkIfSelected } = useNetwork()

  const isCollectionNetworkSelected = useMemo(
    () => (collection ? checkIfSelected(collection.chainId) : false),
    [collection, checkIfSelected]
  )

  return (
    <main className={'page whitelist-page'}>
      <div className="whitelist-page__banner">
        <div className="whitelist-page__logo">
          <Link to={RoutesPaths.MAIN}>
            <Image src={Logo} alt={'logo'} />
          </Link>
        </div>
      </div>

      <Container>
        <AccountCheckWrapper>
          <LoadingWrap loading={loading}>
            {isCollectionNetworkSelected ? (
              collection && <WhitelistForm collection={collection} />
            ) : (
              <WrongNetworkBlock type={'Whitelist'} />
            )}
          </LoadingWrap>
        </AccountCheckWrapper>
      </Container>
    </main>
  )
}

export default Whitelist
