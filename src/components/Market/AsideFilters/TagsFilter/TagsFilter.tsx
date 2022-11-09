import React from 'react'
import classNames from 'classnames'

import { NftTagsEnum } from '@/components'

import './TagsFilter.scss'

interface ITagsFilterProps {}

export const TagsFilter = ({}: ITagsFilterProps): JSX.Element => {
  const tagsList = Object.keys(NftTagsEnum)
  return (
    <div className={'aside-section tags-filter'}>
      <div className="aside-section__title">Popular Tags</div>

      <ul className="tags-filter-list">
        {(tagsList as Array<keyof typeof NftTagsEnum>).map((item) => (
          <li key={item}>
            <button className={classNames(['tags-filter-list__button'])}>
              {NftTagsEnum[item]}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
