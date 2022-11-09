import React from 'react'
import { Link, LinkProps } from 'react-router-dom'

import { DynamicImage } from '../../common/DynamicImage'

interface Props {
  to: LinkProps['to']
  children: React.ReactNode
}

export const BackLink = ({ to, children }: Props) => {
  return (
    <Link className="back-link" to={to}>
      <div className={'back-link__ico'}>
        <DynamicImage path="right_arrow.svg" />
      </div>
      <span className="back-link__label">{children}</span>
    </Link>
  )
}
