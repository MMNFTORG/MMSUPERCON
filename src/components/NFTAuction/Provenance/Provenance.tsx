import React from 'react'

import { ProvenanceList } from '@/components'

import { IProvenanceEntity } from '../types'

import './Provenance.css'

interface IProvenanceProps {
  provenanceEntities: IProvenanceEntity[]
}

export const Provenance = ({ provenanceEntities }: IProvenanceProps) => {
  return (
    <div className={'provenance'}>
      <h2 className="subtitle mb-4">Provenance</h2>

      <ProvenanceList provenanceEntities={provenanceEntities} />
    </div>
  )
}
