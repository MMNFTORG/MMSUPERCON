import React from 'react'
import { RoutesPaths } from '@router/constants'

import { RoundButton } from '../RoundButton'

import './GetReadyBadge.css'

export const GetReadyBadge = () => {
  return (
    <div className="tile--with-shadow text-center get-ready-badge">
      <div className="tile__main">Banner with any image and text</div>
      <RoundButton to={RoutesPaths.MAIN} size="large" wide>
        Apply Here
      </RoundButton>
    </div>
  )
}
