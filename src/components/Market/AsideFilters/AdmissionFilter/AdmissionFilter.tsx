import React, { useEffect, useState } from 'react'

import { AsideSection, IAsideItem } from '@/components'

import './AdmissionFilter.scss'

interface IAddmissionFilterProps {}

const MOCK_ADMISSION_ITEMS = [
  {
    text: 'Core',
    count: 22
  },
  {
    text: 'Epic',
    count: 165
  },
  {
    text: 'Rare',
    count: 108
  },
  {
    text: 'Very Rare',
    count: 5
  }
]

export const AdmissionFilter = ({}: IAddmissionFilterProps): JSX.Element => {
  const [items, setItems] = useState<IAsideItem[]>([])

  useEffect(() => {
    setItems(
      MOCK_ADMISSION_ITEMS.map((item, index) => ({
        text: item.text,
        id: index,
        count: item.count,
        onClick: () => {},
        selected: true
      }))
    )
  }, [])

  return <AsideSection title={'Admission'} items={items} setItems={setItems} />
}
