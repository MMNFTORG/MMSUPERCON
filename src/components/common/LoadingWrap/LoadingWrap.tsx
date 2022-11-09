import React from 'react'
import classNames from 'classnames'

import { Spinner } from '../Spinner'

interface Props {
  loading: boolean
  fallback?: React.ReactNode
  children: React.ReactNode
}

const LoadingWrap = ({ loading, fallback, children }: Props) => {
  return (
    <>
      {loading ? (
        <div
          className={classNames({
            'd-flex justify-content-center': loading
          })}
        >
          {fallback}
        </div>
      ) : (
        children
      )}
    </>
  )
}

LoadingWrap.defaultProps = {
  fallback: <Spinner />
}

export { LoadingWrap }
