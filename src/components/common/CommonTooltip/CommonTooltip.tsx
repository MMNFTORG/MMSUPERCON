import React, { useRef, useState } from 'react'
import { Overlay, OverlayProps, Tooltip, TooltipProps } from 'react-bootstrap'

import { ReactComponent as TooltipIcon } from '../../../assets/tooltip-icon.svg'

import './CommonTooltip.css'

interface Props
  extends Omit<OverlayProps, 'children' | 'target'>,
    TooltipProps {
  triggerEl: React.ReactNode | React.ReactComponentElement<any>
  triggerClass?: string
  tooltipClass?: string
  children: React.ReactNode
}

const CommonTooltip = (props: Props) => {
  const [show, setShow] = useState(false)
  const target = useRef(null)

  return (
    <>
      <span
        className={`tooltip-wrapper ${props.triggerClass}`}
        ref={target}
        onMouseOver={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {props.triggerEl}
        <Overlay {...props} target={target.current} show={show}>
          {(properties) => (
            <Tooltip
              className={`common-tooltip ${props.tooltipClass}`}
              id={props.id}
              {...properties}
            >
              {props.children}
            </Tooltip>
          )}
        </Overlay>
      </span>
    </>
  )
}

CommonTooltip.defaultProps = {
  placement: 'auto',
  flip: true,
  triggerEl: <TooltipIcon />
}

export { CommonTooltip }
