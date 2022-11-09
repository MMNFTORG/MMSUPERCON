import React, { useMemo } from 'react'
import classNames from 'classnames'

import { DynamicImage } from '@/components'

import { useMediaDimensions } from '@hooks/useMediaDimensions'
import { IPaginationState, usePagination } from '@hooks/usePagination'

import './Pagination.scss'
interface IPaginationProps {}

const PAGINATION_STATE: IPaginationState = {
  currentPage: 2,
  totalPages: 85
}

export const Pagination = ({}: IPaginationProps): JSX.Element => {
  const { showedPages, showLastPage } = usePagination({
    paginationState: PAGINATION_STATE
  })

  const { md } = useMediaDimensions()
  return (
    <div className="pagination">
      <button className="pagination__navigation-button">
        <DynamicImage path={'back_arrow.svg'} alt={'prev'} />
      </button>

      <ul className="pagination__list">
        {showedPages.map((page) => (
          <li key={page}>
            <button
              className={classNames([
                'pagination__page-button',
                {
                  'pagination__page-button--active':
                    page === PAGINATION_STATE.currentPage
                }
              ])}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>

      {showLastPage && md && (
        <>
          <span>...</span>
          <button
            className={classNames([
              'pagination__page-button',
              'pagination__page-button--last'
            ])}
          >
            {PAGINATION_STATE.totalPages}
          </button>
        </>
      )}

      <button className="pagination__navigation-button pagination__navigation-button--next">
        <DynamicImage path={'back_arrow.svg'} alt={'prev'} />
      </button>
    </div>
  )
}
