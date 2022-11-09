import { NetworkId } from '@firestarter-private/firestarter-library/lib/constants/networks'
import axios, { CancelToken } from 'axios'

import {
  CollectionResponseInfo,
  CollectionTypes,
  NormalizedCollectionInfo
} from '@components/CollectionPresale/types'

import { WalletAddress } from '@contracts/address'

import { sendExceptionReport } from '@utils/errors'

import { instance as API } from '../config'

import { normalizeCollection } from './mapping'

export interface CollectionFilters {
  chainId?: NetworkId
}

export const _getCollections = async (
  cancelToken?: CancelToken,
  { chainId }: CollectionFilters = {}
): Promise<NormalizedCollectionInfo[]> => {
  try {
    const { data } = await API.get<CollectionResponseInfo[]>(
      '/get-collections-pg',
      {
        params: {
          chainId
        },
        cancelToken
      }
    )
    return data.map(normalizeCollection)
  } catch (err) {
    if (err instanceof axios.Cancel) {
      throw err
    }
    sendExceptionReport(err)
    return []
  }
}

export const _getCollectionById = async (
  id: string
): Promise<NormalizedCollectionInfo | null> => {
  try {
    const { data } = await API.get<CollectionResponseInfo>(
      '/get-collection-by-id-pg',
      {
        params: {
          collection_id: id
        }
      }
    )

    return normalizeCollection(data)
  } catch (err) {
    sendExceptionReport(err)
    return null
  }
}

export const _getWhitelistedCollections = async (
  wallet_address: WalletAddress,
  cancelToken?: CancelToken,
  { chainId }: CollectionFilters = {}
): Promise<NormalizedCollectionInfo[]> => {
  try {
    const { data } = await API.get<CollectionResponseInfo[]>(
      '/get-whitelisted-projects',
      {
        params: {
          wallet_address,
          chainId
        },
        cancelToken
      }
    )

    return data
      .filter((project) => project.project_type === CollectionTypes.collection)
      .map(normalizeCollection)
  } catch (err) {
    if (err instanceof axios.Cancel) {
      throw err
    }
    sendExceptionReport(err)
    return []
  }
}
