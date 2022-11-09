import React, { useMemo } from 'react'
import { Image } from 'react-bootstrap'
import { generatePath } from 'react-router-dom'
import { RoutesPaths } from '@router/constants'
import classNames from 'classnames'

import {
  CollectionStatusesProps,
  CollectionStatusProp,
  LoadingWrap,
  NormalizedCollectionInfo,
  RoundButton,
  SiteButton
} from '@/components'

import { WhitelistStatus, WhitelistStatuses } from '@api/whitelist/types'

import { useWhitelist } from '@contracts/hooks/useWhitelist'

import WLIcon from '@assets/account.svg'
import WLNotPassedIcon from '@assets/account-warning.svg'

interface IWhitelistBlockProps {
  statusMessage: CollectionStatusProp
  collection: NormalizedCollectionInfo
  whitelistStatus: WhitelistStatus
  whitelistLoading: boolean
}

export const WhitelistBlock = ({
  statusMessage,
  collection,
  whitelistStatus,
  whitelistLoading
}: IWhitelistBlockProps) => {
  const whitelistStatusMessage = useMemo(() => {
    switch (whitelistStatus) {
      case WhitelistStatuses.passed:
        return 'Wallet is whitelisted'
      case WhitelistStatuses.in_review:
        return 'Wallet whitelisting is pending'
      default:
        return 'Wallet is NOT whitelisted'
    }
  }, [whitelistStatus])
  return (
    <div className="whitelist-block">
      <LoadingWrap loading={whitelistLoading || !whitelistStatus}>
        {statusMessage === CollectionStatusesProps['Registration Open'] &&
        whitelistStatus === WhitelistStatuses.not_submitted ? (
          <SiteButton
            to={generatePath(RoutesPaths.WHITELIST, {
              collection_id: collection.id
            })}
            size="large"
          >
            Apply to whitelist
          </SiteButton>
        ) : (
          <div
            className={classNames('whitelist-badge', {
              [`${whitelistStatus}`]: !!whitelistStatus,
              invalid: !whitelistStatus
            })}
          >
            <Image
              src={
                [
                  WhitelistStatuses.passed,
                  WhitelistStatuses.in_review
                ].includes(whitelistStatus as WhitelistStatuses)
                  ? WLIcon
                  : WLNotPassedIcon
              }
            />
            <span>{whitelistStatusMessage}</span>
          </div>
        )}
      </LoadingWrap>
    </div>
  )
}
