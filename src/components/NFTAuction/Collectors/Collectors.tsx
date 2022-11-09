import React, { useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'

import { CollectionsList, ProvenanceList } from '@/components'
import { COLLECTIONS_LIST } from '@/mocks/collections'

import { CollectorsTable } from '@components/NFTAuction/CollectorsTable'

import { ICollectorEntity, IProvenanceEntity } from '../types'

import './Collectors.scss'

interface ICollectorsProps {
  collectors: ICollectorEntity[]
  provenanceEntities: IProvenanceEntity[]
}
enum TabsEnum {
  PROVENANCE = 'PROVENANCE',
  COLLECTORS = 'COLLECTORS'
}

export const Collectors = ({
  collectors,
  provenanceEntities
}: ICollectorsProps) => {
  const [key, setKey] = useState<TabsEnum | null>(TabsEnum.PROVENANCE)
  return (
    <div className={'collectors'}>
      <Tabs
        id="controlled-tab"
        activeKey={key}
        onSelect={(k) => setKey(k as TabsEnum)}
        className="mb-5 collectors-tabs"
      >
        <Tab eventKey={TabsEnum.PROVENANCE} title={TabsEnum.PROVENANCE}>
          <ProvenanceList provenanceEntities={provenanceEntities} />
        </Tab>
        <Tab eventKey={TabsEnum.COLLECTORS} title={TabsEnum.COLLECTORS}>
          <CollectorsTable collectors={collectors} />
        </Tab>
      </Tabs>
    </div>
  )
}
