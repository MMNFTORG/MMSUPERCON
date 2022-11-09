import React, { useCallback } from 'react'
import { useHistory } from 'react-router'
import { generatePath } from 'react-router-dom'
import { RoutesPaths } from '@router/constants'
import classNames from 'classnames'
import { formatISO9075, isFuture, isPast } from 'date-fns'

import { IWhitelistPhase } from '@/components'

import './PhasesList.scss'

interface IPhasesListProps {
  phases: IWhitelistPhase[]
  collectionId?: string
}

export const PhasesList = ({ phases = [], collectionId }: IPhasesListProps) => {
  const isActivePhase = useCallback(
    (phase: IWhitelistPhase) =>
      isPast(new Date(phase.presale_starts_at)) &&
      isFuture(new Date(phase.presale_ends_at)),
    []
  )
  const history = useHistory()
  return (
    <div className={'phase-list'}>
      <div className={'phase-row phase-row--head'}>
        <div className="phase-row__col">Phase</div>
        <div className="phase-row__col">Opens</div>
        <div className="phase-row__col">Closes</div>
      </div>
      {phases.map((phase) => (
        <div
          key={phase.name}
          onClick={(e) => {
            if (!collectionId) return
            history.push(
              generatePath(RoutesPaths.COLLECTION_DETAILS, {
                collection_id: collectionId
              })
            )
          }}
          className={classNames([
            'phase-row',
            { 'phase-row--active': isActivePhase(phase) },
            { 'phase-row--link': collectionId }
          ])}
        >
          <div className="phase-row__col">{phase.name}</div>
          <div className="phase-row__col">
            {isActivePhase(phase)
              ? 'Current Phase'
              : formatISO9075(new Date(phase.presale_starts_at))}
          </div>
          <div className="phase-row__col">
            {formatISO9075(new Date(phase.presale_ends_at))}
          </div>
        </div>
      ))}
    </div>
  )
}
