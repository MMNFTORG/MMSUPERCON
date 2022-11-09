import React from 'react'
import { Container } from 'react-bootstrap'
import classNames from 'classnames'

import { RoadmapItem } from '@/components'
import { IRoadmapItem, ROADMAP_DATA } from '@/mocks/roadmap'

import { useMediaDimensions } from '@hooks/useMediaDimensions'

import { chunkArrayBySize } from '@utils/array'

import './RoadmapSection.scss'

export const RoadmapSection = () => {
  const { currentDimension } = useMediaDimensions()
  const dimensionsRowSizeDict: Record<string, number> = {
    xl: 6,
    lg: 4,
    md: 3,
    sm: 3,
    xs: 3
  }

  const rowSize = dimensionsRowSizeDict[currentDimension]

  const roadmapDataChunk = chunkArrayBySize(ROADMAP_DATA, rowSize)

  return (
    <section className={'roadmap-section'}>
      <Container>
        <h2 className="section-title">
          Roadmap <span className="section-title__bordered-text"> 1.0</span>
        </h2>

        <div className="roadmap">
          {roadmapDataChunk.map((rowData: IRoadmapItem[], index) => (
            <div
              className={classNames([
                'roadmap__row',
                { 'roadmap__row--reverse': index % 2 !== 0 }
              ])}
              key={index}
            >
              {rowData.map((item) => (
                <RoadmapItem {...item} key={item.id} />
              ))}
              <div
                className={classNames([
                  'roadmap__road-angle',
                  {
                    'roadmap__road-angle--active': [
                      'active',
                      'passed'
                    ].includes(rowData[rowData.length - 1].status)
                  }
                ])}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
