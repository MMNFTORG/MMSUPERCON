import React, { Dispatch, SetStateAction } from 'react'
import classNames from 'classnames'

import { IAsideItem } from '../types'

import './AsideSection.scss'

interface IAsideSectionProps {
  items: IAsideItem[]
  title: string
  setItems: Dispatch<SetStateAction<IAsideItem[]>>
}

export const AsideSection = ({
  items,
  title,
  setItems
}: IAsideSectionProps) => {
  const select = (text: string) => {
    setItems(
      items.map((item) => {
        if (item.text === text) {
          item.selected = true
        } else {
          item.selected = false
        }

        return item
      })
    )
  }

  const onClickHandler = (onClick: () => void, text: string): void => {
    onClick()
    select(text)
  }

  return (
    <div className={'aside-section'}>
      <div className="aside-section__title">{title}</div>

      <ul className="aside-section__buttons">
        {items.map(({ text, onClick, selected, count }) => (
          <li key={text}>
            <button
              className={classNames([
                'aside-section__button filter-button',
                { 'aside-section__button--active': selected }
              ])}
              onClick={() => onClickHandler(onClick, text)}
            >
              {text}

              <span className="filter-button__items-count">{count}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
