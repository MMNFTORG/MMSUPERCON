import React, { useState } from 'react'
import classNames from 'classnames'

import { SortingDirection } from '@/components'

import './MarketSorting.scss'

interface IMarketSortingProps {}

export const MarketSorting = ({}: IMarketSortingProps): JSX.Element => {
  const [sort, setSort] = useState<SortingDirection>(SortingDirection.NAME_ASC)
  const [openSort, setOpenSort] = useState<boolean>(false)
  const sortingOptions: string[] = Object.keys(SortingDirection)

  const handleSortClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    newSort: keyof typeof SortingDirection
  ) => {
    e.preventDefault()

    setSort(SortingDirection[newSort])
    setOpenSort(false)
  }

  return (
    <div className="market-sorting">
      <span>Sort by:</span>
      <div className="market-sorting__wrapper">
        <button
          className="market-sorting__button"
          onClick={() => setOpenSort((prevSort) => !prevSort)}
        >
          {sort}
        </button>

        <div
          className={classNames([
            'market-sorting__options-list',
            {
              'market-sorting__options-list--opened': openSort
            }
          ])}
        >
          <ul>
            {(
              sortingOptions as unknown as Array<keyof typeof SortingDirection>
            ).map((item) => (
              <li key={item}>
                <button
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                    handleSortClick(e, item)
                  }
                >
                  {SortingDirection[item]}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
