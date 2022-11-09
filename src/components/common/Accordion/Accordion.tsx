import React, { useState } from 'react'
import {
  Accordion as BaseAccordion,
  Button,
  Card,
  useAccordionToggle
} from 'react-bootstrap'

import { ReactComponent as CollapseArrow } from '@assets/accordion/collapse.svg'
import { ReactComponent as CollapsedArrow } from '@assets/accordion/collapsed.svg'

import './Accordion.css'
interface Item {
  title: string
  body: React.ReactNode
}

interface Props {
  items: Item[]
}

const CustomToggle = ({ children, eventKey }: any) => {
  const [isOpened, setOpened] = useState(false)
  const decoratedOnClick = useAccordionToggle(eventKey, () => {
    setOpened(!isOpened)
  })

  return (
    <Button
      variant="main"
      className={isOpened ? 'active' : ''}
      onClick={decoratedOnClick}
    >
      <>
        {children}
        <span>{isOpened ? <CollapsedArrow /> : <CollapseArrow />}</span>
      </>
    </Button>
  )
}

export const Accordion = ({ items }: Props) => {
  const itemList = items.map((item, i) => (
    <BaseAccordion key={item.title}>
      <Card className="accordion">
        <Card.Header>
          <CustomToggle eventKey={`${i}`}>{item.title}</CustomToggle>
        </Card.Header>
        <BaseAccordion.Collapse eventKey={`${i}`}>
          <Card.Body>{item.body}</Card.Body>
        </BaseAccordion.Collapse>
      </Card>
    </BaseAccordion>
  ))

  return <>{itemList}</>
}
