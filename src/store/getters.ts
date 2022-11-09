import {
  CollectionStatusesProps,
  CollectionStatusProp,
  NormalizedCollectionInfo
} from '../components/CollectionPresale/types'

import { AppState } from './types'

const makeCollectionsGetter = (
  ...args: CollectionStatusProp[]
): ((state: AppState) => NormalizedCollectionInfo[]) => {
  return (state) => {
    const { collections } = state
    if (!collections?.length) {
      return []
    }
    return [...collections].filter((collection) =>
      args.includes(collection.presale.statusMessage)
    )
  }
}

export const getLiveCollections = makeCollectionsGetter(
  CollectionStatusesProps['Registration Open'],
  CollectionStatusesProps['Registration Closed']
)
export const getUpcomingCollections = makeCollectionsGetter(
  CollectionStatusesProps['Coming Soon']
)
export const getCompletedCollections = makeCollectionsGetter(
  CollectionStatusesProps.Closed
)

export const getFeaturedCollections = (
  state: AppState
): NormalizedCollectionInfo[] => {
  const featuredCollections = [
    ...getLiveCollections(state),
    ...getUpcomingCollections(state)
  ]

  if (!featuredCollections.length) {
    return []
  }

  return featuredCollections
    .sort(
      (a, b) =>
        +(b.whitelisting.starts_at ?? 0) - +(a.whitelisting.starts_at ?? 0)
    )
    .slice(0, 5)
}
