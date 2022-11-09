import React, { useEffect, useState } from 'react'

import { AsideSection, IAsideItem } from '@/components'

import './MMTokenFilter.scss'

interface IMmTokenFilterProps {}

const MOCK_MM_TOKEN_ITEMS = [
  {
    text: 'Competition',
    count: 22
  },
  {
    text: 'Group Access',
    count: 165
  },
  {
    text: 'One on One',
    count: 108
  },
  {
    text: 'Scholarship',
    count: 5
  }
]

export const MmTokenFilter = ({}: IMmTokenFilterProps): JSX.Element => {
  const [items, setItems] = useState<IAsideItem[]>([])

  useEffect(() => {
    setItems(
      MOCK_MM_TOKEN_ITEMS.map((item, index) => ({
        text: item.text,
        id: index,
        count: item.count,
        onClick: () => {},
        selected: true
      }))
    )
  }, [])

  return <AsideSection title={'MM Token'} items={items} setItems={setItems} />
}
