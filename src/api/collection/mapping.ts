import { useCallback } from 'react'
import BigNumber from 'bignumber.js'
import { isFuture, isPast } from 'date-fns'

import {
  CollectionResponseInfo,
  CollectionStatus,
  CollectionStatuses,
  CollectionStatusesProps,
  CollectionStatusProp,
  IWhitelistPhase,
  NormalizedCollectionInfo,
  NormalizedPresaleInfo,
  NormalizedWhitelistingInfo
} from '../../components/CollectionPresale/types'
import { isDefined } from '../../utils/object'

export const normalizeStatus = ({
  status,
  whitelistStart,
  whitelistEnd,
  privatePresaleStart,
  privatePresaleEnd,
  publicPresaleStart,
  publicPresaleEnd
}: {
  status: CollectionStatus
  whitelistStart: Date | null
  whitelistEnd: Date | null
  privatePresaleStart?: Date | null
  privatePresaleEnd?: Date | null
  publicPresaleStart?: Date | null
  publicPresaleEnd?: Date | null
}): CollectionStatusProp => {
  if (!whitelistStart || !whitelistEnd)
    return CollectionStatusesProps['Coming Soon']
  if (status === CollectionStatuses.completed)
    return CollectionStatusesProps.Closed

  if (status === CollectionStatuses.active) {
    if (
      (publicPresaleEnd && isPast(publicPresaleEnd)) ||
      (!publicPresaleEnd && privatePresaleEnd && isPast(privatePresaleEnd))
    )
      return CollectionStatusesProps.Closed
    if (publicPresaleStart && isPast(publicPresaleStart))
      return CollectionStatusesProps.Live
    if (privatePresaleStart && isPast(privatePresaleStart))
      return CollectionStatusesProps['Private Live']
    if (isPast(whitelistEnd))
      return CollectionStatusesProps['Registration Closed']
    if (isPast(whitelistStart))
      return CollectionStatusesProps['Registration Open']
  }

  return CollectionStatusesProps['Coming Soon']
}

export const normalizeDate = (dateString: string | null): Date | null => {
  return dateString ? new Date(dateString) : null
}

const isActivePhase = (phase: IWhitelistPhase) =>
  isPast(new Date(phase.presale_starts_at)) &&
  isFuture(new Date(phase.presale_ends_at))

export const getCurrentSalePhase = (whitelisting_phases: IWhitelistPhase[]) => {
  return whitelisting_phases.filter((phase) => isActivePhase(phase))[0]
}

export const normalizeCollection = (
  CollectionInfo: CollectionResponseInfo
): NormalizedCollectionInfo => {
  let CollectionWhitelisting: NormalizedWhitelistingInfo = {
    ...CollectionInfo.whitelisting,
    starts_at: normalizeDate(CollectionInfo.whitelisting.starts_at),
    end_at: normalizeDate(CollectionInfo.whitelisting.end_at)
  }

  let CollectionPresale = {
    ...CollectionInfo.presale,
    ...(isDefined(CollectionInfo.presale.public_starts_at) &&
      isDefined(CollectionInfo.presale.public_end_at) && {
        public_starts_at: normalizeDate(
          CollectionInfo.presale.public_starts_at as string | null
        ),
        public_end_at: normalizeDate(
          CollectionInfo.presale.public_end_at as string | null
        )
      }),
    ...(isDefined(CollectionInfo.presale.private_starts_at) &&
      isDefined(CollectionInfo.presale.private_end_at) && {
        private_starts_at: normalizeDate(
          CollectionInfo.presale.private_starts_at as string | null
        ),
        private_end_at: normalizeDate(
          CollectionInfo.presale.private_end_at as string | null
        )
      }),
    statusMessage: CollectionStatusesProps['Coming Soon']
  } as NormalizedPresaleInfo

  CollectionPresale.statusMessage = normalizeStatus({
    status: CollectionPresale.status,
    whitelistStart: CollectionWhitelisting.starts_at,
    whitelistEnd: CollectionWhitelisting.end_at,
    privatePresaleStart: CollectionPresale.private_starts_at,
    privatePresaleEnd: CollectionPresale.private_end_at,
    publicPresaleStart: CollectionPresale.public_starts_at,
    publicPresaleEnd: CollectionPresale.public_end_at
  })

  CollectionPresale.whitelisting_phases =
    CollectionPresale.whitelisting_phases.map((i) => ({
      ...i,
      price: new BigNumber(i.price)
    }))

  CollectionPresale.currentPhase = getCurrentSalePhase(
    CollectionPresale.whitelisting_phases
  )

  return {
    ...CollectionInfo,
    chainId: String(CollectionInfo.chainId),
    whitelisting: CollectionWhitelisting,
    presale: CollectionPresale
  }
}
